namespace Fanex.Athena.Controllers.UnitTests
{
    using System;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Security;

    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Model.Core.DataDomain;

    using NSubstitute;

    using NUnit.Framework;

    using ONEbook.UM.Models;
    using ONEbook.UM.Services;

    public class UtilityControllerTest : CultureBaseControllerHelperTest
    {
        private IMaintenanceService _maintenanceService;
        private IOAuthService _oauthService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            StubGetValueAppSettings("InternalSubDomain", "internal.");
            StubGetValueAppSettings("LapSubDomain", "lap.");
        }

        [SetUp]
        public void SetUp()
        {
            SetUpDefaultFakeData();
            _maintenanceService = Substitute.For<IMaintenanceService>();
            _oauthService = Substitute.For<IOAuthService>();
        }

        [TearDown]
        public void TearDown()
        {
            _maintenanceService = null;
            _oauthService = null;
        }

        [Test]
        public async Task SessionIsAlive_IsUM_ReturnFailResult()
        {
            using (var controller = CreateController())
            {
                // Action     
                _maintenanceService.IsUnderMaintenance().Returns(true);
                var result = await controller.SessionIsAlive(DefaultUserSession.IdentityName) as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.IsTrue(data.IsUM);
            }
        }

        [Test]
        public async Task SessionIsAlive_IdentityNameIsInvalid_ReturnFailResult()
        {
            using (var controller = CreateController())
            {
                // Action     
                _maintenanceService.IsUnderMaintenance().Returns(false);
                var result = await controller.SessionIsAlive("user1") as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.IsAuthenticated, Is.EqualTo(false));
            }
        }

        [Test]
        public async Task SessionIsAlive_Valid_ReturnSuccessfulResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.SessionIsAlive(DefaultUserSession.IdentityName) as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.IsAuthenticated, Is.EqualTo(true));
            }
        }

        [Test]
        public async Task SessionIsAlive_AccessTokenExpired_ReNewFault()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var userSession = new UserAuthInfo
                {
                    IdentityName = DefaultUserSession.IdentityName,
                    OnUserId = DefaultUserSession.OnUserId,
                    RefreshToken = DefaultUserSession.RefreshToken,
                    AccessTokenLifeTime = DateTime.Now.AddMinutes(-5)
                };

                StubUserSessionData(userSession);

                _maintenanceService.IsUnderMaintenance().Returns(false);
                _oauthService.RequestAccessTokenAsync(userSession.RefreshToken).Returns((null, null));

                // Action
                var result = await controller.SessionIsAlive(userSession.IdentityName) as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.IsAuthenticated, Is.EqualTo(false));
                SessionService.DidNotReceive().AssignUserSession(userSession);
            }
        }

        [Test]
        public async Task SessionIsAlive_AccessTokenExpired_ReNewSuccess()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string NewAccessToken = "new_access_token";
                var userSession = new UserAuthInfo
                {
                    IdentityName = DefaultUserSession.IdentityName,
                    OnUserId = DefaultUserSession.OnUserId,
                    RefreshToken = DefaultUserSession.RefreshToken,
                    AccessTokenLifeTime = DateTime.Now.AddMinutes(-5)
                };

                StubUserSessionData(userSession);
                _maintenanceService.IsUnderMaintenance().Returns(false);
                _oauthService.RequestAccessTokenAsync(userSession.RefreshToken).Returns((NewAccessToken, DateTime.Now));

                // Action
                var result = await controller.SessionIsAlive(userSession.IdentityName) as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.IsAuthenticated, Is.EqualTo(true));
                Assert.That(data.AccessToken, Is.EqualTo(NewAccessToken));
                SessionService.Received().AssignUserSession(userSession);
            }
        }

        [Test]
        public void AccessDenied_WhenCall_ReturnCorrectViewName()
        {
            using (var controller = CreateController())
            {
                // Action
                var viewResult = controller.AccessDenied() as ViewResult;

                // Assert
                Assert.That(viewResult.ViewName, Is.EqualTo("~/Views/Desktop/Utility/AccessDenied.cshtml"));
            }
        }

        [TestCase(-1)]
        [TestCase(null)]
        [TestCase(20)]
        [TestCase(500)]
        public void OneTokenRestriction_InvalidCode_ReturnDefaultMsg(int code)
        {
            using (var controller = CreateController())
            {
                // Arrange
                var expectedMsg = ViewResources.OneTokenRestrictionDefaultMsg;

                // Action
                var result = controller.OneTokenRestriction(code) as ViewResult;

                // Assert
                Assert.That(result.ViewBag.Message, Is.EqualTo(expectedMsg));
            }
        }

        [TestCase(OneAuthorizationErrorCode.TokenWasExpired, "Token was expired")]
        [TestCase(OneAuthorizationErrorCode.LicenseeIsNotExisted, "Not found licensee")]
        [TestCase(OneAuthorizationErrorCode.TokenIsInValid, "Token is invalid")]
        [TestCase(OneAuthorizationErrorCode.LocationRestrictionMsg, "Direct Access to this website is restricted. Please contact Administrator for further enquiries.")]
        [TestCase(
            OneAuthorizationErrorCode.UserNotHaveCurrency,
            "You do not have any currency permissions to view this report, please contact your administrator account. <br/>你尚未设置任何币别权限")]
        [TestCase(OneAuthorizationErrorCode.YouAreNotAllowToAccessThisPage, "You are not allowed to access this page, please contact your administrator account.")]
        [TestCase(OneAuthorizationErrorCode.NotFoundUser, "Not found user")]
        [TestCase(OneAuthorizationErrorCode.InvalidSubsidiaryNameMsg, "Please contact admin to check your subsidiary name.")]
        public void OneTokenRestriction_ValidCode_ReturnMsgByCode(int code, string msg)
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.OneTokenRestriction(code) as ViewResult;

                // Assert
                Assert.That(result.ViewBag.Message, Is.EqualTo(msg));
            }
        }

        [Test]
        public void UnderMaintenance_UnderMaintenanceState_ReturnRightUMTimeInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var maintenanceInfo = new UnderMaintenanceTime(true, "11-14-2016 05:00:00", "11-14-2016 07:00:00");
                _maintenanceService.GetUnderMaintenanceTime().Returns(x => maintenanceInfo);

                // Action
                var result = controller.UnderMaintenance(true) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.UmTimeFrom, Is.EqualTo(maintenanceInfo.From));
                    Assert.That(result.ViewBag.UmTimeTo, Is.EqualTo(maintenanceInfo.To));
                });
            }
        }

        [Test]
        public void UnderMaintenance_UnderMaintenanceStateAndMaintenanceTimeIsEmpty_ReturnUMTimeFromQueryString()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.GetUnderMaintenanceTime().Returns(new UnderMaintenanceTime(true, string.Empty, string.Empty));

                const string QueryFrom = "01-01-2016 05:00:00";
                const string QueryTo = "01-15-2016 05:00:00";
                controller.ControllerContext.HttpContext.Request.QueryString.Returns(HttpUtility.ParseQueryString($"from={QueryFrom}&to={QueryTo}"));

                // Action
                var result = controller.UnderMaintenance(true) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.UmTimeFrom, Is.EqualTo(QueryFrom));
                    Assert.That(result.ViewBag.UmTimeTo, Is.EqualTo(QueryTo));
                });
            }
        }

        [Test]
        public void UnderMaintenance_UnderMaintenanceStateWithMaintenanceTimeAndQueryStringIsNull_ReturnEmptyUMInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.GetUnderMaintenanceTime().Returns(new UnderMaintenanceTime(true, null, null));

                controller.ControllerContext.HttpContext.Request.QueryString.Returns(HttpUtility.ParseQueryString(string.Empty));

                // Action
                var result = controller.UnderMaintenance(true) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.UmTimeFrom, Is.EqualTo(string.Empty));
                    Assert.That(result.ViewBag.UmTimeTo, Is.EqualTo(string.Empty));
                });
            }
        }

        [Test]
        public void UnderMaintenance_NotUnderMaintenanceState_ShowEmptyUMInfo()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var maintenanceInfo = new UnderMaintenanceTime(false, "11-14-2016 05:00:00", "11-14-2016 07:00:00");
                _maintenanceService.GetUnderMaintenanceTime().Returns(x => maintenanceInfo);

                // Action
                var result = controller.UnderMaintenance(true) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.UmTimeFrom, Is.Empty);
                    Assert.That(result.ViewBag.UmTimeTo, Is.Empty);
                });
            }
        }

        [Test]
        public void UnderMaintenance_NotMaintenanceStateAndReload_RedirectToLogin()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var maintenanceInfo = new UnderMaintenanceTime(false, "11-14-2016 05:00:00", "11-14-2016 07:00:00");
                _maintenanceService.GetUnderMaintenanceTime().Returns(x => maintenanceInfo);

                // Action
                var result = controller.UnderMaintenance(false) as RedirectResult;

                // Assert
                Assert.That(result.Url, Is.EqualTo(FormsAuthentication.LoginUrl));
            }
        }

        [Test]
        public void LocationRestriction_IsInternalUrl_RedirectToSignInPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Request.Url.Returns(new Uri("http://internal.com"));

                // Action
                var result = controller.LocationRestriction() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("SignIn"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Authorization"));
                });
            }
        }

        [Test]
        public void LocationRestriction_IsLapDomain_RedirectToRestrictionPage()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Request.Url.Returns(new Uri("http://lap.com"));

                // Action
                var result = controller.LocationRestriction() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("OneTokenRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                    Assert.That(result.RouteValues["code"], Is.EqualTo(100));
                });
            }
        }

        [Test]
        public void LocationRestriction_NotInternalAndLapDomain_ReturnViewLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Request.Url.Returns(new Uri("http://abc.com"));

                // Action
                var result = controller.LocationRestriction() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Utility/LocationRestriction.cshtml"));
            }
        }

        [TestCase(null, "HttpError_Default")]
        [TestCase("400", "InvalidRequestMsg")]
        [TestCase("403", "HttpError_403")]
        [TestCase("404", "HttpError_404")]
        [TestCase("999", "HttpError_Default")]
        public void Error_WhenCall_ReturnCorrectMessageAccordingtoCode(string code, string returnedMessageResourceKey)
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Request.QueryString.Returns(HttpUtility.ParseQueryString($"err={code}"));

                // Action
                var result = controller.Error() as ViewResult;

                // Assert
                Assert.That(result.Model, Is.EqualTo(ViewResources.ResourceManager.GetString(returnedMessageResourceKey)));
            }
        }

        private UtilityController CreateController()
        {
            return new UtilityController(AppSettings, LangService, _maintenanceService, _oauthService, SessionService)
            {
                ControllerContext = ControllerContext
            };
        }
    }
}