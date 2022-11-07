using Fanex.Athena.Extension.Utility;

namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using Core.Users;
    using Core.Users.Interfaces;

    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.MetaModel;
    using Fanex.Athena.Service.Core.OAuth;

    using NSubstitute;

    using NUnit.Framework;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using System.Web;
    using UnitTest.Common.Helpers;

    [TestFixture]
    public class InternalAuthServiceTest
    {
        private IOAuthService _oauthService;
        private IAuthDataAccess _authDataAccess;
        private ISessionService _sessionService;
        private IFormsAuthenticationService _formsAuthService;
        private IAppSettings _appSettings;
        private InternalAuthService _authService;

        [SetUp]
        public void Setup()
        {
            _oauthService = Substitute.For<IOAuthService>();
            _authDataAccess = Substitute.For<IAuthDataAccess>();
            _sessionService = Substitute.For<ISessionService>();
            _formsAuthService = Substitute.For<IFormsAuthenticationService>();
            _appSettings = Substitute.For<IAppSettings>();
            _authService = new InternalAuthService(_authDataAccess, _oauthService, _sessionService, _formsAuthService, _appSettings);
        }

        [TearDown]
        public void TearDown()
        {
            _oauthService = null;
            _authDataAccess = null;
            _authService = null;
            _sessionService = null;
            _formsAuthService = null;
        }

        [Test]
        public void SignIn_LicenseeIsNotSelected_UserSessionIsNull()
        {
            //Arrange
            var oauthInfo = Substitute.For<IOAuthInfo>();
            var identityName = FakeHelper.Create<string>();
            oauthInfo.IdentityName.Returns(identityName);
            oauthInfo.Language.Returns("en");
            oauthInfo.LicenseeId.Returns(0);

            // Action
            _authService.SignIn(oauthInfo);

            // Assert
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(_ => _.IdentityName == identityName),
                    null);
                _formsAuthService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
            });
        }

        [Test]
        public void SignIn_LicenseeIsSelected_CreateUserSessionAndLicenseeSession()
        {
            //Arrange
            var oauthInfo = Substitute.For<IOAuthInfo>();
            var identityName = FakeHelper.Create<string>();
            const int LicenseeId = 1;

            oauthInfo.IdentityName.Returns(identityName);
            oauthInfo.Language.Returns("en");
            oauthInfo.LicenseeId.Returns(LicenseeId);

            // Action
            _authService.SignIn(oauthInfo);

            // Assert
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(_ => _.IdentityName == identityName),
                    Arg.Is<LicenseeAuthInfo>(_ => _.LicenseeId == LicenseeId));
                _formsAuthService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
            });
        }

        [Test]
        public void ReSignIn_WhenCall_SignoutAndCreateUserSession()
        {
            //Arrange
            var oauthInfo = Substitute.For<IOAuthInfo>();
            var identityName = FakeHelper.Create<string>();
            const int LicenseeId = 1;

            oauthInfo.IdentityName.Returns(identityName);
            oauthInfo.Language.Returns("en");
            oauthInfo.LicenseeId.Returns(LicenseeId);

            // Action
            _authService.ReSignIn(oauthInfo);

            // Assert
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignSessions(
                    Arg.Is<UserAuthInfo>(_ => _.IdentityName == identityName),
                    Arg.Is<LicenseeAuthInfo>(_ => _.LicenseeId == LicenseeId));

                _formsAuthService.Received().SignOut();
                _formsAuthService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
            });
        }

        [Test]
        public async Task SignOut_WhenCall_ClearCookieAndSession()
        {
            // Arrange
            var userSession = new UserAuthInfo
            {
                OnUserId = FakeHelper.Create<int>(),
                AccessToken = FakeHelper.Create<string>()
            };
            _sessionService.UserSession.Returns(userSession);
            var httpRequest = Substitute.For<HttpRequestBase>();
            var httpResponse = Substitute.For<HttpResponseBase>();
            var httpCache = Substitute.For<HttpCachePolicyBase>();
            httpResponse.Cache.Returns(httpCache);
            httpRequest.Cookies.Returns(new HttpCookieCollection());

            // Action
            await _authService.SignOut(httpResponse, httpRequest);

            // Assert
            Assert.Multiple(() =>
            {
                httpCache.Received().SetNoStore();
                httpCache.Received().SetExpires(Arg.Any<DateTime>());
                httpCache.Received().SetCacheability(HttpCacheability.NoCache);

                _authDataAccess.Received().Logout(userSession.OnUserId);
                _oauthService.Received().RevokeAccessTokenAsync(userSession.AccessToken);
                _sessionService.Received().ClearSessions();
                _formsAuthService.Received().SignOut();
            });
        }

        [Test]
        public async Task RequestOAuthInfoAsync_WhenCall_SendParamsToOAuthServiceCorrectly()
        {
            // Arrange
            var loginMetaModel = FakeHelper.Create<LoginMetalModel>();

            _sessionService.ClientIP.Returns("127.0.0.1");
            _sessionService.SessionID.Returns("123");

            HttpContext.Current = new HttpContext(
                new HttpRequest(string.Empty, "http://abc.com", string.Empty),
                new HttpResponse(new StringWriter())
                );

            // Action
            await _authService.RequestOAuthInfoAsync(loginMetaModel);

            // Assert
            await _oauthService.Received().RequestOAuthInfoAsync("lrf_password", Arg.Is<IDictionary<string, string>>(_ =>
            _["username"] == loginMetaModel.UserName
            && _["password"] == loginMetaModel.PassWord
            && _["login_token"] == loginMetaModel.LogInToken
            && _["session_id"] == "123"
            && _["client_ip"] == "127.0.0.1"
            ));
        }

        [Test]
        public async Task RenewOAuthInfoAsync_WhenCall_SendParamsToOAuthServiceCorrectly()
        {
            // Arrange
            var licenseeId = FakeHelper.Create<int>();
            var accessToken = FakeHelper.Create<string>();
            var langCode = FakeHelper.Create<string>();

            // Action
            await _authService.RenewOAuthInfoAsync(licenseeId, accessToken, langCode);

            // Assert
            await _oauthService.Received().RequestOAuthInfoAsync("lrf_password", Arg.Is<IDictionary<string, string>>(_ =>
            _["is_renew_token"] == "1"
            && _["licensee_id"] == licenseeId + ""
            && _["access_token"] == accessToken
            && _["lang_code"] == langCode
            ));
        }
    }
}