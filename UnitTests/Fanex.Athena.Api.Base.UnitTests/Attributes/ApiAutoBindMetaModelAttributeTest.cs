using System;
using System.Collections.Generic;
using System.Web.Http.Controllers;
using Autofac;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Api.Base.UnitTests.Attributes
{
    [TestFixture]
    public class ApiAutoBindMetaModelAttributeTest
    {
        private ISessionStorage _sessionStorage;
        private IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly UserAuthInfo userSession = new UserAuthInfo
        {
            UserId = ExternalApiHelper.DefaultUserId,
            CurrencyAgentList = new Dictionary<int, int[]>()
        };

        private readonly BalanceUp balanceUp = new BalanceUp
        {
            BalanceUpDay = new DateTime(2019, 8, 15),
            MoveBetsDay = new DateTime(2019, 8, 10)
        };

        [SetUp]
        public void Setup()
        {
            _sessionStorage = Substitute.For<ISessionStorage>();
            _sessionStorage.UserAuthInfo.Returns(userSession);

            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            _balanceUpDataAccess.GetBalanceUp().Returns(balanceUp);
        }

        [TearDown]
        public void TearDown()
        {
            _sessionStorage = null;
            _balanceUpDataAccess = null;
        }

        [Test]
        public void OnActionExecuting_BindAllProperties_PropertiesIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = new ApiAutoBindMetaModelTest { CurrencyIdList = "1,2" };
            var actionContext = CreateActionContext(metaModel);
            var attribute = CreateAttributeWithBindingAllProperties();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.GreaterThan(0));
                Assert.That(metaModel.AgentListXml, Is.Not.Null);
                Assert.That(metaModel.MoveBetsDay, Is.EqualTo(balanceUp.MoveBetsDay));
                Assert.That(metaModel.BalanceUpDay, Is.EqualTo(balanceUp.BalanceUpDay));
            });
        }

        [Test]
        public void OnActionExecuting_DoNotImplementIMetaModel_PropertiesIsNotAssigned()
        {
            // Arrange
            var metaModel = new ApiNonBindingMetaModelTest();
            var actionContext = CreateActionContext(metaModel);
            var attribute = CreateAttributeWithBindingAllProperties();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.Zero);
                Assert.That(metaModel.AgentListXml, Is.Null);
                Assert.That(metaModel.MoveBetsDay, Is.EqualTo(DateTime.MinValue));
                Assert.That(metaModel.BalanceUpDay, Is.EqualTo(DateTime.MinValue));
            });
        }

        [Test]
        public void OnActionExecuting_DoNotBindAnyProperty_PropertiesIsNotAssigned()
        {
            // Arrange
            var metaModel = new ApiAutoBindMetaModelTest();
            var actionContext = CreateActionContext(metaModel);
            actionContext.ActionArguments.Clear();
            var attribute = new ApiAutoBindMetaModelAttribute();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.Zero);
                Assert.That(metaModel.AgentListXml, Is.Null);
            });
        }

        private HttpActionContext CreateActionContext(object metaModel)
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            actionContext.ActionArguments.Add("metaModel", metaModel);
            actionContext.ControllerContext = ApiControllerTestHelper.CreateControllerContext();

            var builder = new ContainerBuilder();
            builder.RegisterInstance(_sessionStorage);
            builder.RegisterInstance(_balanceUpDataAccess);
            WebApiHelper.SetupResolver(builder, actionContext);

            return actionContext;
        }

        private static ApiAutoBindMetaModelAttribute CreateAttributeWithBindingAllProperties()
        {
            return new ApiAutoBindMetaModelAttribute
            {
                BindAgent = true,
                BindUserId = true,
                BindBalanceUpAndMoveBet = true
            };
        }
    }

    internal class ApiAutoBindMetaModelTest : IMetaModelBalanceUpAndMoveBet, IMetaModelUserId, IMetaModelAgent
    {
        public int UserId { get; set; }

        public string AgentListXml { get; set; }

        public string CurrencyIdList { get; set; }

        public DateTime MoveBetsDay { get; set; }

        public DateTime BalanceUpDay { get; set; }
    }

    internal class ApiNonBindingMetaModelTest
    {
        public int UserId { get; set; }

        public string AgentListXml { get; set; }

        public DateTime MoveBetsDay { get; set; }

        public DateTime BalanceUpDay { get; set; }
    }
}