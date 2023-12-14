namespace Fanex.Athena.Controllers.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using Base.UnitTests;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Logging;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using ONEbook.UM.Services;

    [TestFixture]
    public class PortalAuthorizationControllerTest : CultureBaseControllerHelperTest
    {
        private IMaintenanceService _maintenanceService;
        private IPortalAuthService _portalAuthService;
        private IOAuthInfo _oauthInfo;
        private ILogger _logger;
        private int _loggerCounnter;

        [SetUp]
        public void Setup()
        {
            _loggerCounnter = 0;

            _maintenanceService = Substitute.For<IMaintenanceService>();
            _portalAuthService = Substitute.For<IPortalAuthService>();
            _logger = Substitute.For<ILogger>();
            _oauthInfo = Substitute.For<IOAuthInfo>();
            StubGetValueAppSettings("EnableLogForOneAuthorization", "0");
            _logger.When(x => x.Error(Arg.Any<string>())).Do(x => _loggerCounnter++);
        }

        [TearDown]
        public void TearDown()
        {
            _maintenanceService = null;
            _logger = null;
            _loggerCounnter = 0;
        }

        [Test]
        public async Task CreateSession_UnderMaintenanceState_RedirectToUMPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.IsUnderMaintenance().Returns(true);

                const string ExpectedUrl = "/Utility/UnderMaintenance?notReload=true";

                // Action
                var result = await controller.CreateSession(string.Empty);

                // Assert
                StringAssert.Contains(ExpectedUrl, result.Url);
            }
        }

        public async Task CreateSession_InvalidToken_ReturnTokenRestrictionPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var expectedUrl = "Utility/OneTokenRestriction?code=" + OneAuthorizationErrorCode.TokenIsInValid;

                const string token = "test_token";

                _oauthInfo.IsError.Returns(true);
                _portalAuthService.RequestOAuthInfoAsync(token).Returns(_oauthInfo);

                // Action
                var result = await controller.CreateSession(token);

                // Assert
                StringAssert.Contains(expectedUrl, result.Url);
            }
        }

        public async Task CreateSession_InvalidTokenInfo_ReturnTokenRestrictionPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var expectedUrl = "Utility/OneTokenRestriction?code=" + OneAuthorizationErrorCode.TokenIsInValid;

                const string token = "test_token";
                _oauthInfo.IsError.Returns(false);
                _oauthInfo.UserID.Returns(0);
                _portalAuthService.RequestOAuthInfoAsync(token).Returns(_oauthInfo);

                // Action
                var result = await controller.CreateSession(token);

                // Assert
                StringAssert.Contains(expectedUrl, result.Url);
            }
        }

        [Test]
        public async Task CreateSession_AuthenticatedTokenButWrongDomain_RedirectToRestrictionPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string token = "test_token";
                _oauthInfo.IsError.Returns(false);
                _oauthInfo.UserID.Returns(1);
                _oauthInfo.SiteName.Returns("spondemo");
                _oauthInfo.Language.Returns("en");
                _oauthInfo.VendorID.Returns("local");
                _oauthInfo.Username.Returns("howard");
                _oauthInfo.ActionLink.Returns("http://localhost:6985/LicenseeWinLossReport");

                _portalAuthService.RequestOAuthInfoAsync(token).Returns(_oauthInfo);

                StubGetValueAppSettings("InternalSubDomain", "localhost");

                controller.Request.Url.Returns(x => new Uri("http://localhost:6985/"));

                var expectedUrl = "Utility/OneTokenRestriction?code=" + OneAuthorizationErrorCode.LocationRestrictionMsg;

                // Action
                var result = await controller.CreateSession(token);

                // Assert
                StringAssert.Contains(expectedUrl, result.Url);
            }
        }

        public async Task CreateSession_Authenticated_RedirectToActionLink()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string token = "test_token";
                const string actionLink = "LicenseeWinLossReport";

                _oauthInfo.IsError.Returns(false);
                _oauthInfo.UserID.Returns(1);
                _oauthInfo.SiteName.Returns("spondemo");
                _oauthInfo.Language.Returns("en");
                _oauthInfo.VendorID.Returns("local");
                _oauthInfo.Username.Returns("howard");
                _oauthInfo.ActionLink.Returns(actionLink);

                var resultInfo = new ResultInfo { Code = 0, Message = string.Empty, ExtendedData = actionLink };
                _portalAuthService.SignIn(controller.HttpContext, _oauthInfo).Returns(resultInfo);

                StubGetValueAppSettings("InternalSubDomain", "howard.");

                controller.Request.Url.Returns(x => new Uri("http://localhost:6985/"));

                // Action
                var result = await controller.CreateSession(token);

                // Assert
                StringAssert.Contains(actionLink, result.Url);
            }
        }

        public async Task CreateSession_NotAuthenticated_RedirectToRestrictionPageWithErrorCode()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string token = "test_token";

                _oauthInfo.IsError.Returns(false);
                _oauthInfo.UserID.Returns(1);
                _oauthInfo.SiteName.Returns("spondemo");
                _oauthInfo.Language.Returns("en");
                _oauthInfo.VendorID.Returns("local");
                _oauthInfo.Username.Returns("howard");
                _oauthInfo.ActionLink.Returns("LicenseeWinLossReport");

                var resultInfo = new ResultInfo { Code = 500, Message = "error" };
                _portalAuthService.SignIn(controller.HttpContext, _oauthInfo).Returns(resultInfo);

                StubGetValueAppSettings("InternalSubDomain", "alex.");

                controller.Request.Url.Returns(x => new Uri("http://localhost:6985/"));

                var expectedUrl = "Utility/OneTokenRestriction?code=" + 500;

                // Action
                var result = await controller.CreateSession(token);

                // Assert
                StringAssert.Contains(expectedUrl, result.Url);
            }
        }

        private PortalAuthorizationController CreateController()
        {
            return new PortalAuthorizationController(_maintenanceService, _portalAuthService, AppSettings, _logger)
            {
                ControllerContext = ControllerContext,
                Url = Url
            };
        }
    }
}