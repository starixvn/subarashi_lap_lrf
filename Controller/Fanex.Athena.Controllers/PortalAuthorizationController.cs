namespace Fanex.Athena.Controllers
{
    using Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Logging;
    using Newtonsoft.Json;
    using ONEbook.UM.Services;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class PortalAuthorizationController : Controller
    {
        private readonly IMaintenanceService _maintenanceService;
        private readonly IPortalAuthService _portalAuthService;
        private readonly IAppSettings _appSetting;
        private readonly ILogger _logger;

        public PortalAuthorizationController(
            IMaintenanceService maintenanceService,
            IPortalAuthService portalAuthService,
            IAppSettings appSetting,
            ILogger logger)
        {
            _maintenanceService = maintenanceService;
            _portalAuthService = portalAuthService;
            _appSetting = appSetting;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Auth/CreateSession")]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<RedirectResult> CreateSession(string token)
        {
            if (_maintenanceService.IsUnderMaintenance())
            {
                return Redirect(Url.Content("~/Utility/UnderMaintenance?notReload=true"));
            }

            const string ReturnUrl = "~/Utility/OneTokenRestriction?code=";
            if (string.IsNullOrWhiteSpace(token))
            {
                return Redirect(Url.Content(ReturnUrl + OneAuthorizationErrorCode.TokenIsInValid));
            }

            var oauthInfo = await _portalAuthService.RequestOAuthInfoAsync(token);

            if (oauthInfo.IsError)
            {
                return Redirect(Url.Content(ReturnUrl + (string.Equals(oauthInfo.ErrorMsg, OneAuthorizationErrorCode.LicenseeIsNotExisted.ToString()) ?
                    OneAuthorizationErrorCode.LicenseeIsNotExisted : OneAuthorizationErrorCode.TokenIsInValid)));
            }

            if (VerifyToken(oauthInfo))
            {
                return Redirect(Url.Content(Authorize(ReturnUrl, oauthInfo)));
            }

            WriteLog(JsonConvert.SerializeObject(oauthInfo));
            return Redirect(Url.Content(ReturnUrl + OneAuthorizationErrorCode.TokenIsInValid));
        }

        [HttpGet]
        [AuthorizeRestriction(AppMode.Parasitic)]
        [AllowAnonymous]
        [Route("Auth/InvalidateSession")]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public async Task<ActionResult> InvalidateSession()
        {
            await _portalAuthService.SignOut(Response, Request);
            return new ContentResult { Content = "Invalidate Session Success" };
        }

        private static bool VerifyToken(IOAuthInfo oAuthInfo)
        {
            return oAuthInfo.UserID > 0 &&
                !StringHelper.IsAnyNullOrEmpty(oAuthInfo.SiteName, oAuthInfo.VendorID, oAuthInfo.Username, oAuthInfo.Language, oAuthInfo.ActionLink);
        }

        private string Authorize(string returnPath, IOAuthInfo oAuthInfo)
        {
            if (IsInternalDomain(oAuthInfo.ActionLink))
            {
                return returnPath + OneAuthorizationErrorCode.LocationRestrictionMsg;
            }
            else
            {
                var result = _portalAuthService.SignIn(HttpContext, oAuthInfo);
                return result.IsSuccessful ? "~/" + result.ExtendedData : returnPath + result.Code;
            }
        }

        private bool IsInternalDomain(string actionLink)
        {
            var internalSubDomain = _appSetting.GetValue("InternalSubDomain");
            return !string.IsNullOrEmpty(internalSubDomain) && actionLink.Contains(internalSubDomain);
        }

        private void WriteLog(string errMsg)
        {
            if (string.IsNullOrEmpty(errMsg) || _appSetting.GetValue("EnableLogForOneAuthorization") != "1")
            {
                return;
            }

            var message = new StringBuilder();
            message.AppendLine("OneAuthorization Token is invalid - Token = " + errMsg);
            message.AppendLine("Url: " + Request.Url);
            message.AppendLine("UrlReferrer: " + Request.UrlReferrer);
            message.AppendLine("UserAgent: " + Request.UserAgent);
            message.AppendLine("UserHostAddress: " + Request.UserHostAddress);
            message.AppendLine("Browser: ");
            message.AppendLine(" - Platform: " + Request.Browser.Platform);
            message.AppendLine(" - Version: " + Request.Browser.Version);
            message.AppendLine(" - Crawler: " + Request.Browser.Crawler);
            _logger.Error(message.ToString());
        }
    }
}