namespace Fanex.Athena.Module.Notification.ControllersAPI
{
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Results;
    using Fanex.Athena.Api.StatelessBase;
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.ResultModel;
    using Fanex.Athena.Module.Notification.DTO;
    using Fanex.Athena.Module.Notification.Helper;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;

    /// <summary>
    /// Used by LAP container
    /// </summary>
    [ApiOneAuthorization]
    public class NotificationApiController : ExternalApiBaseController
    {
        private const int DefaultPageSize = 10;

        private readonly INotificationManagerService _notificationManagerService;

        public NotificationApiController(INotificationManagerService notificationManagerService)
        {
            _notificationManagerService = notificationManagerService;
        }

        [HttpGet]
        public ReportResultModel<NotificationMessage> GetNotificationMessages([FromUri] NotificationMetaModel metaModel)
        {
            var permissionKeys = (Permissions ?? Enumerable.Empty<PortalFunction>()).Select(x => x.FunctionKey);

            metaModel.IsOnlyUnread = true;
            metaModel.PageSize = DefaultPageSize;
            metaModel.PageIndex = 1;
            metaModel.UserName = UserName;
            metaModel.LicenseeName = SiteName;
            metaModel.MessageTypes = NotificationHelper.GetMessageTypesByPermission(permissionKeys);

            return _notificationManagerService.GetNotificationMessages(metaModel);
        }

        [HttpPost]
        public JsonResult<IResultInfo> MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            metaModel.UserName = UserName;
            metaModel.LicenseeName = SiteName;

            var result = _notificationManagerService.MarkNotificationAsRead(metaModel);

            return Json(result);
        }
    }
}