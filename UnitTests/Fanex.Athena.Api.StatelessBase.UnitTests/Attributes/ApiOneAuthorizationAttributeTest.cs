namespace Fanex.Athena.Api.StatelessBase.UnitTests.Attributes.UnitTests
{
    using Autofac;
    using DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Logging;

    using NSubstitute;
    using NUnit.Framework;
    using ONEbook.UM.Services;

    using System;
    using System.Net;
    using System.Threading;
    using System.Web.Http.Controllers;

    public class ApiOneAuthorizationAttributeTest
    {
        private const string TokenKey = "X-Auth-Token";

        private const string TokenValue = "abcdef";

        private ILogger _logger;

        private IOneBookSecurityWrapper _oneAuthenticationService;

        private ILicenseeDataAccess _licenseeDataAccess;

        private IMaintenanceService _maintenanceService;

        [SetUp]
        public void SetUp()
        {
            _logger = Substitute.For<ILogger>();
            _oneAuthenticationService = Substitute.For<IOneBookSecurityWrapper>();
            _licenseeDataAccess = Substitute.For<ILicenseeDataAccess>();
            _maintenanceService = Substitute.For<IMaintenanceService>();
        }

        [Test]
        public void ExecuteAuthorizationFilterAsync_TokenValueIsNull_UnauthorizeAccess()
        {
            // Arrange
            var attribute = new ApiOneAuthorizationAttribute();
            var actionContext = CreateActionContext();

            // Action
            var result = attribute.ExecuteAuthorizationFilterAsync(actionContext, new CancellationToken(), null);

            // Assert
            Assert.That(result.Result.StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));
        }

        [Test]
        public void ExecuteAuthorizationFilterAsync_AuthTokenNull_UnauthorizeAccess()
        {
            // Arrange
            var attribute = new ApiOneAuthorizationAttribute();
            var actionContext = CreateActionContext(hasAuthToken: true);

            // Action
            var result = attribute.ExecuteAuthorizationFilterAsync(actionContext, new CancellationToken(), null);

            // Assert
            Assert.Multiple(() =>
            {
                _oneAuthenticationService.Received(1).Authenticate(TokenValue);
                Assert.That(result.Result.StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));
            });
        }

        [Test]
        public void ExecuteAuthorizationFilterAsync_LicenseeIsNull_UnauthorizeAccess()
        {
            // Arrange
            var attribute = new ApiOneAuthorizationAttribute();
            var actionContext = CreateActionContext(hasAuthToken: true);
            var token = new OneAuthToken
            {
                UserSEQ = 1,
                SiteName = "spondemo"
            };
            _oneAuthenticationService.Authenticate(TokenValue).Returns(token);

            // Action
            var result = attribute.ExecuteAuthorizationFilterAsync(actionContext, new CancellationToken(), null);

            // Assert
            Assert.Multiple(() =>
            {
                _licenseeDataAccess.Received(1).GetLicenseeByName(token.SiteName);
                Assert.That(result.Result.StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));
            });
        }

        [Test]
        public void ExecuteAuthorizationFilterAsync_LicenseeNotNull_UnauthorizeAccess()
        {
            // Arrange
            var attribute = new ApiOneAuthorizationAttribute();
            var actionContext = CreateActionContext(hasAuthToken: true);
            var token = new OneAuthToken
            {
                UserSEQ = 1,
                SiteName = "spondemo",
                Currency = new[] { new OneAuthCurrency { CurrencyId = 123 } },
                UserID = "badman"
            };
            _oneAuthenticationService.Authenticate(TokenValue).Returns(token);
            var licensee = new Licensee { Id = 999 };
            _licenseeDataAccess.GetLicenseeByName(token.SiteName).Returns(licensee);

            // Action
            attribute.ExecuteAuthorizationFilterAsync(actionContext, new CancellationToken(), null);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actionContext.ActionArguments["licenseeid"], Is.EqualTo(licensee.Id));
                Assert.That(actionContext.ActionArguments["userid"], Is.EqualTo(token.UserSEQ));
                Assert.That(actionContext.ActionArguments["currencyIDList"], Is.EqualTo(token.Currency[0].CurrencyId.ToString()));
                Assert.That(actionContext.ActionArguments["username"], Is.EqualTo(token.UserID));
                Assert.That(actionContext.ActionArguments["sitename"], Is.EqualTo(token.SiteName));
            });
        }

        [Test]
        public void ExecuteAuthorizationFilterAsync_ThrowException_LogError()
        {
            // Arrange
            var exception = new Exception("123");
            var attribute = new ApiOneAuthorizationAttribute();
            var actionContext = CreateActionContext(hasAuthToken: true);

            _oneAuthenticationService.When(x => x.Authenticate(TokenValue)).Throw(exception);

            // Action
            attribute.ExecuteAuthorizationFilterAsync(actionContext, new CancellationToken(), null);

            // Assert
            _logger.Received(1).Error(exception.Message, exception);
        }

        private HttpActionContext CreateActionContext(bool hasAuthToken = false)
        {
            var controllerContext = ApiControllerTestHelper.CreateControllerContext();
            if (hasAuthToken)
            {
                controllerContext.Request.Headers.Add(TokenKey, TokenValue);
            }

            var descriptor = Substitute.ForPartsOf<HttpActionDescriptor>();
            var actionContext = new HttpActionContext(controllerContext, descriptor);
            var builder = new ContainerBuilder();
            builder.RegisterInstance(_logger);
            builder.RegisterInstance(_oneAuthenticationService);
            builder.RegisterInstance(_licenseeDataAccess);
            builder.RegisterInstance(_maintenanceService);
            WebApiHelper.SetupResolver(builder, actionContext);
            return actionContext;
        }
    }
}