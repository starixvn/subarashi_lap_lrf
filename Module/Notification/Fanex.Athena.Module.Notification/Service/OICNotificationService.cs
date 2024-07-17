namespace Fanex.Athena.Module.Notification.Service
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.Constants;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.Helper;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Resources;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Fanex.Data;
    using Fanex.Logging;
    using Newtonsoft.Json.Linq;

    public class OICNotificationService : INotificationService, IResultAmendmentService
    {
        private readonly ILogger _logger;
        private readonly IAppSettings _appSetting;
        private readonly IWebClientService _webClientService;
        private readonly IDbFactory _dbFactory;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;

        private const int MAX_MONTH = 6;
        private readonly string[] PermissionList = new[] { PermissionKeys.ResultAmendmentNotificationReport };

        public OICNotificationService(
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

        #region Notification

        public bool CanHandleMarkAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            return metaModel.Source == NotificationSource.OIC;
        }

        public bool CanHandleAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            return metaModel.Source == NotificationSource.OIC;
        }

        public ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel)
        {
            if (NotificationHelper.IsValidMessageTypeByPermission(metaModel.MessageTypes, PermissionList))
            {
                var paramModel = CreateNotificationMetaModel(metaModel);
                var data = GetDataFromAPI(paramModel, MapToNotificationMessage);
                return data;
            }

            return new ReportResultModel<NotificationMessage> { TotalRows = 0, DataList = new List<NotificationMessage>() };
        }

        public IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            const string relativePath = "/Api/MarkNotificationAsRead";
            var api = new Uri($"{_appSetting.OICApiUrl}{relativePath}");
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

        #endregion Notification

        #region Report

        public ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel)
        {
            var param = CreateResultAmendmentMetaModel(metaModel);
            var data = GetDataFromAPI(param, MapToResultAmendment);

            return data;
        }

        public AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
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

                using (var reader = objectDb.ExecuteReader())
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
                result.DateTime = metaModel.DateTime;
            }

            return result;
        }

        public List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel)
        {
            var result = new List<AmendmentTicketListing>();
            var resultAmendment = GetResultAmendment(metaModel);
            foreach (var amendment in resultAmendment.DataList)
            {
                var param = new AmendmentTicketListingMetaModel
                {
                    Source = amendment.Source,
                    SessionId = amendment.SessionId,
                    DateTime = amendment.DateTime,
                    AgentListXml = metaModel.AgentListXml,
                    Language = metaModel.Language
                };
                var data = GetAmendmentTicketListing(param);
                result.Add(data);
            }
            return result;
        }

        #endregion Report

        private ReportResultModel<T> GetDataFromAPI<T>(NotificationMetaModel metaModel, Func<JToken, string, string, T> mapData) where T : class
        {
            var dataList = new List<T>();
            var totalRecords = 0;

            if (string.IsNullOrEmpty(_appSetting.OICApiUrl))
            {
                return new ReportResultModel<T>
                {
                    DataList = dataList,
                    TotalRows = totalRecords
                };
            }

            var apiUrl = GetResultAmendmentUrl(metaModel);

            try
            {
                var json = _webClientService.DownloadString(apiUrl);
                if (string.IsNullOrEmpty(json))
                {
                    return new ReportResultModel<T>
                    {
                        DataList = dataList,
                        TotalRows = totalRecords
                    };
                }

                var jobject = JObject.Parse(json);
                if (jobject.HasValues && jobject["Data"].Children().Any())
                {
                    var lang = NotificationHelper.GetSupportedLanguage(metaModel.Language);
                    var subjectKey = "Subject" + lang;
                    var contentKey = "Content" + lang;

                    totalRecords = jobject["TotalItems"].Value<int>();
                    dataList.AddRange(jobject["Data"].Children().Select(x => mapData(x, subjectKey, contentKey)));
                }
            }
            catch (Exception e)
            {
                LogError(apiUrl, e);
            }

            return new ReportResultModel<T>
            {
                DataList = dataList,
                TotalRows = totalRecords
            };
        }

        private string GetResultAmendmentUrl(NotificationMetaModel metaModel)
        {
            const string relativePath = "/Api/Amendment";
            string param = string.Format("FromDate={0}&ToDate={1}&UserName={2}&LicenseeName={3}&IsOnlyUnread={4}&PageSize={5}&PageIndex={6}",
                metaModel.FromDate,
                metaModel.ToDate,
                metaModel.UserName,
                metaModel.LicenseeName,
                metaModel.IsOnlyUnread,
                metaModel.PageSize,
                metaModel.PageIndex - 1);

            var uri = new Uri($"{_appSetting.OICApiUrl}{relativePath}?{param}");

            return uri.AbsoluteUri;
        }

        private void LogError(string api, Exception exception)
        {
            _logger.Error(exception.Message + "\nApiUrl: " + api, exception);
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
                Type = NotificationHelper.GetNotificationTypeName(MessageType.ResettlementNotification),
                Source = NotificationSource.OIC
            };
        }

        private NotificationMessage MapToNotificationMessage(JToken token, string subjectKey, string contentKey)
        {
            const string DefaultSubjectKey = "SubjectEn";
            var subject = token[subjectKey].Value<string>();

            return new NotificationMessage
            {
                Id = token["MessageId"].Value<int>(),
                DateTime = token["EventDate"].Value<DateTime>(),
                Content = token[contentKey].Value<string>(),
                Subject = string.IsNullOrWhiteSpace(subject) ? token[DefaultSubjectKey].Value<string>() : subject,
                Type = NotificationHelper.GetNotificationTypeName(MessageType.ResettlementNotification),
                Source = NotificationSource.OIC
            };
        }

        private NotificationMetaModel CreateNotificationMetaModel(NotificationMetaModel defaultMetaModel)
        {
            var today = DateTimeHelper.Today;
            var maximumMonthDistance = MAX_MONTH - 1;
            return new NotificationMetaModel
            {
                PageIndex = 1,
                PageSize = int.MaxValue - 1000,
                IsOnlyUnread = true,
                LicenseeName = defaultMetaModel.LicenseeName,
                MessageTypes = defaultMetaModel.MessageTypes,
                UserName = defaultMetaModel.UserName,
                Language = defaultMetaModel.Language,
                MaximumMonthRange = MAX_MONTH,
                FromDate = DateTimeHelper.CreateDateTime(today.Year, today.Month, 1).AddMonths(-maximumMonthDistance),
                ToDate = today.AddDays(1).AddMilliseconds(-1),
                AgentListXml = defaultMetaModel.AgentListXml,
            };
        }

        private NotificationMetaModel CreateResultAmendmentMetaModel(NotificationMetaModel defaultMetaModel)
        {
            return new NotificationMetaModel
            {
                PageIndex = 1,
                PageSize = int.MaxValue - 1000,
                IsOnlyUnread = defaultMetaModel.IsOnlyUnread,
                LicenseeName = defaultMetaModel.LicenseeName,
                MessageTypes = defaultMetaModel.MessageTypes,
                UserName = defaultMetaModel.UserName,
                Language = defaultMetaModel.Language,
                MaximumMonthRange = MAX_MONTH,
                FromDate = defaultMetaModel.FromDate,
                ToDate = defaultMetaModel.ToDate,
                AgentListXml = defaultMetaModel.AgentListXml,
            };
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
    }
}