namespace Fanex.Athena.Module.Notification.Service
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Constants;
    using DTO;
    using Interfaces;
    using MetaModel;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Resources;
    using Utility.Interfaces;

    public class NotificationManagerService : INotificationManagerService
    {
        private readonly IDictionary<string, INotificationService> _notificationsSource = new Dictionary<string, INotificationService>();

        private readonly IEnumerable<string> supportedNotificationSource = new[]
        {
            NotificationSource.Internal,
            NotificationSource.OIC,
            NotificationSource.CRM
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

            return GetPagingData(result, metaModel.PageIndex, metaModel.PageSize);
        }

        public AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel)
        {
            var result = AmendmentTicketListing.Empty();

            var handleService = GetNotificationServiceByType<IResultAmendmentService>()
                .FirstOrDefault(service => service.CanHandleAmendmentTicketListing(metaModel));

            if (handleService != null)
            {
                var data = handleService.GetAmendmentTicketListing(metaModel);
                return data;
            }

            return result;
        }

        public List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel)
        {
            var result = new List<AmendmentTicketListing>();

            var handleServices = GetNotificationServiceByType<IResultAmendmentService>();
            foreach (var service in handleServices)
            {
                var data = service.GetAllAmendmentTicketListing(metaModel);
                if (data != null && data.Any())
                {
                    result.AddRange(data);
                }
            }

            return result.OrderByDescending(_ => _.DateTime).ToList();
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

        private ReportResultModel<ResultAmendment> GetPagingData(ReportResultModel<ResultAmendment> data, int pageIndex, int pageSize)
        {
            if (pageIndex == 0 || pageSize == 0)
            {
                return data;
            }

            var result = new ReportResultModel<ResultAmendment>
            {
                DataList = data.DataList.Skip((pageIndex - 1) * pageSize).Take(pageSize),
                TotalRows = data.TotalRows
            };
            return result;
        }
    }
}