using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Model.Auth.MetaModel;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.Core.OAuth;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Service.Core.Users
{
    public class InternalAuthService : IInternalAuthService
    {
        private readonly IAuthDataAccess _authenticationDataAccess;
        private readonly IOAuthService _oauthService;
        private readonly ISessionService _sessionService;
        private readonly IFormsAuthenticationService _formsAuthService;
        private readonly IAppSettings _appSettings;

        public InternalAuthService(
            IAuthDataAccess authenticationDataAccess,
            IOAuthService oauthService,
            ISessionService sessionService,
            IFormsAuthenticationService formsAuthenticationService,
            IAppSettings appSettings)
        {
            _authenticationDataAccess = authenticationDataAccess;
            _oauthService = oauthService;
            _sessionService = sessionService;
            _formsAuthService = formsAuthenticationService;
            _appSettings = appSettings;
        }

        public void SignIn(IOAuthInfo oauthInfo)
        {
            CreateSession(oauthInfo);
            _formsAuthService.CreateFormAuth(oauthInfo.IdentityName, false);
        }

        public void ReSignIn(IOAuthInfo oauthInfo)
        {
            CreateSession(oauthInfo);
            _formsAuthService.SignOut();
            _formsAuthService.CreateFormAuth(oauthInfo.IdentityName, false);
        }

        public async Task SignOut(HttpResponseBase response, HttpRequestBase request)
        {
            var userSession = _sessionService.UserSession;
            if (!string.IsNullOrEmpty(_sessionService.SessionID))
            {
                _sessionService.ClearSessions();
                CookiesHelper.ClearCookies(response, request.Cookies.AllKeys);
                _formsAuthService.SignOut();
            }
            if (userSession != null)
            {
                _authenticationDataAccess.Logout(userSession.OnUserId);
                await _oauthService.RevokeAccessTokenAsync(userSession.AccessToken);
            }
        }

        public void CreateSession(IOAuthInfo oauthInfo)
        {
            var userSession = GenerateUserInfo(oauthInfo);
            var licenseeSession = oauthInfo.LicenseeId > 0 ? GenerateLicenseeInfo(oauthInfo) : null;
            _sessionService.AssignSessions(userSession, licenseeSession);
        }

        public Task<IOAuthInfo> RequestOAuthInfoAsync(LoginMetalModel loginInfo)
            => _oauthService.RequestOAuthInfoAsync("lrf_password", new Dictionary<string, string>
                {
                    { "username", loginInfo.UserName },
                    { "password", loginInfo.PassWord },
                    { "login_token", loginInfo.LogInToken },
                    { "session_id", _sessionService.SessionID },
                    { "client_ip", _sessionService.ClientIP }
                });

        public Task<IOAuthInfo> RenewOAuthInfoAsync(int licenseeId, string accessToken, string langCode = null)
            => _oauthService.RequestOAuthInfoAsync("lrf_password", new Dictionary<string, string>
                {
                    { "is_renew_token", "1" },
                    { "licensee_id", licenseeId.ToString() },
                    { "access_token", accessToken },
                    { "lang_code", langCode }
                });

        private UserAuthInfo GenerateUserInfo(IOAuthInfo oauthInfo)
           => new UserAuthInfo
           {
               SubsidiaryViewType = (byte)SubsidiaryViewType.NotManagement,
               UserLevel = oauthInfo.UserLevel,
               IdentityName = oauthInfo.IdentityName,
               UserId = oauthInfo.UserID,
               OnUserId = oauthInfo.OnUserId,
               UserName = oauthInfo.Username,
               IsInternal = oauthInfo.IsInternal,
               FunctionList = oauthInfo.LrfFunctionList.ToList(),
               Language = Util.MapIetfLanguageCodes[oauthInfo.Language],
               DefaultReportUrl = oauthInfo.DefaultReportUrl,
               ApplicationMode = AppMode.Self,
               DefaultBaseCurrency = GetDefaultBaseCurrency(oauthInfo),
               IsShowIp = oauthInfo.IsShowIP,
               AccessToken = oauthInfo.AccessToken,
               AccessTokenLifeTime = oauthInfo.AccessTokenLifeTime,
               CurrencyList = oauthInfo.CurrencyList,
               CurrencyAgentList = oauthInfo.CurrencyAgentList
           };

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
                AuditCurrencies = oauthInfo.AuditCurrencies.Where(currency => currency != null).ToList(),
                SpecialPlatform = oauthInfo.SpecialPlatform,
            };

        private bool OfferCryptoCurrencyLicensees(string siteName)
        {
            return _appSettings.OfferCryptoCurrencyLicensees.Split(',')
                .Contains(siteName, StringComparer.InvariantCultureIgnoreCase);
        }

        private string GetDefaultBaseCurrency(IOAuthInfo oauthInfo)
        {
            return OfferCryptoCurrencyLicensees(oauthInfo.SiteName)
                ? "USDT"
                : oauthInfo.BaseCurrency;
        }
    }
}