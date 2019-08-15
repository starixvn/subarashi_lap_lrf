using System.Collections;
using System.Web.Http.Controllers;
using Fanex.Athena.Api.StatelessBase.Attributes;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using NUnit.Framework;

namespace Fanex.Athena.Api.StatelessBase.UnitTests.Attributes
{
    [TestFixture]
    public class StatelessApiAutoBindMetaModelAttributeTest
    {
        [Test]
        public void OnActionExecuting_BindAllProperties_PropertiesIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = new AutoBindMetaModelTest { CurrencyIdList = "1,2" };
            var actionContext = CreateActionContext(metaModel);
            var attribute = CreateAttributeWithBindingAllProperties();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.GreaterThan(0));
                Assert.That(metaModel.Ip, Is.Not.Null);
                Assert.That(metaModel.Language, Is.Not.Null);
                Assert.That(metaModel.SiteName, Is.Not.Null);
                Assert.That(metaModel.AgentListXml, Is.Not.Null);
            });
        }

        [Test]
        public void OnActionExecuting_DoNotImplementIMetaModel_PropertiesIsNotAssigned()
        {
            // Arrange
            var metaModel = new NonBindingMetaModelTest();
            var actionContext = CreateActionContext(metaModel);
            var attribute = CreateAttributeWithBindingAllProperties();

            // Action
            attribute.OnActionExecuting(actionContext);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(metaModel.UserId, Is.Zero);
                Assert.That(metaModel.Ip, Is.Null);
                Assert.That(metaModel.Language, Is.Null);
                Assert.That(metaModel.SiteName, Is.Null);
                Assert.That(metaModel.AgentListXml, Is.Null);
            });
        }

        [Test]
        public void OnActionExecuting_ActionArgumentsHaveNoPropertyKey_PropertiesIsNotAssigned()
        {
            // Arrange
            var metaModel = new AutoBindMetaModelTest();
            var actionContext = CreateActionContext(metaModel);
            actionContext.ActionArguments.Clear();
            var attribute = CreateAttributeWithBindingAllProperties();

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
            var metaModel = new AutoBindMetaModelTest();
            var actionContext = CreateActionContext(metaModel);
            actionContext.ActionArguments.Clear();
            var attribute = new StatelessApiAutoBindMetaModelAttribute();

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

        private HttpActionContext CreateActionContext(object metaModel)
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();
            var httpContext = ExternalApiHelper.CreateHttpContext();

            var controllerContext = ApiControllerTestHelper.CreateControllerContext();
            controllerContext.Request.Properties["MS_HttpContext"] = httpContext;
            actionContext.ControllerContext = controllerContext;

            actionContext.ActionArguments.Add("metaModel", metaModel);

            return actionContext;
        }

        private StatelessApiAutoBindMetaModelAttribute CreateAttributeWithBindingAllProperties()
        {
            return new StatelessApiAutoBindMetaModelAttribute
            {
                BindAgent = true,
                BindIp = true,
                BindLanguage = true,
                BindSiteName = true,
                BindUserId = true
            };
        }
    }

    internal class AutoBindMetaModelTest : IMetaModelIp, IMetaModelUserId, IMetaModelLanguage, IMetaModelSiteName, IMetaModelAgent, IMetaModelCurrencyIdList
    {
        public int UserId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public string SiteName { get; set; }

        public string AgentListXml { get; set; }

        public string CurrencyIdList { get; set; }
    }

    internal class NonBindingMetaModelTest
    {
        public int UserId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public string SiteName { get; set; }

        public string AgentListXml { get; set; }
    }

    internal class MapAgentXmlTestingData
    {
        public static IEnumerable TestCases
        {
            get
            {
                yield return new TestCaseData(null, string.Empty).Returns(string.Empty);
            }
        }
    }
}