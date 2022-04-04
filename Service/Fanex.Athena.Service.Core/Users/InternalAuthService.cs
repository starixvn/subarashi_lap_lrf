using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Model.Auth.MetaModel;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.Core.OAuth;
using Fanex.Athena.Service.Core.Users.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Fanex.Athena.Service.Core.Users
{
    public class InternalAuthService : IInternalAuthService
    {
        private readonly IAuthDataAccess _authenticationDataAccess;
        private readonly IOAuthService _oauthService;
        private readonly ISessionService _sessionService;
        private readonly IFormsAuthenticationService _formsAuthService;

        public InternalAuthService(
            IAuthDataAccess authenticationDataAccess,
            IOAuthService oauthService,
            ISessionService sessionService,
            IFormsAuthenticationService formsAuthenticationService)
        {
            _authenticationDataAccess = authenticationDataAccess;
            _oauthService = oauthService;
            _sessionService = sessionService;
            _formsAuthService = formsAuthenticationService;
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
            HttpContext.Current.Session.Clear();
            CookiesHelper.ClearCookies(response, request.Cookies.AllKeys);
            _formsAuthService.SignOut();
            if (userSession != null)
            {
                _authenticationDataAccess.Logout(userSession.OnUserId);
                await _oauthService.RevokeTokensAsync(userSession.AccessToken, userSession.RefreshToken);
            }
        }

        public void CreateSession(IOAuthInfo oauthInfo)
        {
            var userSession = GenerateUserInfo(oauthInfo);
            var licenseeSession = oauthInfo.LicenseeId > 0 ? GenerateLicenseeInfo(oauthInfo) : null;
            _sessionService.AssignSessions(userSession, licenseeSession);
        }

        public Task<IOAuthInfo> RequestOAuthInfoAsync(LoginMetalModel loginInfo, string clientIP, string sessionId)
            => _oauthService.RequestOAuthInfoAsync("lrf_password", new Dictionary<string, string>
                {
                    { "username", loginInfo.UserName },
                    { "password", loginInfo.PassWord },
                    { "login_token", loginInfo.LogInToken },
                    { "session_id", sessionId },
                    { "client_ip", clientIP }
                });

        public Task<IOAuthInfo> RenewOAuthInfoAsync(int licenseeId, string accessToken, string refreshToken, string langCode = null)
            => _oauthService.RequestOAuthInfoAsync("lrf_password", new Dictionary<string, string>
                {
                    { "is_renew_token", "1" },
                    { "licensee_id", licenseeId.ToString() },
                    { "access_token", accessToken },
                    { "refresh_token", refreshToken },
                    { "lang_code", langCode }
                });

        public Task<(string accessToken, DateTime? lifeTime)> RequestAccessTokenAsync(string refreshToken)
            => _oauthService.RequestAccessTokenAsync(refreshToken);

        private static UserAuthInfo GenerateUserInfo(IOAuthInfo oauthInfo)
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
               DefaultBaseCurrency = oauthInfo.BaseCurrency,
               IsShowIp = oauthInfo.IsShowIP,
               AccessToken = oauthInfo.AccessToken,
               AccessTokenLifeTime = oauthInfo.AccessTokenLifeTime,
               RefreshToken = oauthInfo.RefreshToken,
               CurrencyList = oauthInfo.CurrencyList,
               CurrencyAgentList = oauthInfo.CurrencyAgentList
           };

        private static LicenseeAuthInfo GenerateLicenseeInfo(IOAuthInfo oauthInfo)
            => new LicenseeAuthInfo
            {
                LicenseeId = oauthInfo.LicenseeId,
                LicenseeName = oauthInfo.SiteName,
                IsAllowedCustomerComm = oauthInfo.IsAllowedCustomerComm,
                IsEnableBA = oauthInfo.IsEnableBA,
                IsEnableSingleWallet = oauthInfo.IsEnableSingleWallet,
                OfferedSubProductList = oauthInfo.OfferedSubProductList
            };
    }
}