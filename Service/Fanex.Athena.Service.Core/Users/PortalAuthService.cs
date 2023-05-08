namespace Fanex.Athena.Service.Core.Users
{
    using Extension.Utility;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Model.Core.DataDomain;
    using Resources;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;

    [CLSCompliant(false)]
    public class PortalAuthService : IPortalAuthService
    {
        private readonly ISessionService _sessionService;
        private readonly IFormsAuthenticationService _formsAuthService;
        private readonly IOAuthService _oauthService;
        private readonly IAppSettings _appSettings;

        public PortalAuthService(
            ISessionService sessionService,
            IFormsAuthenticationService formsAuthenticationService,
            IOAuthService oauthService,
            IAppSettings appSettings
            )
        {
            _sessionService = sessionService;
            _formsAuthService = formsAuthenticationService;
            _oauthService = oauthService;
            _appSettings = appSettings;
        }

        public Task<IOAuthInfo> RequestOAuthInfoAsync(string token)
            => _oauthService.RequestOAuthInfoAsync("lap_token", new Dictionary<string, string>
            {
                { nameof(token), token },
                { "access_token", _sessionService.UserSession?.AccessToken },
                { "client_ip", _sessionService.ClientIP },
                { "from_referer", _sessionService.FromReferer }
            });

        public IResultInfo SignIn(HttpContextBase currentContext, IOAuthInfo oauthInfo)
        {
            var result = ValidateSubsidiary(oauthInfo, out IResultInfo resultInfo)
                && ValidateCurrencyList(oauthInfo, out resultInfo);
            if (!result)
            {
                return resultInfo;
            }

            var userSession = _sessionService.UserSession;
            var licenseeSession = _sessionService.LicenseeSession;

            if (!IsAuthenticated(currentContext, userSession, licenseeSession, oauthInfo.IdentityName) ||
               !IsSameSession(userSession, licenseeSession, oauthInfo))
            {
                CreateFormAuth(oauthInfo);
            }

            CreateSession(oauthInfo);

            return new ResultInfo
            {
                ExtendedData = oauthInfo.ActionLink
            };
        }

        public async Task SignOut(HttpResponseBase response, HttpRequestBase request)
        {
            var userSession = _sessionService.UserSession;
            _sessionService.ClearSessions();
            CookiesHelper.ClearCookies(response, request.Cookies.AllKeys);
            _formsAuthService.SignOut();

            if (userSession != null)
            {
                await _oauthService.RevokeAccessTokenAsync(userSession.AccessToken);
            }
        }

        private static bool IsSameSession(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession, IOAuthInfo oauthInfo)
            => !string.IsNullOrEmpty(userSession.IdentityName) && string.Equals(userSession.IdentityName, oauthInfo.IdentityName, StringComparison.InvariantCultureIgnoreCase)
            && licenseeSession.LicenseeId == oauthInfo.LicenseeId;

        private static bool IsAuthenticated(HttpContextBase currentContext, UserAuthInfo userSession, LicenseeAuthInfo licenseeSession, string identityName)
        {
            if (userSession == null || licenseeSession == null || !IsValidIdentity(currentContext, identityName))
            {
                return false;
            }

            var isValidUserId = userSession.UserId > 0 && !string.IsNullOrEmpty(userSession.VendorIdentityID) && !string.IsNullOrEmpty(userSession.VendorID);

            return isValidUserId && userSession.IsInternal && licenseeSession.LicenseeId > 0 && userSession.ApplicationMode == AppMode.Parasitic;
        }

        private static bool IsValidIdentity(HttpContextBase currentContext, string identityName)
        {
            var identity = currentContext.User.Identity;
            return identity != null && identity.IsAuthenticated
                && !string.IsNullOrEmpty(identity.Name) && string.Equals(identity.Name, identityName, StringComparison.InvariantCultureIgnoreCase);
        }

        private void CreateFormAuth(IOAuthInfo oauthInfo)
            => _formsAuthService.CreateFormAuth(oauthInfo.IdentityName, false);

        private bool ValidateCurrencyList(IOAuthInfo oauthInfo, out IResultInfo resultInfo)
        {
            resultInfo = oauthInfo.CurrencyAgentList == null || !oauthInfo.CurrencyAgentList.Any() ? new ResultInfo
            {
                Code = OneAuthorizationErrorCode.UserNotHaveCurrency,
                Message = ViewResources.UserNotHaveCurrency
            } : new ResultInfo { Code = 0 };

            return resultInfo.IsSuccessful;
        }

        private bool ValidateSubsidiary(IOAuthInfo oauthInfo, out IResultInfo resultInfo)
        {
            resultInfo = oauthInfo.UserLevel == UserLevelType.Subsidiary && string.IsNullOrWhiteSpace(oauthInfo.OperatorID) ? new ResultInfo
            {
                Code = OneAuthorizationErrorCode.InvalidSubsidiaryNameMsg,
                Message = ViewResources.InvalidSubsidiaryNameMsg
            } : new ResultInfo { Code = 0 };

            return resultInfo.IsSuccessful;
        }

        private void CreateSession(IOAuthInfo oauthInfo)
        {
            var userSession = GenerateUserInfo(oauthInfo);
            var licenseeSession = GenerateLicenseeInfo(oauthInfo);
            _sessionService.AssignSessions(userSession, licenseeSession);
        }

        private LicenseeAuthInfo GenerateLicenseeInfo(IOAuthInfo oauthInfo)
            => new LicenseeAuthInfo
            {
                LicenseeId = oauthInfo.LicenseeId,
                LicenseeName = oauthInfo.SiteName,
                IsAllowedCustomerComm = oauthInfo.IsAllowedCustomerComm,
                IsEnableBA = oauthInfo.IsEnableBA,
                IsEnableSingleWallet = oauthInfo.IsEnableSingleWallet,
                OfferedSubProductList = oauthInfo.OfferedSubProductList,
                OfferedOddsGroupsList = oauthInfo.OfferedOddsGroupList,
                SiteDBServer = oauthInfo.SiteDBServer,
                IsShowVND = oauthInfo.IsShowVND
            };

        private UserAuthInfo GenerateUserInfo(IOAuthInfo oauthInfo)
           => new UserAuthInfo
           {
               IdentityName = oauthInfo.IdentityName,
               UserId = oauthInfo.UserID,
               OnUserId = oauthInfo.UserID,
               UserName = oauthInfo.Username,
               UserLevel = oauthInfo.UserLevel,
               SubsidiaryViewType = (byte)SubsidiaryManagementHelper.GetView(oauthInfo.IsEnabledSubsidiary,
                oauthInfo.IsMasterLicensee, oauthInfo.UserLevel, oauthInfo.WhiteLabelID),
               OperatorId = oauthInfo.OperatorID,
               WhiteLabelID = oauthInfo.WhiteLabelID,
               IsInternal = true,
               PortalFunctionList = oauthInfo.LapFunctionList,
               Language = Util.MapIetfLanguageCodes.GetValueOrDefault(oauthInfo.Language, "en-US"),
               DefaultReportUrl = "LicenseeWinLossReport",
               ApplicationMode = AppMode.Parasitic,
               VendorID = oauthInfo.VendorID,
               VendorIdentityID = oauthInfo.Username,
               IsSuperAdmin = oauthInfo.IsAdministrator,
               DefaultBaseCurrency = string.IsNullOrEmpty(oauthInfo.BaseCurrency) ? _appSettings.DefaultBaseCurrency
                : oauthInfo.BaseCurrency,
               AccessToken = oauthInfo.AccessToken,
               AccessTokenLifeTime = oauthInfo.AccessTokenLifeTime,
               CurrencyList = oauthInfo.CurrencyList,
               CurrencyAgentList = oauthInfo.CurrencyAgentList,
               IsShowIp = oauthInfo.IsShowIP,
               IsShowIpvn = oauthInfo.IsShowIP &&
                (oauthInfo.IsAdministrator || oauthInfo.LapFunctionList.Any(i => i.FunctionKey.Equals(PermissionKeys.BetlistViewIpvn, StringComparison.OrdinalIgnoreCase)))
           };
    }
}