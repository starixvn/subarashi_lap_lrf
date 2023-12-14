namespace Fanex.Athena.Module.Notification.Service
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Data;
    using Fanex.Logging;
    using Interfaces;
    using Newtonsoft.Json.Linq;

    public class NotificationService : INotificationService
    {
        private readonly IDictionary<string, string> _notificationType = new Dictionary<string, string>
        {
            { MessageType.ResettlementNotification , "Amendment" },
            { MessageType.AbnormalBetNotification , "AbnormalBet" }
        };

        private readonly IDictionary<string, string> _supportedLanguage = new Dictionary<string, string>
        {
            { "en", "En" },
            { "ch", "Ch" },
            { "cs", "Cs" },
            { "zhcn", "Cs" }
        };

        private readonly ILogger _logger;
        private readonly IAppSettings _appSetting;
        private readonly IWebClientService _webClientService;
        private readonly IDbFactory _dbFactory;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public NotificationService(
            ILogger logger,
            IAppSettings appSetting,
            IWebClientService webClientService,
            IDbFactory dbFactory,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter)
        {
            _logger = logger;
            _appSetting = appSetting;
            _webClientService = webClientService;
            _dbFactory = dbFactory;
            _balanceUpDataAccess = balanceUpDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<ReportResultModel<NotificationMessage>> GetNotificationMessages(
            NotificationMetaModel metaModel)
        {
            var result = new ReportResultModel<NotificationMessage>
            {
                TotalRows = 0,
                DataList = new List<NotificationMessage>()
            };

            var messageTypes = (metaModel.MessageTypes ?? string.Empty).Split(',');

            if (messageTypes.Length == 0)
            {
                return result;
            }

            if (messageTypes.Contains(MessageType.ResettlementNotification))
            {
                // Amendment Notification from OIC API
                var resultAmendmentModel = CreateNotificationMetaModel(metaModel, 6);
                var amendmentResult = GetResultAmendment(resultAmendmentModel);
                result.DataList = result.DataList.Concat(amendmentResult.DataList.Select(x => new NotificationMessage
                {
                    Id = x.Id,
                    DateTime = x.DateTime,
                    Subject = x.Subject,
                    Content = x.Content,
                    Type = _notificationType[MessageType.ResettlementNotification]
                })).OrderByDescending(x => x.DateTime);
                result.TotalRows += amendmentResult.TotalRows;
            }

            // Notification from LRF/LAP
            var internalNotificationModel = CreateNotificationMetaModel(metaModel, 2);
            UpdateMetaModel(internalNotificationModel);

            if (!string.IsNullOrEmpty(internalNotificationModel.MessageTypes))
            {
                var messagesResult = await GetInternalNotification(internalNotificationModel);
                result.DataList = result.DataList.Concat(messagesResult.DataList).OrderByDescending(x => x.DateTime);
                result.TotalRows += messagesResult.TotalRows;
            }

            return result;
        }

        public ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel)
        {
            if (string.IsNullOrEmpty(_appSetting.ResultAmendmentApiUrl))
            {
                return new ReportResultModel<ResultAmendment> { DataList = new ResultAmendment[0] };
            }

            var resultAmendmentUrl = GetResultAmendmentUrl(metaModel);
            var dataList = new List<ResultAmendment>();
            var totalRecords = 0;

            try
            {
                var json = _webClientService.DownloadString(resultAmendmentUrl);
                if (string.IsNullOrEmpty(json))
                {
                    return new ReportResultModel<ResultAmendment> { DataList = dataList };
                }

                var jobject = JObject.Parse(json);
                if (jobject.HasValues && jobject["Data"].Children().Any())
                {
                    var lang = GetSupportedLanguage(metaModel.Language);
                    var subjectKey = "Subject" + lang;
                    var contentKey = "Content" + lang;

                    totalRecords = jobject["TotalItems"].Value<int>();
                    dataList.AddRange(jobject["Data"].Children().Select(x => MapToResultAmendment(x, subjectKey, contentKey)));
                }
            }
            catch (Exception e)
            {
                LogError(resultAmendmentUrl, e);
            }

            return new ReportResultModel<ResultAmendment>
            {
                DataList = dataList,
                TotalRows = totalRecords
            };
        }

        private async Task<ReportResultModel<NotificationMessage>> GetInternalNotification(NotificationMetaModel metaModel)
        {
            const string SpKey = "Lrf_MessageListSel";
            var lang = GetSupportedLanguage(metaModel.Language);
            var dataList = new List<NotificationMessage>();
            var totalRows = 0;

            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("FromDate", metaModel.FromDate);
                objectDb.SetParameterValue("ToDate", metaModel.ToDate);
                objectDb.SetParameterValue("UserName", metaModel.UserName);
                objectDb.SetParameterValue("LicenseeName", metaModel.LicenseeName);
                objectDb.SetParameterValue("MessageTypes", metaModel.MessageTypes);

                using (var reader = await objectDb.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        dataList.Add(new NotificationMessage
                        {
                            Id = ReadMessageId(reader),
                            Subject = Convert.ToString(reader["Subject" + lang]),
                            Content = Convert.ToString(reader["Content" + lang]),
                            Type = _notificationType[ReadMessageType(reader).ToString()],
                            DateTime = ReadEventDate(reader)
                        });
                    }
                }

                totalRows = dataList.Count;
            }

            return new ReportResultModel<NotificationMessage> { TotalRows = totalRows, DataList = dataList };
        }

        public async Task<IResultInfo> MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            if (metaModel.MessageType == _notificationType[MessageType.ResettlementNotification])
            {
                return MarkResettlementNotificationAsRead(metaModel);
            }

            return await MarkInternalNotificationAsRead(metaModel);
        }

        private IResultInfo MarkResettlementNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            var api = new Uri(_appSetting.MarkNotificationAsReadApiUrl);
            var param = $"MessageType={metaModel.MessageType}&MessageId={metaModel.MessageId}&UserName={metaModel.UserName}&LicenseeName={metaModel.LicenseeName}";

            var result = new ResultInfo
            {
                Code = 1,
                Message = ViewResources.ErrorProcessingMsg
            };
            try
            {
                var json = _webClientService.UploadString(api, param);
                if (string.IsNullOrEmpty(json))
                {
                    return result;
                }

                var jobject = JObject.Parse(json);

                if (jobject.HasValues)
                {
                    return new ResultInfo
                    {
                        Code = jobject["Code"].Value<int>(),
                        Message = jobject["Message"].Value<string>()
                    };
                }
            }
            catch (Exception e)
            {
                LogError(api + "\nParameter: " + param, e);
            }

            return result;
        }

        private async Task<IResultInfo> MarkInternalNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            var result = new ResultInfo
            {
                Code = 0,
                Message = ViewResources.MessageSuccess
            };

            const string SpKey = "Lrf_MessageUserIns";
            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("MessageId", metaModel.MessageId);
                objectDb.SetParameterValue("LicenseeName", metaModel.LicenseeName);
                objectDb.SetParameterValue("UserName", metaModel.UserName);
                await objectDb.ExecuteNonQueryAsync();
            }

            return result;
        }

        public async Task<AmendmentTicketListing> GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            const string SpKey = "Lrf_AmendmentTicketListingSel";
            var result = AmendmentTicketListing.Empty();
            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                var balanceUp = _balanceUpDataAccess.GetBalanceUp();
                objectDb.SetParameterValue("SessionId", metaModel.SessionId);
                objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);
                objectDb.SetParameterValue("MoveBetsDay", balanceUp.MoveBetsDay);
                objectDb.SetParameterValue("BalanceUpDay", balanceUp.BalanceUpDay);

                using (var reader = await objectDb.ExecuteReaderAsync())
                {
                    var index = 0;
                    while (reader.Read())
                    {
                        result.Data.Add(new AmendmentTicket
                        {
                            Index = ++index,
                            RefNo = Convert.ToString(reader["RefNo"]),
                            ExternalId = Convert.ToString(reader["ExternalId"]),
                            SystemId = Convert.ToString(reader["SystemId"])
                        });
                    }
                }

                result.MatchInfo = ReadMatchInfo(objectDb);
            }

            return result;
        }

        public IResultInfo GetFileAttachmentData(NotificationAttachmentMetaModel metaModel)
        {
            var url = string.Format(_appSetting.ResultAmendmentAttachmentApiUrl, metaModel.FileName);
            var result = new ResultInfo
            {
                Code = 1,
                Message = ViewResources.ErrorProcessingMsg
            };
            try
            {
                var json = _webClientService.DownloadString(url);
                if (string.IsNullOrEmpty(json))
                {
                    return result;
                }

                var jobject = JObject.Parse(json);

                if (jobject.HasValues)
                {
                    return new ResultInfo
                    {
                        ExtendedData = jobject["content"].Value<string>(),
                        Code = jobject["result"]["errorCode"].Value<int>(),
                        Message = jobject["result"]["message"].Value<string>()
                    };
                }
            }
            catch (Exception e)
            {
                LogError(url, e);
            }

            return result;
        }

#pragma warning disable S3995 // URI return values should not be strings

        private string GetResultAmendmentUrl(NotificationMetaModel metaModel)
#pragma warning restore S3995 // URI return values should not be strings
        {
            return string.Format(
                            _appSetting.ResultAmendmentApiUrl,
                            metaModel.FromDate,
                            metaModel.ToDate,
                            metaModel.UserName,
                            metaModel.LicenseeName,
                            metaModel.IsOnlyUnread,
                            metaModel.PageSize,
                            metaModel.PageIndex - 1);
        }

        private string GetSupportedLanguage(string lang)
        {
            var key = lang.ToLowerInvariant();
            if (_supportedLanguage.ContainsKey(key))
            {
                return _supportedLanguage[key];
            }

            return _supportedLanguage.First().Value;
        }

        private ResultAmendment MapToResultAmendment(JToken token, string subjectKey, string contentKey)
        {
            const string DefaultSubjectKey = "SubjectEn";
            var subject = token[subjectKey].Value<string>();

            return new ResultAmendment
            {
                Id = token["MessageId"].Value<int>(),
                DateTime = token["EventDate"].Value<DateTime>(),
                Content = token[contentKey].Value<string>(),
                Subject = string.IsNullOrWhiteSpace(subject) ? token[DefaultSubjectKey].Value<string>() : subject,
                DataFilePath = token["DataFilePath"].Value<string>(),
                SessionId = token["SessionId"].Value<string>(),
                IsRead = token["IsRead"].Value<bool>(),
                Type = _notificationType[MessageType.ResettlementNotification]
            };
        }

        private void LogError(string api, Exception exception)
        {
            _logger.Error(exception.Message + "\nApiUrl: " + api, exception);
        }

        private string ReadMatchInfo(IObjectDb objectDb)
        {
            var outputParams = objectDb.GetOutputParams();
            if (int.TryParse(outputParams["ProductId"]?.ToString(), out int productId)
                && DateTime.TryParse(outputParams["EventDate"]?.ToString(), out DateTime eventDate))
            {
                const int ProductSB = 1;
                return productId == ProductSB ? GetSBMatchInfo(outputParams, eventDate) : GetOtherProductMatchInfo(outputParams, eventDate);
            }
            return string.Empty;
        }

        private string GetSBMatchInfo(Hashtable outputParams, DateTime eventDate)
        {
            const string SBMatchFormat = "{0}{1} -vs- {2} - {3}";
            return string.Format(SBMatchFormat, _cacheRefAdapter.GetTeamName(outputParams["HomeId"]), (outputParams["IsNeutral"] as bool?).GetValueOrDefault() ? " (N)" : string.Empty,
              _cacheRefAdapter.GetTeamName(outputParams["AwayId"]),
              eventDate.ToString("MM/d/yyyy"));
        }

        private string GetOtherProductMatchInfo(Hashtable outputParams, DateTime eventDate)
        {
            const string OtherSportMatchFormat = "{0} No.{1} - {2}";
            return string.Format(OtherSportMatchFormat, _cacheRefAdapter.GetSportName(outputParams["SportType"]), outputParams["MatchCode"], eventDate.ToString("MM/d/yyyy"));
        }

        private static DateTime ReadEventDate(IDataReader reader)
        {
            if (DateTime.TryParse(reader["EventDate"]?.ToString(), out DateTime eventDate))
            {
                return eventDate;
            }
            return DateTimeHelper.Now;
        }

        private static int ReadMessageId(IDataReader reader)
        {
            if (int.TryParse(reader["MessageId"]?.ToString(), out int id))
            {
                return id;
            }
            return -1;
        }

        private static int ReadMessageType(IDataReader reader)
        {
            if (int.TryParse(reader["MessageType"]?.ToString(), out int type))
            {
                return type + 1;
            }
            return -1;
        }

        private static int ParseMessageType(string messageType)
        {
            if (int.TryParse(messageType, out int type))
            {
                return type - 1;
            }
            return 0;
        }

        private static void UpdateMetaModel(NotificationMetaModel metaModel)
        {
            if (!string.IsNullOrEmpty(metaModel.MessageTypes))
            {
                var messageTypes = metaModel.MessageTypes.Split(',');

                metaModel.MessageTypes = string.Join(",", messageTypes
                    .Where(x => !x.Contains(MessageType.ResettlementNotification))
                    .Select(ParseMessageType));
            }
            else
            {
                metaModel.MessageTypes = string.Empty;
            }
        }

        private static NotificationMetaModel CreateNotificationMetaModel(NotificationMetaModel defaultMetaModel, int maximunMonthSuport)
        {
            var today = DateTimeHelper.Today;
            var maximumMonthDistance = maximunMonthSuport - 1;
            return new NotificationMetaModel
            {
                PageIndex = defaultMetaModel.PageIndex,
                PageSize = defaultMetaModel.PageSize,
                IsOnlyUnread = defaultMetaModel.IsOnlyUnread,
                LicenseeName = defaultMetaModel.LicenseeName,
                MessageTypes = defaultMetaModel.MessageTypes,
                UserName = defaultMetaModel.UserName,
                Language = defaultMetaModel.Language,
                MaximumMonthRange = maximunMonthSuport,
                FromDate = new DateTime(today.Year, today.Month, 1).AddMonths(-maximumMonthDistance),
                ToDate = today.AddDays(1).AddMilliseconds(-1),
            };
        }
    }
}