namespace Fanex.Athena.Controllers.UnitTests
{
    using System;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth;
    using Model.Core.DataDomain;

    using NSubstitute;

    using NUnit.Framework;

    using ONEbook.UM.Models;

    public partial class AuthorizationControllerTest
    {
        [Test]
        public async Task RecheckIn_IsUMTime_ReturnUMResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.IsUnderMaintenance().Returns(true);
                _maintenanceService.GetUnderMaintenanceTime().Returns(new UnderMaintenanceTime
                {
                    From = "Today",
                    To = "NextWeek"
                });

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.UnderMaintenance));
            }
        }

        [Test]
        public async Task RecheckIn_NotAuthenticated_ReturnAccessDeniedResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.IsUnderMaintenance().Returns(false);

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(false);

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.AccessDenied));
            }
        }

        [Test]
        public async Task RecheckIn_OnIdNotSameSessionOnId_ReturnSessionOverrideResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.IsUnderMaintenance().Returns(false);

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(true);
                controller.ControllerContext.HttpContext.Request["onid"].Returns("123");

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.SessionOverride));
            }
        }

        [Test]
        public async Task RecheckIn_IdentityNameNotSame_ReturnSessionOverrideResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var fakeIdentity = new GenericIdentity("user1");
                var principal = new GenericPrincipal(fakeIdentity, null);
                controller.ControllerContext.HttpContext.User.Returns(principal);

                _maintenanceService.IsUnderMaintenance().Returns(false);

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(true);
                controller.ControllerContext.HttpContext.Request["onid"].Returns(DefaultUserSession.OnUserId.ToString());

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.SessionOverride));
            }
        }

        [Test]
        public async Task RecheckIn_AccessTokenExpired_ReNewFault()
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
                _authService.RequestAccessTokenAsync(userSession.RefreshToken).Returns((null, null));

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(true);
                controller.ControllerContext.HttpContext.Request["onid"].Returns(userSession.OnUserId.ToString());

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.AccessTokenInvalid));
                SessionService.DidNotReceive().AssignUserSession(userSession);

            }
        }

        [Test]
        public async Task RecheckIn_AccessTokenExpired_ReNewSuccess()
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
                _authService.RequestAccessTokenAsync(userSession.RefreshToken).Returns((NewAccessToken, DateTime.Now));

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(true);
                controller.ControllerContext.HttpContext.Request["onid"].Returns(userSession.OnUserId.ToString());

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.Success));
                Assert.That(data.AccessToken, Is.EqualTo(NewAccessToken));
                SessionService.Received().AssignUserSession(userSession);
            }

        }

        [Test]
        public async Task RecheckIn_ReCheckInSuccess_ReturnSuccessResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                _maintenanceService.IsUnderMaintenance().Returns(false);
                _userService.RecheckIn(DefaultUserSession.OnUserId).Returns(false);

                controller.ControllerContext.HttpContext.Request.IsAuthenticated.Returns(true);
                controller.ControllerContext.HttpContext.Request["onid"].Returns(DefaultUserSession.OnUserId.ToString());

                // Action
                var result = await controller.RecheckIn() as JsonResult;
                var data = result.Data as dynamic;

                // Assert
                Assert.That(data.ErrCode, Is.EqualTo((int)ErrorType.Success));
            }
        }
    }
}