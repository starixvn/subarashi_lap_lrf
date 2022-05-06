namespace Fanex.Athena.Controllers.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;

    using Base.UnitTests;

    using Extension.Utility.Interfaces;
    using Fanex.Athena.Service.Core.OAuth;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Users;

    using NSubstitute;

    using NUnit.Framework;

    using ONEbook.UM.Services;

    using Resources;

    [TestFixture]
    public partial class AuthorizationControllerTest : CultureBaseControllerHelperTest
    {
        private IMaintenanceService _maintenanceService;
        private IUserService _userService;
        private IInternalAuthService _authService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _maintenanceService = Substitute.For<IMaintenanceService>();
            _userService = Substitute.For<IUserService>();
            _authService = Substitute.For<IInternalAuthService>();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _maintenanceService = null;
            _userService = null;
            _authService = null;
        }


        [SetUp]
        public void Setup()
        {
            base.FixtureSetUp();

            SetUpDefaultFakeData();
        }

        [TearDown]
        public void TearDown()
        {
            AppSettings.ClearReceivedCalls();
            _userService.ClearReceivedCalls();
            _authService.ClearReceivedCalls();
            SessionService.ClearReceivedCalls();
        }

        [Test]
        public void Captcha_WhenCall_ReturnFileContent()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.CaptchaCode = null;

                // Action
                var result = controller.Captcha();

                // Assert
                Assert.That(result, Is.Not.Null);
            }
        }

        [Test]
        public void Captcha_WhenCall_AssignCaptchaToSession()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.CaptchaCode = null;

                // Action
                controller.Captcha();

                // Assert
                Assert.That(SessionService.CaptchaCode.Length, Is.EqualTo(4));
            }
        }

        [Test]
        public void GetUserSalt_WhenCall_ReturnSaltFromService()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string UserName = "abc";
                _userService.GetByUsername(UserName, false).Returns(new User
                {
                    UserSalt = "xxx"
                });

                // Action
                var result = controller.GetUserSalt(UserName);

                // Assert
                Assert.That(result, Is.EqualTo("xxx"));
            }
        }

        [Test]
        public void GetUserSalt_UserDoesNotExist_ReturnEmptyString()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string UserName = "abc";
                _userService.GetByUsername(UserName, false).Returns(x => null);

                // Action
                var result = controller.GetUserSalt(UserName);

                // Assert
                Assert.That(result, Is.Empty);
            }
        }

        [Test]
        public async Task SignOut_WhenCall_CallSignOutFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                _ = await controller.SignOut();

                // Assert
                await _authService.Received()
                    .SignOut(ControllerContext.HttpContext.Response, ControllerContext.HttpContext.Request);
            }
        }

        [Test]
        public async Task SignOut_WhenCall_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.SignOut() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public async Task SignOut_WhenCall_CallInternalAuthServiceToSignOut()
        {
            using (var controller = CreateController())
            {
                // Arrange

                // Action
                _ = await controller.SignOut();

                // Assert
                await _authService.Received()
                    .SignOut(controller.ControllerContext.HttpContext.Response, controller.ControllerContext.HttpContext.Request);
            }
        }

        [Test]
        public async Task InternalSignOut_WhenCall_CallSignOutFromService()
        {
            using (var controller = CreateController())
            {
                // Action
                _ = await controller.InternalSignOut();

                // Assert
                await _authService.Received()
                                    .SignOut(ControllerContext.HttpContext.Response, ControllerContext.HttpContext.Request);
            }
        }

        [Test]
        public async Task InternalSignOut_WhenCall_RedirectToOneTokenRestriction()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = await controller.InternalSignOut() as RedirectToRouteResult;

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
        public void ChangePassword_WhenGet_ReturnCorrectViewNam()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.ChangePassword() as ViewResult;

                // Assert
                StringAssert.Contains("Authorization/ChangePass.cshtml", result.ViewName);
            }
        }

        [Test]
        public void ChangePassword_WhenGet_ReturnCorrectViewBag()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.ChangePassword() as ViewResult;

                // Assert
                Assert.That(result.ViewBag.PageData as Dictionary<string, string>, Is.Not.Null);
            }
        }

        [Test]
        public void ChangePassword_WhenPost_InvalidNewPassword_ReturnErrorResult()
        {
            using (var controller = CreateController())
            {
                // Action
                var result = controller.ChangePassword("oldpassword", "abc") as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(data.errCode, Is.EqualTo(ErrorType.Unknown));
                    Assert.That(data.errMsg, Is.EqualTo(ViewResources.PasswordNoteMsg));
                });
            }
        }

        [Test]
        public void ChangePassword_WhenPost_IsInternalUser_ReturnAccessDenied()
        {
            using (var controller = CreateController())
            {
                // Arrange
                SessionService.UserSession.IsInternal = true;

                // Action
                var result = controller.ChangePassword("oldpassword", "1234aa") as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(data.errCode, Is.EqualTo(ErrorType.AccessDenied));
                    Assert.That(data.errMsg, Is.EqualTo(ViewResources.AccessDeniedMsg));
                });
            }
        }

        [Test]
        public void ChangePassword_WhenPost_ValidData_CallServiceCorrectly()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const string OldPassword = "oldpassword";
                const string NewPassword = "1234aa";
                const int ErrorCode = 999;

                SessionService.UserSession.IsInternal = false;

                _userService.ChangePassword(DefaultUserSession.UserName, OldPassword, NewPassword, Arg.Any<string>())
                    .Returns(new ResultInfo
                    {
                        Code = ErrorCode
                    });

                // Action
                var result = controller.ChangePassword(OldPassword, NewPassword) as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.Multiple(() =>
                {
                    _userService.Received().ChangePassword(DefaultUserSession.UserName, OldPassword, NewPassword, string.Empty);
                    Assert.That(data.errCode, Is.EqualTo(ErrorCode));
                });
            }
        }

        private AuthorizationController CreateController()
        {
            return new AuthorizationController(
               _maintenanceService,
               _userService,
               _authService
               )
            {
                ControllerContext = ControllerContext,
                LangService = LangService,
                SessionServiceInstance = SessionService,
                AppSettingInstance = AppSettings
            };
        }
    }
}