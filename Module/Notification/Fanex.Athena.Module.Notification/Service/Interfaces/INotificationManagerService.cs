namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using System.Collections.Generic;
    using DTO;
    using MetaModel;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;

    public interface INotificationManagerService
    {
        ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel);

        IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel);

        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel);
    }
}