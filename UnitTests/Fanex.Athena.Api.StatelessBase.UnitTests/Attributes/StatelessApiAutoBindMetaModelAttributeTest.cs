using System;
using System.Web.Http.Controllers;
using Autofac;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Api.StatelessBase.UnitTests.Attributes
{
    [TestFixture]
    public class StatelessApiAutoBindMetaModelAttributeTest
    {
        private static readonly BalanceUp balanceUp = new BalanceUp
        {
            BalanceUpDay = new DateTime(2019, 8, 15),
            MoveBetsDay = new DateTime(2019, 8, 10)
        };

        [Test]
        public void OnActionExecuting_IsBindAgent_AgentListXmlIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelCurrencyIdList, IMetaModelAgent>();
            metaModel.CurrencyIdList.Returns("1,2");
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindAgent = true };

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
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindAgent = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.AgentListXml, Is.Null);
        }

        [Test]
        public void OnActionExecuting_IsBindSiteName_SiteNameIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelSiteName>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindSiteName = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.SiteName, Is.Not.Null);
        }

        [Test]
        public void OnActionExecuting_BindSiteNameButMetaModelIsNotImplemented_SiteNameIsNull()
        {
            // Arrange
            string siteName = null;
            var metaModel = new { SiteName = siteName };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindSiteName = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.SiteName, Is.Null);
        }

        [Test]
        public void OnActionExecuting_IsBindLanguage_LanguageIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelLanguage>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindLanguage = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.Language, Is.Not.Null);
        }

        [Test]
        public void OnActionExecuting_BindLanguageButMetaModelIsNotImplemented_LanguageIsNull()
        {
            // Arrange
            string language = null;
            var metaModel = new { Language = language };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindLanguage = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.Language, Is.Null);
        }

        [Test]
        public void OnActionExecuting_IsBindUserId_UserIdIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelUserId>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindUserId = true };

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
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindUserId = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.UserId, Is.Zero);
        }

        [Test]
        public void OnActionExecuting_IsBindIp_UserIdIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelIp>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindIp = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.Ip, Is.Not.Null);
        }

        [Test]
        public void OnActionExecuting_BindIdButMetaModelIsNotImplemented_IpIsNull()
        {
            // Arrange
            string ip = null;
            var metaModel = new { Ip = ip };
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindIp = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.Ip, Is.Null);
        }

        [Test]
        public void OnActionExecuting_ActionArgumentsHaveNoPropertyKey_PropertiesIsNotAssigned()
        {
            // Arrange
            string nullValueOfString = null;

            var metaModel = new
            {
                UserId = 0,
                Language = nullValueOfString,
                SiteName = nullValueOfString,
                AgentListXml = nullValueOfString
            };
            var actionContext = CreateActionContext(metaModel);
            actionContext.ActionArguments.Clear();
            actionContext.ActionArguments.Add("metaModel", metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute
            {
                BindAgent = true,
                BindIp = true,
                BindLanguage = true,
                BindSiteName = true,
                BindUserId = true
            };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.Zero);
                Assert.That(metaModel.Language, Is.Null);
                Assert.That(metaModel.SiteName, Is.Null);
                Assert.That(metaModel.AgentListXml, Is.Null);
            });
        }

        [Test]
        public void OnActionExecuting_DoNotBindAnyProperty_PropertiesIsNotAssigned()
        {
            // Arrange
            var metaModel = Substitute.For(new[]
            {
                typeof(IMetaModelIp),
                typeof(IMetaModelUserId),
                typeof(IMetaModelLanguage),
                typeof(IMetaModelSiteName),
                typeof(IMetaModelAgent)
            },
            new object[] { });
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That((metaModel as IMetaModelIp).Ip, Is.Empty);
                Assert.That((metaModel as IMetaModelUserId).UserId, Is.Zero);
                Assert.That((metaModel as IMetaModelLanguage).Language, Is.Empty);
                Assert.That((metaModel as IMetaModelSiteName).SiteName, Is.Empty);
                Assert.That((metaModel as IMetaModelAgent).AgentListXml, Is.Empty);
            });
        }

        [Test]
        public void OnActionExecuting_IsBindBalanceUpAndMoveBet_BindBalanceUpAndMoveBetAreAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelBalanceUpAndMoveBet>();
            var actionContext = CreateActionContext(metaModel);
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindBalanceUpAndMoveBetDay = true };

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
            var attribute = new StatelessApiAutoBindMetaModelAttribute { BindBalanceUpAndMoveBetDay = true };

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.That(metaModel.MoveBetsDay, Is.EqualTo(DateTime.MinValue));
            Assert.That(metaModel.BalanceUpDay, Is.EqualTo(DateTime.MinValue));
        }

        private static HttpActionContext CreateActionContext(object metaModel)
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            var httpContext = ExternalApiHelper.CreateHttpContext();

            var controllerContext = ApiControllerTestHelper.CreateControllerContext();
            controllerContext.Request.Properties["MS_HttpContext"] = httpContext;
            actionContext.ControllerContext = controllerContext;

            actionContext.ActionArguments.Add("metaModel", metaModel);

            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            balanceUpDataAccess.GetBalanceUp().Returns(balanceUp);

            var builder = new ContainerBuilder();
            builder.RegisterInstance(balanceUpDataAccess);
            WebApiHelper.SetupResolver(builder, actionContext);

            return actionContext;
        }
    }
}