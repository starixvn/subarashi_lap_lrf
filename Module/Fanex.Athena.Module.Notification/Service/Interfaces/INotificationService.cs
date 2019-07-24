namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Model.Core.ResultModel;

    public interface INotificationService
    {
        ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel);

        ReportResultModel<ResultAmendment> GetResultAmendment(NotificationMetaModel metaModel);

        IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel);

        IResultInfo GetFileAttachmentData(NotificationAttachmentMetaModel metaModel);
    }
}