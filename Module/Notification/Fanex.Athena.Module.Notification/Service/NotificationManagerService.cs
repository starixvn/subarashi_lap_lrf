namespace Fanex.Athena.Module.Notification.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.Constants;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Module.Notification.Utility.Interfaces;
    using Fanex.Athena.Resources;

    public class NotificationManagerService : INotificationManagerService
    {
        private readonly IDictionary<string, INotificationService> _notificationsSource = new Dictionary<string, INotificationService>();

        private readonly IEnumerable<string> supportedNotificationSource = new[]
        {
            NotificationSource.Internal,
            NotificationSource.OIC,
        };

        public NotificationManagerService(INotificationServiceFactory notificationServiceFactory)
        {
            foreach (var source in supportedNotificationSource)
            {
                var service = notificationServiceFactory.CreateNotificationService(source);
                _notificationsSource.Add(source, service);
            }
        }

        public ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel)
        {
            var result = new ReportResultModel<NotificationMessage>
            {
                TotalRows = 0,
                DataList = new List<NotificationMessage>()
            };

            foreach (var service in _notificationsSource.Values)
            {
                var data = service.GetNotificationMessages(metaModel);
                result.TotalRows += data.TotalRows;
                result.DataList = result.DataList.Concat(data.DataList).OrderByDescending(x => x.DateTime);
            }

            return result;
        }

        public IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            var handleService = _notificationsSource.Values.FirstOrDefault(service => service.CanHandleMarkAsRead(metaModel));

            if (handleService != null)
            {
                return handleService.MarkNotificationAsRead(metaModel);
            }

            return new ResultInfo
            {
                Code = 0,
                Message = ViewResources.MessageSuccess
            };
        }

        public ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel)
        {
            var result = new ReportResultModel<ResultAmendment>
            {
                TotalRows = 0,
                DataList = new List<ResultAmendment>()
            };
            var handleServices = GetNotificationServiceByType<IResultAmendmentService>();

            foreach (var service in handleServices)
            {
                var data = service.GetResultAmendment(metaModel);
                result.TotalRows += data.TotalRows;
                result.DataList = result.DataList.Concat(data.DataList).OrderByDescending(x => x.DateTime);
            }

            return result;
        }

        public AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var result = AmendmentTicketListing.Empty();

            var handleServices = GetNotificationServiceByType<IResultAmendmentService>();

            foreach (var service in handleServices)
            {
                var data = service.GetAmendmentTicketListing(metaModel);
                if (data.Data.Any())
                {
                    return data;
                }
            }

            return result;
        }

        private IEnumerable<T> GetNotificationServiceByType<T>(Func<T, bool> predicate = null)
        {
            var result = _notificationsSource.Values.Where(service => service is T).OfType<T>();
            if (predicate != null)
            {
                return result.Where(predicate);
            }

            return result;
        }
    }
}