namespace Fanex.Athena.Module.Notification.Service.Interfaces
{
    using DTO;
    using MetaModel;
    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;

    public interface INotificationService
    {
        ReportResultModel<NotificationMessage> GetNotificationMessages(NotificationMetaModel metaModel);

        IResultInfo MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel);

        bool CanHandleMarkAsRead(NotificationMarkAsReadMetaModel metaModel);
    }
}