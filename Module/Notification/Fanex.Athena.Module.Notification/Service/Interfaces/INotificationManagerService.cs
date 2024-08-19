namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;

    public interface INotificationManagerService
    {
        ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel);

        IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel);

        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel);
    }
}