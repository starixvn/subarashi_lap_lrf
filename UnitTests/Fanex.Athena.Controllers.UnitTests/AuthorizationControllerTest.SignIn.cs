namespace Fanex.Athena.Controllers.UnitTests
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Fanex.Athena.Model.Auth.MetaModel;
    using Fanex.Athena.Service.Core.OAuth;

    using NSubstitute;

    using NUnit.Framework;

    using UnitTest.Common.Helpers;

    public partial class AuthorizationControllerTest
    {
        [Test]
        public void SignIn_WhenGet_NotInternalDomain_RedirectToLocationRestriction()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("InternalSubDomain", "fakeurl");

                // Action
                var result = controller.SignIn() as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("LocationRestriction"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("Utility"));
                });
            }
        }

        [Test]
        public void SignIn_WhenGet_IsInternalDomain_ReturnCorrectView()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("InternalSubDomain", MvcHelper.TestingRequestDomain);

                // Action
                var result = controller.SignIn() as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Authorization/SignIn.cshtml"));
            }
        }

        [Test]
        public void SignIn_WhenGet_IsInternalDomain_ReturnCorrectViewBag()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("InternalSubDomain", MvcHelper.TestingRequestDomain);

                // Action
                var result = controller.SignIn() as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.LogInToken, Is.Not.Null);
                    Assert.That(result.ViewBag.errCode, Is.EqualTo(0));
                    Assert.That(result.ViewBag.errMsg, Is.Empty);
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_InvalidCaptcha_ReturnSignInViewWithError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "0");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                // Action
                var result = await controller.SignIn(new LoginMetalModel
                {
                    UserName = "anything",
                    PassWord = "anything",
                    Captcha = "WrongCaptcha"
                }) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(SessionService.CaptchaCode, Is.Not.EqualTo("OriginalCaptcha"));
                    Assert.That(result.ViewBag.errCode, Is.EqualTo(101));
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Authorization/SignIn.cshtml"));
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_UserNameIsEmpty_ReturnSignInViewWithError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "1");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                // Action
                var result = await controller.SignIn(new LoginMetalModel
                {
                    UserName = string.Empty
                }) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.errCode, Is.EqualTo(102));
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Authorization/SignIn.cshtml"));
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_PassWordIsEmpty_ReturnSignInViewWithError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "1");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                // Action
                var result = await controller.SignIn(new LoginMetalModel
                {
                    UserName = "User name",
                    PassWord = string.Empty
                }) as ViewResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.ViewBag.errCode, Is.EqualTo(103));
                    Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Authorization/SignIn.cshtml"));
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_LoginFail_ReturnSignInViewWithError()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "1");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                var loginMetaModel = new LoginMetalModel
                {
                    UserName = "xxx",
                    PassWord = "xxx"
                };

                var oauthInfo = Substitute.For<IOAuthInfo>();
                oauthInfo.IsError.Returns(true);

                _authService.RequestOAuthInfoAsync(loginMetaModel)
                  .Returns(oauthInfo);
                // Action
                var result = await controller.SignIn(loginMetaModel) as ViewResult;

                // Assert
                Assert.That(result.ViewName, Is.EqualTo("~/Views/Desktop/Authorization/SignIn.cshtml"));
            }
        }

        [Test]
        public async Task SignIn_WhenPost_LoginWithSecretCaptcha_Successfully()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "0");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");
                StubGetValueAppSettings("SecretCaptcha", "SecretCaptcha");
                controller.HttpContext.Request.ServerVariables.Add("HTTP_X_FORWARDED_FOR", "127.0.0.1");
                StubGetValueAppSettings("CompanyIP", "127.0.0.1");

                var loginMetaModel = new LoginMetalModel
                {
                    UserName = "xxx",
                    PassWord = "xxx",
                    Captcha = "SecretCaptcha"
                };

                var oauthInfo = Substitute.For<IOAuthInfo>();
                oauthInfo.IsError.Returns(false);
                oauthInfo.IsAdministrator.Returns(true);

                _authService.RequestOAuthInfoAsync(loginMetaModel)
                  .Returns(oauthInfo);

                // Action
                var result = await controller.SignIn(loginMetaModel) as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("Index"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("LicenseeList"));
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_AdminUser_RedirectToLicenseeList()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "1");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                var loginMetaModel = new LoginMetalModel
                {
                    UserName = "xxx",
                    PassWord = "xxx"
                };

                var oauthInfo = Substitute.For<IOAuthInfo>();
                oauthInfo.IsError.Returns(false);
                oauthInfo.IsAdministrator.Returns(true);

                _authService.RequestOAuthInfoAsync(loginMetaModel)
                  .Returns(oauthInfo);

                // Action
                var result = await controller.SignIn(loginMetaModel) as RedirectToRouteResult;

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(result.RouteValues["action"], Is.EqualTo("Index"));
                    Assert.That(result.RouteValues["controller"], Is.EqualTo("LicenseeList"));
                });
            }
        }

        [Test]
        public async Task SignIn_WhenPost_ValidUser_CreateNewSession()
        {
            using (var controller = CreateController())
            {
                // Arrange
                StubGetValueAppSettings("AllowAutomationCaptchaCode", "1");
                SessionService.CaptchaCode.Returns("OriginalCaptcha");

                var oauthInfo = Substitute.For<IOAuthInfo>();
                oauthInfo.IsError.Returns(false);
                oauthInfo.IsAdministrator.Returns(true);

                var loginMetaModel = new LoginMetalModel
                {
                    UserName = "xxx",
                    PassWord = "xxx"
                };

                _authService.RequestOAuthInfoAsync(loginMetaModel)
                    .Returns(oauthInfo);

                // Action
                _ = await controller.SignIn(loginMetaModel) as RedirectToRouteResult;

                // Assert
                _authService.Received(1).SignIn(oauthInfo);
            }
        }
    }
}