namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Web.Mvc;
    using Base.UnitTests;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using NSubstitute;
    using NUnit.Framework;

    [TestFixture]
    public partial class HomeControllerTest : CultureBaseControllerHelperTest
    {
        private ILicenseeSettingService _licenseeSettingService;

        [TearDown]
        public void TearDown()
        {
            _licenseeSettingService = null;
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
        }

        [SetUp]
        public void SetUp()
        {
            SetUpDefaultFakeData();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
        }

        [Test]
        public void Index_InvalidSessionUser_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubUserSessionData(new UserAuthInfo
                {
                    UserId = 0
                });

                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.Index() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void Index_UserDoesNotExist_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.UserSession.Returns(x => DefaultUserSession, x => null);

                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.Index() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void Index_InvalidSessionUserName_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubUserSessionData(new UserAuthInfo
                {
                    UserId = 1,
                    UserName = string.Empty
                });

                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.Index() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void Index_InvalidLicenseeSession_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubLicenseeSessionData(null);

                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.Index() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void Index_IsNotRequestBeingRedirected_ReturnIndexView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(true);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("Home/Index.cshtml", result.ViewName);
            }
        }

        [Test]
        public void Index_ValidSessionUser_ReturnIndexView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                StringAssert.Contains("Home/Index.cshtml", result.ViewName);
            }
        }

        [TestCase(true, "1")]
        [TestCase(false, "0")]
        public void Index_AssignViewBagData_AssignCorrectIsInternalData(bool isInternal, string expectedValue)
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(true);

                AppSettings.LocalTest.Returns(true);

                StubUserSessionData(new UserAuthInfo
                {
                    UserId = 0,
                    IsInternal = isInternal
                });

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewBag.IsInternal, Is.EqualTo(expectedValue));
            }
        }

        [TestCase(true, "0")]
        [TestCase(false, "1")]
        public void Index_AssignViewBagData_AssignCorrectHasRecheckInData(bool localTest, string expectedValue)
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(true);

                AppSettings.LocalTest.Returns(localTest);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewBag.HasRecheckIn, Is.EqualTo(expectedValue));
            }
        }

        [TestCase(true, false)]
        [TestCase(false, true)]
        public void Index_AssignViewBagData_AssignIsEnabledMoveBetNotification(bool isFakeLicensee, bool expectedValue)
        {
            using (var controller = CreateController())
            {
                // Arrange
                AppSettings.IsEnabledMoveBetNotification.Returns(true);
                _licenseeSettingService.IsFakeLicensee(Arg.Any<string>()).Returns(isFakeLicensee);

                // Action
                var result = controller.Index() as ViewResult;

                // Assert
                Assert.That(result.ViewBag.IsEnabledMoveBetNotification, Is.EqualTo(expectedValue));
            }
        }

        [Test]
        public void IndexIpad_InvalidSessionUser_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubUserSessionData(new UserAuthInfo
                {
                    UserId = 0
                });

                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(false);

                // Action
                var result = controller.IndexIpad() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void IndexIpad_ValidSessionUser_ReturnIndexIpadView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                controller.ControllerContext.HttpContext.Response.IsRequestBeingRedirected.Returns(true);

                // Action
                var result = controller.IndexIpad() as ViewResult;

                // Assert
                StringAssert.Contains("Home/IndexIpad.cshtml", result.ViewName);
            }
        }

        private HomeController CreateController()
        {
            return new HomeController()
            {
                ControllerContext = ControllerContext,
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AppSettingInstance = AppSettings,
                LicenseeSettingServiceInstance = _licenseeSettingService
            };
        }
    }
}