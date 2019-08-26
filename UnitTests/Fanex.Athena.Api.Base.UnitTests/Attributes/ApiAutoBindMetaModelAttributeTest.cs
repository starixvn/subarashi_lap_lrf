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
        public void OnActionExecuting_IsBindAgent_AgentListXmlIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelCurrencyIdList, IMetaModelAgent>();
            metaModel.CurrencyIdList.Returns("1,2");
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindAgent = true };

            // Action
            attribute.OnActionExecuting(actionContext);
            var agentXml = (metaModel as IMetaModelAgent)?.AgentListXml;

            // Assert
            Assert.That(agentXml, Is.Not.Null);
        }

        [Test]
        public void OnActionExecuting_BindAgentButMetaModelIsNotImplemented_AgentListXmlIsNull()
        {
            // Arrange
            string agentListXml = null;
            var metaModel = new { AgentListXml = agentListXml };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindAgent = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.AgentListXml, Is.Null);
        }

        [Test]
        public void OnActionExecuting_IsBindUserId_UserIdIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelUserId>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindUserId = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.UserId, Is.GreaterThan(0));
        }

        [Test]
        public void OnActionExecuting_BindUserIdButMetaModelIsNotImplemented_UserIdIsZero()
        {
            // Arrange
            int userId = 0;
            var metaModel = new { UserId = userId };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindUserId = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.UserId, Is.Zero);
        }

        [Test]
        public void OnActionExecuting_IsBindBalanceUpAndMoveBet_BindBalanceUpAndMoveBetAreAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelBalanceUpAndMoveBet>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindBalanceUpAndMoveBet = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.MoveBetsDay, Is.EqualTo(balanceUp.MoveBetsDay));
            Assert.That(metaModel.BalanceUpDay, Is.EqualTo(balanceUp.BalanceUpDay));
        }

        [Test]
        public void OnActionExecuting_BindBalanceUpAndMoveBetButMetaModelIsNotImplemented_BalanceUpAndMoveBetHaveMinValue()
        {
            // Arrange
            DateTime DefaultDateTime = default;
            var metaModel = new { MoveBetsDay = DefaultDateTime, BalanceUpDay = DefaultDateTime };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute { BindBalanceUpAndMoveBet = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.MoveBetsDay, Is.EqualTo(DateTime.MinValue));
            Assert.That(metaModel.BalanceUpDay, Is.EqualTo(DateTime.MinValue));
        }

        [Test]
        public void OnActionExecuting_DoNotBindAnyProperty_PropertiesIsNotAssigned()
        {
            // Arrange
            string nullValueOfString = null;
            DateTime defaultDateTime = default;
            var metaModel = new
            {
                UserId = 0,
                AgentListXml = nullValueOfString,
                MoveBetsDay = defaultDateTime,
                BalanceUpDay = defaultDateTime
            };
            var actionContext = CreateActionContext(metaModel);
            actionContext.ActionArguments.Clear();
            actionContext.ActionArguments.Add("metaModel", metaModel);
            var attribute = new ApiAutoBindMetaModelAttribute();

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
    }
}