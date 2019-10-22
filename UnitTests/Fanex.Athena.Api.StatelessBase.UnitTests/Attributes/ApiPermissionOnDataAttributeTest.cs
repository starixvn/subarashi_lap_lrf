using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using Autofac;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Api.StatelessBase.UnitTests.Attributes
{
    [TestFixture]
    public class ApiPermissionOnDataAttributeTest
    {
        private IAuthorizationService _authorizationService;

        [SetUp]
        public void Setup()
        {
            _authorizationService = Substitute.For<IAuthorizationService>();
        }

        [TearDown]
        public void TearDown()
        {
            _authorizationService = null;
        }

        [TestCase(true, false, HttpStatusCode.Forbidden)]
        [TestCase(false, false, HttpStatusCode.Forbidden)]
        [TestCase(false, true, HttpStatusCode.OK)]
        public void OnActionExecuting_WhenCall_ResponseCorrectStatusCode(bool isObject, bool isAuthorized, HttpStatusCode expectedStatusCode)
        {
            // Arrange
            const int CustId = 1;
            var attribute = new ApiPermissionOnDataAttribute(isObject: isObject);
            var actionContext = CreateActionContext();
            var metaModel = Substitute.For<IMetalModelCustomerIdentity>();
            metaModel.CustId.Returns(CustId);
            actionContext.ActionArguments.Add("metaModel", metaModel);
            actionContext.ActionArguments.Add("custId", CustId);
            var authCurrencyList = actionContext.ActionArguments["currencyAgentList"] as IEnumerable<OneAuthCurrency>;

            _authorizationService.HasPermissionOnData(authCurrencyList, CustId, 0).Returns(isAuthorized);

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(actionContext.Response.StatusCode, Is.EqualTo(expectedStatusCode));
        }

        private HttpActionContext CreateActionContext()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            actionContext.ControllerContext = ApiControllerTestHelper.CreateControllerContext();
            actionContext.Response = new HttpResponseMessage(HttpStatusCode.OK);
            var builder = new ContainerBuilder();
            builder.RegisterInstance(_authorizationService);
            WebApiHelper.SetupResolver(builder, actionContext);

            return actionContext;
        }
    }
}