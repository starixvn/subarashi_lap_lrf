namespace Fanex.Athena.Module.Notification.Service
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Constants;
    using DTO;
    using Extension.Helper;
    using Extension.Utility.Interfaces;
    using Helper;
    using Interfaces;
    using MetaModel;
    using Model.Auth.DataDomain;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Resources;

    public class InternalNotificationService : INotificationService
    {
        private const int MAX_MONTH = 2;

        private readonly IDbFactory _dbFactory;
        private readonly string[] PermissionList = { PermissionKeys.ReportAbnormalBet };

        public InternalNotificationService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public bool CanHandleMarkAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            return metaModel.Source == NotificationSource.Internal;
        }

        public ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel)
        {
            var dataList = new List<NotificationMessage>();
            var totalRows = 0;

            if (NotificationHelper.IsValidMessageTypeByPermission(metaModel.MessageTypes, PermissionList))
            {
                var paramModel = CreateNotificationMetaModel(metaModel);
                const string SpKey = "Lrf_MessageListSel";
                var lang = NotificationHelper.GetSupportedLanguage(paramModel.Language);

                using (var objectDb = _dbFactory.GetObjectDb(SpKey))
                {
                    objectDb.SetParameterValue("FromDate", paramModel.FromDate);
                    objectDb.SetParameterValue("ToDate", paramModel.ToDate);
                    objectDb.SetParameterValue("UserName", paramModel.UserName);
                    objectDb.SetParameterValue("LicenseeName", paramModel.LicenseeName);
                    objectDb.SetParameterValue("MessageTypes", paramModel.MessageTypes);

                    using (var reader = objectDb.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var messageType = Converter.ToInt(reader["MessageType"], -1) + 1;
                            dataList.Add(new NotificationMessage
                            {
                                Id = Converter.ToInt(reader["MessageId"], -1),
                                Subject = Converter.ToString2(reader["Subject" + lang]),
                                Content = Converter.ToString2(reader["Content" + lang]),
                                Type = NotificationHelper.GetNotificationTypeName(messageType.ToString()),
                                DateTime = Converter.ToDateTime(reader["EventDate"], DateTimeHelper.Now),
                                Source = NotificationSource.Internal
                            });
                        }
                    }

                    totalRows = dataList.Count;
                }
            }

            return new ReportResultModel<NotificationMessage> { TotalRows = totalRows, DataList = dataList };
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

        private static NotificationMetaModel CreateNotificationMetaModel(NotificationMetaModel defaultMetaModel)
        {
            var today = DateTimeHelper.Today;
            var maximumMonthDistance = MAX_MONTH - 1;
            var messageTypes = defaultMetaModel.MessageTypes;
            if (!string.IsNullOrEmpty(defaultMetaModel.MessageTypes))
            {
                messageTypes = string.Join(",", defaultMetaModel.MessageTypes.Split(',')
                    .Where(x => !x.Contains(MessageType.ResettlementNotification))
                    .Select(ParseMessageType));
            }

            return new NotificationMetaModel
            {
                PageIndex = defaultMetaModel.PageIndex,
                PageSize = defaultMetaModel.PageSize,
                IsOnlyUnread = defaultMetaModel.IsOnlyUnread,
                LicenseeName = defaultMetaModel.LicenseeName,
                MessageTypes = messageTypes,
                UserName = defaultMetaModel.UserName,
                Language = defaultMetaModel.Language,
                MaximumMonthRange = MAX_MONTH,
                FromDate = DateTimeHelper.CreateDateTime(today.Year, today.Month, 1).AddMonths(-maximumMonthDistance),
                ToDate = today.AddDays(1).AddMilliseconds(-1)
            };
        }

        private static int ParseMessageType(string messageType)
        {
            if (int.TryParse(messageType, out int type))
            {
                return type - 1;
            }

            return 0;
        }
    }
}