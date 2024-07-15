namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;

    public interface IResultAmendmentService
    {
        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        bool CanHandleAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel);
    }
}