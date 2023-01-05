namespace Fanex.Athena.Module.Notification.Api
{
    using Fanex.Athena.Api.StatelessBase;
    using Fanex.Athena.Api.StatelessBase.Attributes;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.Notification.MetaModel;
    using Fanex.Athena.Module.Notification.Service.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    /// <summary>
    /// Used by LAP container
    /// </summary>
    [ApiOneAuthorization]
    public class NotificationApiController : ExternalApiBaseController
    {
        private const int DefaultPageSize = 10;

        private readonly IMoveBetService _moveBetService;
        private readonly ILicenseeSettingService _licenseeSettingService;

        private readonly INotificationService _notificationService;
        private readonly IAppSettings _appSettings;

        private readonly IDictionary<string, int> _notificationType = new Dictionary<string, int>
        {
            { PermissionKeys.ResultAmendmentNotificationReport , 1 },
            { PermissionKeys.ReportAbnormalBet , 2 }
        };

        public NotificationApiController(
            IMoveBetService moveBetService,
            INotificationService notificationService,
            IAppSettings appSettings,
            ILicenseeSettingService licenseeSettingService)
        {
            _moveBetService = moveBetService;
            _notificationService = notificationService;
            _appSettings = appSettings;
            _licenseeSettingService = licenseeSettingService;
        }

        [HttpGet]
        public async Task<string> Index()
        {
            var isEnabledMoveBetNotification = _appSettings.IsEnabledMoveBetNotification && !_licenseeSettingService.IsFakeLicensee(SiteName);

            if (!isEnabledMoveBetNotification)
            {
                return string.Empty;
            }

            var langCode = Util.MapIetfLanguageCodes.GetValueOrDefault(Language, string.Empty);

            return await _moveBetService.GetMoveBetNotificationAsync(langCode).ConfigureAwait(false);
        }

        [HttpGet]
        public async Task<dynamic> GetNotificationMessages([FromUri] NotificationMetaModel metaModel)
        {
            var maximumMonthDistance = NotificationMetaModel.MaximumMonthRange - 1;

            var today = DateTime.Today;
            metaModel.IsOnlyUnread = true;
            metaModel.FromDate = new DateTime(today.Year, today.Month, 1).AddMonths(-maximumMonthDistance);
            metaModel.ToDate = today.AddDays(1).AddMilliseconds(-1);
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