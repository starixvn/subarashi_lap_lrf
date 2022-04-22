namespace Fanex.Athena.Service.Core.UnitTests.Users
{
    using Core.Users.Interfaces;
    using Extension.Utility.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users;
    using NSubstitute;
    using NUnit.Framework;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;
    using UnitTest.Common.Helpers;

    [TestFixture]
    public class PortalAuthServiceTest
    {
        private PortalAuthService _portalAuthService;
        private ISessionService _sessionService;
        private IFormsAuthenticationService _formAuthenticationService;
        private IOAuthService _oauthService;
        private IAppSettings _appSettings;

        [SetUp]
        public void SetUp()
        {
            _sessionService = Substitute.For<ISessionService>();
            _oauthService = Substitute.For<IOAuthService>();
            _formAuthenticationService = Substitute.For<IFormsAuthenticationService>();
            _appSettings = Substitute.For<IAppSettings>();

            _portalAuthService = new PortalAuthService(
                _sessionService,
                _formAuthenticationService,
                _oauthService,
                _appSettings
                );
        }

        [TearDown]
        public void TearDown()
        {
            _portalAuthService = null;
            _sessionService = null;
            _oauthService = null;
            _formAuthenticationService = null;
            _appSettings = null;
        }

        [Test]
        public async Task RequestOAuthInfoAsync_WhenCall_SendParamsToOAuthServiceCorrectly()
        {
            // Arrange
            var token = FakeHelper.Create<string>();
            _sessionService.ClientIP.Returns("127.0.0.1");
            _sessionService.UserSession.Returns(new UserAuthInfo { AccessToken = "123" });

            // Action
            await _portalAuthService.RequestOAuthInfoAsync(token);

            // Assert
            await _oauthService.Received().RequestOAuthInfoAsync("lap_token", Arg.Is<IDictionary<string, string>>(_ =>
            _["token"] == token
            && _["access_token"] == "123"
            && _["client_ip"] == "127.0.0.1"
            ));
        }

        [Test]
        public async Task SignOut_WhenCall_ClearCookieAndSession()
        {
            // Arrange
            var userSession = new UserAuthInfo
            {
                AccessToken = FakeHelper.Create<string>()
            };
            _sessionService.UserSession.Returns(userSession);
            var httpRequest = Substitute.For<HttpRequestBase>();
            var httpResponse = Substitute.For<HttpResponseBase>();
            var httpCache = Substitute.For<HttpCachePolicyBase>();
            httpResponse.Cache.Returns(httpCache);
            httpRequest.Cookies.Returns(new HttpCookieCollection());

            // Action
            await _portalAuthService.SignOut(httpResponse, httpRequest);

            // Assert
            Assert.Multiple(() =>
            {
                httpCache.Received().SetNoStore();
                httpCache.Received().SetExpires(Arg.Any<DateTime>());
                httpCache.Received().SetCacheability(HttpCacheability.NoCache);

                _oauthService.Received().RevokeAccessTokenAsync(userSession.AccessToken);
                _sessionService.Received().ClearSessions();
                _formAuthenticationService.Received().SignOut();
            });
        }

        [Test]
        public void SignIn_SetAuthorize_UpdateCookieAndReturnCorrectResult()
        {
            // Arrange
            var oauthInfo = CreateValidOAuthInfo();
            _sessionService.UserSession.Returns(x => null);
            _sessionService.LicenseeSession.Returns(x => null);

            var fakeHttpContext = Substitute.For<HttpContextBase>();

            // Action
            var result = _portalAuthService.SignIn(fakeHttpContext, oauthInfo);

            // Result
            Assert.Multiple(() =>
            {
                _formAuthenticationService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
                Assert.That(result.ExtendedData, Is.EqualTo(oauthInfo.ActionLink));
            });
        }

        [Test]
        public void SignIn_InvalidCurrencyList_ReturnCorrectErrorResultInfo()
        {
            // Arrange
            var oauthInfo = Substitute.For<IOAuthInfo>();
            oauthInfo.CurrencyAgentList.Returns(new Dictionary<int, int[]>());

            var expectedResult = new ResultInfo
            {
                Code = OneAuthorizationErrorCode.UserNotHaveCurrency,
                Message = ViewResources.UserNotHaveCurrency
            };

            // Action
            var result = _portalAuthService.SignIn(CreateValidFakeContext(FakeHelper.Create<string>()), oauthInfo);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.EqualTo(expectedResult.IsSuccessful));
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void SignIn_InvalidSubsidiary_ReturnCorrectErrorResultInfo()
        {
            // Arrange
            var oauthInfo = CreateValidOAuthInfo();
            oauthInfo.UserLevel.Returns((byte)2);
            oauthInfo.OperatorID.Returns(string.Empty);

            var expectedResult = new ResultInfo
            {
                Code = OneAuthorizationErrorCode.InvalidSubsidiaryNameMsg,
                Message = ViewResources.InvalidSubsidiaryNameMsg
            };

            // Action
            var result = _portalAuthService.SignIn(CreateValidFakeContext(FakeHelper.Create<string>()), oauthInfo);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.IsSuccessful, Is.EqualTo(expectedResult.IsSuccessful));
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void SignIn_DoNotHavePrevCurrentSession_CreateNewSession()
        {
            // Arrange
            var oauthInfo = CreateValidOAuthInfo();
            _sessionService.UserSession.Returns(x => null);
            _sessionService.LicenseeSession.Returns(x => null);

            // Action
            _portalAuthService.SignIn(CreateValidFakeContext(FakeHelper.Create<string>()), oauthInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignSessions(
                  Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, oauthInfo)),
                  Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, oauthInfo)));
                _formAuthenticationService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
            });
        }

        [Test]
        public void SignIn_SessionIsAnotherUser_CreateNewSession()
        {
            // Arrange
            var oauthInfo = CreateValidOAuthInfo();
            oauthInfo.UserID.Returns(FakeHelper.Create<int>());
            oauthInfo.LicenseeId.Returns(FakeHelper.Create<int>());

            var validAnotherUser = new UserAuthInfo
            {
                UserId = oauthInfo.UserID + 1
            };

            var validAnotherLicensee = new LicenseeAuthInfo
            {
                LicenseeId = oauthInfo.LicenseeId + 1
            };

            _sessionService.UserSession.Returns(validAnotherUser);
            _sessionService.LicenseeSession.Returns(validAnotherLicensee);

            var fakeHttpContext = CreateValidFakeContext(oauthInfo.Username);

            // Action
            _portalAuthService.SignIn(fakeHttpContext, oauthInfo);

            // Result
            Assert.Multiple(() =>
            {
                _sessionService.Received().AssignSessions(
               Arg.Is<UserAuthInfo>(x => AssertNewUserSession(x, oauthInfo)),
               Arg.Is<LicenseeAuthInfo>(x => AssertNewLicenseeSession(x, oauthInfo)));
                _formAuthenticationService.Received().CreateFormAuth(oauthInfo.IdentityName, false);
            });
        }

        private HttpContextBase CreateValidFakeContext(string identityName)
        {
            var fakeHttpContext = Substitute.For<HttpContextBase>();
            fakeHttpContext.User.Identity.IsAuthenticated.Returns(true);
            fakeHttpContext.User.Identity.Name.Returns(identityName);

            return fakeHttpContext;
        }

        private bool AssertNewUserSession(UserAuthInfo newUser, IOAuthInfo oauthInfo)
            => newUser.UserId == oauthInfo.UserID
              && newUser.IdentityName == oauthInfo.IdentityName
              && newUser.OnUserId == oauthInfo.UserID
              && newUser.UserName == oauthInfo.Username
              && newUser.IsInternal
              && newUser.DefaultReportUrl == "LicenseeWinLossReport"
              && newUser.ApplicationMode == AppMode.Parasitic
              && newUser.VendorID == oauthInfo.VendorID
              && newUser.VendorIdentityID == oauthInfo.Username
              && newUser.AccessTokenLifeTime == oauthInfo.AccessTokenLifeTime;

        private bool AssertNewLicenseeSession(LicenseeAuthInfo newLicensee, IOAuthInfo oauthInfo)
        => newLicensee.LicenseeId == oauthInfo.LicenseeId
                && newLicensee.IsAllowedCustomerComm == oauthInfo.IsAllowedCustomerComm
                && newLicensee.IsEnableBA == oauthInfo.IsEnableBA
                && newLicensee.IsEnableSingleWallet == oauthInfo.IsEnableSingleWallet
                && newLicensee.LicenseeName == oauthInfo.SiteName
                && newLicensee.OfferedSubProductList == oauthInfo.OfferedSubProductList;

        private static IOAuthInfo CreateValidOAuthInfo()
        {
            var oauthInfo = Substitute.For<IOAuthInfo>();
            oauthInfo.IdentityName.Returns(FakeHelper.Create<string>());
            oauthInfo.UserID.Returns(FakeHelper.Create<int>());
            oauthInfo.OnUserId.Returns(FakeHelper.Create<int>());
            oauthInfo.Username.Returns(FakeHelper.Create<string>());
            oauthInfo.IsInternal.Returns(false);
            oauthInfo.VendorID.Returns(FakeHelper.Create<string>());
            oauthInfo.UserLevel.Returns((byte)1);
            oauthInfo.OperatorID.Returns(string.Empty);
            oauthInfo.CurrencyAgentList.Returns(new Dictionary<int, int[]> { { FakeHelper.Create<int>(), FakeHelper.CreateMany<int>(1).ToArray() } });
            oauthInfo.CurrencyList.Returns(new Dictionary<int, string> { { FakeHelper.Create<int>(), FakeHelper.Create<string>() } });
            oauthInfo.LicenseeId.Returns(FakeHelper.Create<int>());
            oauthInfo.IsAllowedCustomerComm.Returns(FakeHelper.Create<bool>());
            oauthInfo.IsEnableBA.Returns(FakeHelper.Create<bool>());
            oauthInfo.IsEnableSingleWallet.Returns(FakeHelper.Create<bool>());
            oauthInfo.SiteName.Returns(FakeHelper.Create<string>());
            oauthInfo.OfferedSubProductList.Returns(FakeHelper.CreateMany<string>());
            oauthInfo.AccessToken.Returns(FakeHelper.Create<string>());
            oauthInfo.RefreshToken.Returns(FakeHelper.Create<string>());
            oauthInfo.AccessTokenLifeTime.Returns(FakeHelper.Create<DateTime>());
            oauthInfo.LapFunctionList.Returns(FakeHelper.CreateMany<PortalFunction>(5).ToArray());


            return oauthInfo;
        }
    }
}