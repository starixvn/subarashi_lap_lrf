using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Utility;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.Utility
{
    [TestFixture]
    public class AutoBindMetaModelServiceTest
    {
        [Test]
        public void MapAgentXml_CallWithActionArgumentParam_AgentListXmlIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelCurrencyIdList, IMetaModelAgent>();
            metaModel.CurrencyIdList.Returns("1,2");

            var actionArgument = CreateActionArgument(metaModel);
            var currencyAgentList = new List<OneAuthCurrency> { new OneAuthCurrency { AgentId = new int[] { 11, 22 }, CurrencyId = 1 } };
            actionArgument.Add("currencyAgentList", currencyAgentList);

            // Action
            AutoBindMetaModelService.MapAgentXml(actionArgument);
            var agentXml = (metaModel as IMetaModelAgent)?.AgentListXml;

            // Assert
            Assert.That(agentXml, Is.Not.Null);
        }

        [Test]
        public void MapAgentXml_MetaModelInterfaceIsNotImplemented_AgentListXmlIsNull()
        {
            // Arrange
            string agentListXml = null;
            var metaModel = new { AgentListXml = agentListXml };
            var actionArgument = CreateActionArgument(metaModel);

            // Action
            AutoBindMetaModelService.MapAgentXml(actionArgument);

            // Assert
            Assert.That(metaModel.AgentListXml, Is.Null);
        }

        [Test]
        public void MapAgentXml_CallWithCurrencyAgentList_AgentListXmlAssignedCorrectly()
        {
            // Arrange
            const int CurrencyId = 12;
            var metaModel = Substitute.For<IMetaModelCurrency, IMetaModelAgent>();
            metaModel.CurrencyId.Returns(CurrencyId);
            var actionArgument = CreateActionArgument(metaModel);

            var currencyAgentList = new Dictionary<int, int[]> { { CurrencyId, new[] { 1, 2 } } };

            // Action
            AutoBindMetaModelService.MapAgentXml(actionArgument, currencyAgentList);
            var agentXml = (metaModel as IMetaModelAgent)?.AgentListXml;

            // Assert
            Assert.That(agentXml.Contains($"Currency=\"{CurrencyId}\""), Is.True);
        }

        [Test]
        public void MapAgentXml_CallWithCurrencyAgentListButMetaModelInterfaceIsNotImplemented_AgentListXmlIsNull()
        {
            // Arrange
            const int CurrencyId = 12;
            string agentListXml = null;
            var metaModel = new { AgentListXml = agentListXml, CurrencyId };
            var actionArgument = CreateActionArgument(metaModel);

            var currencyAgentList = new Dictionary<int, int[]> { { CurrencyId, new[] { 1, 2 } } };

            // Action
            AutoBindMetaModelService.MapAgentXml(actionArgument, currencyAgentList);

            // Assert
            Assert.That(metaModel.AgentListXml, Is.Null);
        }

        [Test]
        public void MapCurrencyList_WithCurrencyIdListString_CurrencyListAssignCorrectly()
        {
            // Arrange
            const string CurrencyIdList = "1,2";
            var metaModel = Substitute.For<IMetaModelCurrencyIdList, IMetaModelCurrencyList>();
            metaModel.CurrencyIdList.Returns(CurrencyIdList);
            var actionArgument = CreateActionArgument(metaModel);

            var dictionaryCurrency = new Dictionary<int, string> { { 1, "USD" }, { 2, "UUS" } };

            // Action
            AutoBindMetaModelService.MapCurrencyList(actionArgument, dictionaryCurrency);
            var currencyList = (metaModel as IMetaModelCurrencyList).CurrencyList;

            // Assert
            Assert.That(currencyList.ElementAt(0).ID, Is.EqualTo(1));
            Assert.That(currencyList.ElementAt(1).ID, Is.EqualTo(2));
        }

        [Test]
        public void MapUserId_CallWithActionArgumentAndUserId_UserIdIsAssignedCorrectly()
        {
            // Arrange
            const int UserId = 111;
            var metaModel = Substitute.For<IMetaModelUserId>();
            var actionArgument = CreateActionArgument(metaModel);

            // Action
            AutoBindMetaModelService.MapUserId(actionArgument, UserId);

            // Assert
            Assert.That(metaModel.UserId, Is.EqualTo(UserId));
        }

        [Test]
        public void MapUserId_MetaModelInterfaceIsNotImplemented_UserIdIsZero()
        {
            // Arrange
            const int UserId = 111;
            int userId = 0;
            var metaModel = new { UserId = userId };
            var actionArgument = CreateActionArgument(metaModel);

            // Action
            AutoBindMetaModelService.MapUserId(actionArgument, UserId);

            // Assert
            Assert.That(metaModel.UserId, Is.Zero);
        }

        [Test]
        public void MapUserId_CallWithActionArgument_UserIdIsAssignedCorrectly()
        {
            // Arrange
            const int UserId = 111;
            var metaModel = Substitute.For<IMetaModelUserId>();
            var actionArgument = CreateActionArgument(metaModel);
            actionArgument.Add("userid", UserId);

            // Action
            AutoBindMetaModelService.MapUserId(actionArgument);

            // Assert
            Assert.That(metaModel.UserId, Is.EqualTo(UserId));
        }

        [Test]
        public void MapBalanceUpAndMoveBet_WhenCall_BindBalanceUpAndMoveBetAreAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelBalanceUpAndMoveBet>();
            var actionArgument = CreateActionArgument(metaModel);

            var balanceUp = new BalanceUp
            {
                BalanceUpDay = new DateTime(2019, 8, 15),
                MoveBetsDay = new DateTime(2019, 8, 10)
            };

            var balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            balanceUpDataAccess.GetBalanceUp().Returns(balanceUp);

            // Action
            AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArgument, balanceUpDataAccess);

            // Assert
            Assert.That(metaModel.MoveBetsDay, Is.EqualTo(balanceUp.MoveBetsDay));
            Assert.That(metaModel.BalanceUpDay, Is.EqualTo(balanceUp.BalanceUpDay));
        }

        [Test]
        public void MapBalanceUpAndMoveBet_MetaModelInterfaceIsNotImplemented_BalanceUpAndMoveBetHaveMinValue()
        {
            // Arrange
            DateTime DefaultDateTime = default;
            var metaModel = new { MoveBetsDay = DefaultDateTime, BalanceUpDay = DefaultDateTime };
            var actionArgument = CreateActionArgument(metaModel);

            // Action
            AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArgument, Substitute.For<IBalanceUpDataAccess>());

            // Assert
            Assert.That(metaModel.MoveBetsDay, Is.EqualTo(DateTime.MinValue));
            Assert.That(metaModel.BalanceUpDay, Is.EqualTo(DateTime.MinValue));
        }

        [Test]
        public void MapSiteName_WhenCall_MetaModelAssignedCorrectly()
        {
            // Arrange
            const string SiteName = "Demo";
            var metaModel = Substitute.For<IMetaModelSiteName>();
            var actionArgument = CreateActionArgument(metaModel);
            actionArgument.Add("sitename", SiteName);

            // Action
            AutoBindMetaModelService.MapSiteName(actionArgument);

            // Assert
            Assert.That(metaModel.SiteName, Is.EqualTo(SiteName));
        }

        [Test]
        public void MapLanguage_WhenCall_MetaModelAssignedCorrectly()
        {
            // Arrange
            const string Language = "en";
            const string ExpectedLanguage = "en-US";
            var metaModel = Substitute.For<IMetaModelLanguage>();
            var actionArgument = CreateActionArgument(metaModel);
            actionArgument.Add("language", Language);

            // Action
            AutoBindMetaModelService.MapLanguage(actionArgument);

            // Assert
            Assert.That(metaModel.Language, Is.EqualTo(ExpectedLanguage));
        }

        [Test]
        public void MapIp_WhenCall_MetaModelAssignedCorrectly()
        {
            // Arrange
            const string IpValue = ExternalApiHelper.DefaultClientIp;
            var metaModel = Substitute.For<IMetaModelIp>();
            var actionArgument = CreateActionArgument(metaModel);
            var httpContext = ExternalApiHelper.CreateHttpContext();
            var request = new HttpRequestMessage(HttpMethod.Get, new Uri("http://localhost/api/test"));
            request.Properties["MS_HttpContext"] = httpContext;

            // Action
            AutoBindMetaModelService.MapIp(actionArgument, ClientHelper.GetClientIp(request));

            // Assert
            Assert.That(metaModel.Ip, Is.EqualTo(IpValue));
        }

        private IDictionary<string, object> CreateActionArgument(object metaModel)
        {
            return new Dictionary<string, object> { { "metaModel", metaModel } };
        }
    }
}