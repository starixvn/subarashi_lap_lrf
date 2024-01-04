namespace Fanex.Athena.Module.Notification.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.StatelessBase;
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;

    /// <summary>
    /// Used by LAP container
    /// </summary>
    [ApiOneAuthorization]
    public class NotificationApiController : ExternalApiBaseController
    {
        private const int DefaultPageSize = 10;

        private readonly INotificationService _notificationService;

        private readonly IDictionary<string, int> _notificationType = new Dictionary<string, int>
        {
            { PermissionKeys.ResultAmendmentNotificationReport , 1 },
            { PermissionKeys.ReportAbnormalBet , 2 }
        };

        public NotificationApiController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<dynamic> GetNotificationMessages([FromUri] NotificationMetaModel metaModel)
        {
            metaModel.IsOnlyUnread = true;
            metaModel.PageSize = DefaultPageSize;
            metaModel.PageIndex = 1;
            metaModel.UserName = UserName;
            metaModel.LicenseeName = SiteName;
            metaModel.MessageTypes = GetMessageTypesByPermission();

            return await _notificationService.GetNotificationMessages(metaModel);
        }

        [HttpPost]
        public async Task<dynamic> MarkNotificationAsRead(NotificationMarkAsReadMetaModel metaModel)
        {
            metaModel.UserName = UserName;
            metaModel.LicenseeName = SiteName;

            var result = await _notificationService.MarkNotificationAsRead(metaModel);

            return new
            {
                Code = result.Code,
                Message = result.Message,
                IsSuccessful = result.IsSuccessful
            };
        }

        private string GetMessageTypesByPermission()
        {
            var functionList = Permissions ?? Enumerable.Empty<PortalFunction>();
            var messageTypes = functionList
                .Where(x => _notificationType.ContainsKey(x.FunctionKey))
                .Select(x => _notificationType[x.FunctionKey]);

            return string.Join(",", messageTypes);
        }
    }
}