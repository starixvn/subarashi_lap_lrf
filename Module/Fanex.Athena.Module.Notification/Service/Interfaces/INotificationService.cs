namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Model.Core.ResultModel;

    public interface INotificationService
    {
        Task<ReportResultModel<NotificationMessage>> GetNotificationMessages(NotificationMetaModel metaModel);

        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        Task<AmendmentTicketListing> GetAmendmentTicketListing(AmendmentTicketListingMetaModel metaModel);

        Task<IResultInfo> MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel);

        IResultInfo GetFileAttachmentData(NotificationAttachmentMetaModel metaModel);
    }
}