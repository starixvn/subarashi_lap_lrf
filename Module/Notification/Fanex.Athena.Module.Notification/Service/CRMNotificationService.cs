namespace Fanex.Athena.Module.Notification.Service
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Fanex.Athena.Extension.Helper;
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
    using Fanex.Common;

    public class CRMNotificationService : INotificationService, IResultAmendmentService
    {
        private const int MAX_MONTH = 6;
        private readonly string[] PermissionList = new[] { PermissionKeys.ResultAmendmentNotificationReport };

        private readonly IDbFactory _dbFactory;

        public CRMNotificationService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public bool CanHandleMarkAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            return metaModel.Source == NotificationSource.CRM;
        }

        public bool CanHandleAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            return metaModel.Source == NotificationSource.CRM;
        }

        public ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel)
        {
            var paramModel = CreateNotificationMetaModel(metaModel);
            var data = GetDataFromDB(paramModel, GetDataNotificationMessage);

            if (data == null || data.DataList == null)
            {
                return new ReportResultModel<NotificationMessage>
                {
                    TotalRows = 0,
                    DataList = new List<NotificationMessage>()
                };
            }

            var readMessageIds = GetReadNotification(paramModel);

            data.DataList = data.DataList.Where(x => !readMessageIds.Contains(x.Id));
            data.TotalRows = data.DataList.Count();

            return data;
        }

        public IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            var result = new ResultInfo
            {
                Code = 0,
                Message = ViewResources.MessageSuccess
            };

            const string SpKey = "Lrf_MessageUserIns";
            var sourceId = NotificationHelper.GetSourceIdBySourceName(metaModel.Source);
            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("MessageId", metaModel.MessageId);
                objectDb.SetParameterValue("LicenseeName", metaModel.LicenseeName);
                objectDb.SetParameterValue("UserName", metaModel.UserName);
                objectDb.SetParameterValue("Source", sourceId);
                objectDb.ExecuteNonQuery();
            }

            return result;
        }

        public ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel)
        {
            var paramModel = CreateResultAmendmentMetaModel(metaModel);
            var data = GetDataFromDB(paramModel, GetDataResultAmendment);

            if (data == null || data.DataList == null)
            {
                return new ReportResultModel<ResultAmendment>
                {
                    TotalRows = 0,
                    DataList = new List<ResultAmendment>()
                };
            }

            var readNotificationModel = CreateNotificationMetaModel(metaModel);
            var readMessageIds = GetReadNotification(readNotificationModel);

            foreach (var element in data.DataList)
            {
                element.IsRead = readMessageIds.Contains(element.Id);
            }

            return data;
        }

        public AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            const string SpKey = "Lrf_AdmTicketListSel";
            var result = AmendmentTicketListing.Empty();
            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);
                objectDb.SetParameterValue("NotiID", metaModel.SessionId);
                objectDb.SetParameterValue("FEventDate", metaModel.DateTime);
                objectDb.SetParameterValue("TEventDate", metaModel.DateTime);

                using (var reader = objectDb.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        result.Id = Converter.ToString2(reader["NotiID"]);
                        result.MatchInfo = Converter.ToString2(reader["EventName"]);
                        result.DateTime = Converter.ToDateTime(reader["EventDate"]);
                    }
                    reader.NextResult();

                    var index = 0;
                    while (reader.Read())
                    {
                        result.Data.Add(new AmendmentTicket
                        {
                            Id = Converter.ToString2(reader["NotiID"]),
                            Index = ++index,
                            RefNo = Converter.ToString2(reader["RefNo"]),
                            ExternalId = Converter.ToString2(reader["ExternalId"]),
                            SystemId = Converter.ToString2(reader["SystemId"])
                        });
                    }
                }
            }

            return result;
        }

        public List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel)
        {
            const string SpKey = "Lrf_AdmTicketListSel";
            var info = new List<AmendmentTicketListing>();
            var detail = new List<AmendmentTicket>();

            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);
                objectDb.SetParameterValue("FEventDate", metaModel.FromDate);
                objectDb.SetParameterValue("TEventDate", metaModel.ToDate);

                using (var reader = objectDb.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var dataInfo = new AmendmentTicketListing
                        {
                            Id = Converter.ToString2(reader["NotiID"]),
                            MatchInfo = Converter.ToString2(reader["EventName"]),
                            DateTime = Converter.ToDateTime(reader["EventDate"]),
                        };
                        info.Add(dataInfo);
                    }
                    reader.NextResult();

                    while (reader.Read())
                    {
                        var dataDetail = new AmendmentTicket
                        {
                            Id = Converter.ToString2(reader["NotiID"]),
                            RefNo = Converter.ToString2(reader["RefNo"]),
                            ExternalId = Converter.ToString2(reader["ExternalId"]),
                            SystemId = Converter.ToString2(reader["SystemId"])
                        };

                        detail.Add(dataDetail);
                    }
                }
            }

            var result = info.GroupJoin(detail, n => n.Id, m => m.Id, (i, d) => new AmendmentTicketListing
            {
                Id = i.Id,
                MatchInfo = i.MatchInfo,
                DateTime = i.DateTime,
                Data = d.DefaultIfEmpty().ToList(),
            }).ToList();

            return result;
        }

        private T GetDataFromDB<T>(NotificationMetaModel metaModel, Func<IDataReader, T> readerHandle)
        {
            if (NotificationHelper.IsValidMessageTypeByPermission(metaModel.MessageTypes, PermissionList))
            {
                const string SpKey = "Lrf_AdmNotificationSel";

                using (var objectDb = _dbFactory.GetObjectDb(SpKey))
                {
                    objectDb.SetParameterValue("FEventDate", metaModel.FromDate);
                    objectDb.SetParameterValue("TEventDate", metaModel.ToDate);
                    objectDb.SetParameterValue("PageSize", metaModel.PageSize);
                    objectDb.SetParameterValue("PageIndex", metaModel.PageIndex);
                    objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);

                    using (var reader = objectDb.ExecuteReader())
                    {
                        return readerHandle(reader);
                    }
                }
            }

            return default;
        }

        private IEnumerable<int> GetReadNotification(NotificationMetaModel metaModel)
        {
            const string SpKey = "Lrf_MessageUserSel";
            var sourceId = NotificationHelper.GetSourceIdBySourceName(NotificationSource.CRM);
            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                objectDb.SetParameterValue("FromDate", metaModel.FromDate);
                objectDb.SetParameterValue("ToDate", metaModel.ToDate);
                objectDb.SetParameterValue("UserName", metaModel.UserName);
                objectDb.SetParameterValue("LicenseeName", metaModel.LicenseeName);
                objectDb.SetParameterValue("Source", sourceId);

                return objectDb.Query<int>();
            }
        }

        private ReportResultModel<NotificationMessage> GetDataNotificationMessage(IDataReader reader)
        {
            var dataList = new List<NotificationMessage>();

            while (reader.Read())
            {
                dataList.Add(new NotificationMessage
                {
                    Id = Converter.ToInt(reader["NotiID"]),
                    Subject = Converter.ToString2(reader["Title"]),
                    Content = Converter.ToString2(reader["Content"]),
                    Type = NotificationHelper.GetNotificationTypeName(MessageType.ResettlementNotification),
                    DateTime = Converter.ToDateTime(reader["EventDate"], DateTimeHelper.Now),
                    Source = NotificationSource.CRM
                });
            }

            return new ReportResultModel<NotificationMessage> { TotalRows = dataList.Count, DataList = dataList };
        }

        private ReportResultModel<ResultAmendment> GetDataResultAmendment(IDataReader reader)
        {
            var dataList = new List<ResultAmendment>();
            var totalRows = 0;

            while (reader.Read())
            {
                dataList.Add(new ResultAmendment
                {
                    Id = Converter.ToInt(reader["NotiID"]),
                    Subject = Converter.ToString2(reader["Title"]),
                    Content = Converter.ToString2(reader["Content"]),
                    Type = NotificationHelper.GetNotificationTypeName(MessageType.ResettlementNotification),
                    DateTime = Converter.ToDateTime(reader["EventDate"], DateTimeHelper.Now),
                    Source = NotificationSource.CRM,
                    SessionId = Converter.ToString2(reader["NotiID"]),
                });
            }

            if (reader.NextResult() && reader.Read())
            {
                totalRows = Converter.ToInt(reader["TotalRows"], dataList.Count);
            }
            else
            {
                totalRows = dataList.Count;
            }

            return new ReportResultModel<ResultAmendment> { TotalRows = totalRows, DataList = dataList };
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
    }
}