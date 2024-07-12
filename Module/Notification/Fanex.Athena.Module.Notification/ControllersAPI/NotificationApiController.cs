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
    using Fanex.Athena.Web.ActionFilter;

    /// <summary>
    /// Used by LAP container
    /// </summary>
    [ApiOneAuthorization]
    public class NotificationApiController : ExternalApiBaseController
    {
        private readonly INotificationManagerService _notificationManagerService;

        public NotificationApiController(INotificationManagerService notificationManagerService)
        {
            _notificationManagerService = notificationManagerService;
        }

        [HttpGet]
        [AutoBindMetaModel(BindAgent = true)]
        public ReportResultModel<NotificationMessage> GetNotificationMessages([FromUri] NotificationMetaModel metaModel)
        {
            var permissionKeys = (Permissions ?? Enumerable.Empty<PortalFunction>()).Select(x => x.FunctionKey);

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