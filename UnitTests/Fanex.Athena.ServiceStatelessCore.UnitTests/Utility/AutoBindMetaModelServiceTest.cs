using System;
using System.Collections.Generic;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Core.DTO.Configuration;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Utility;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.Utility
{
    [TestFixture]
    public class AutoBindMetaModelServiceTest
    {
        [Test]
        public void MapAgentXml_WhenCall_AgentListXmlIsAssignedCorrectly()
        {
            // Arrange
            var metaModel = Substitute.For<IMetaModelCurrencyIdList, IMetaModelAgent>();
            metaModel.CurrencyIdList.Returns("1,2");

            var actionArgument = CreateActionArgument(metaModel);

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
        public void MapUserId_WhenCall_UserIdIsAssignedCorrectly()
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

        private IDictionary<string, object> CreateActionArgument(object metaModel)
        {
            return new Dictionary<string, object> { { "metaModel", metaModel } };
        }
    }
}