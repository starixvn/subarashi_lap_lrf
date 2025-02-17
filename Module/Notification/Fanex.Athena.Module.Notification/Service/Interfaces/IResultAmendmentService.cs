namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using System.Collections.Generic;
    using DTO;
    using MetaModel;
    using Model.Core.ResultModel;

    public interface IResultAmendmentService
    {
        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        AmendmentTicketListing GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        bool CanHandleAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        List<AmendmentTicketListing> GetAllAmendmentTicketListing(NotificationMetaModel metaModel);
    }
}