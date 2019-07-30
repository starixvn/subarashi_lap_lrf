using Fanex.Athena.Model.Auth;
using Fanex.Athena.Module.PlayerAdmin.Api;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;

using NSubstitute;

using NUnit.Framework;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Api
{
    [TestFixture]
    public class PlayerListControllerTest
    {
        private IPlayerListService _playerListService;

        private IAgentListBuilder _agentListBuilder;

        [SetUp]
        public void Setup()
        {
            _playerListService = Substitute.For<IPlayerListService>();
            _agentListBuilder = Substitute.For<IAgentListBuilder>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerListService = null;
            _agentListBuilder = null;
        }

        [Test]
        public void Search_WhenCall_AssignParamValueCorrectly()
        {
            // Arrange
            var searchParam = new PlayerSearchingMetaModel
            {
                UserName = "Test",
                Currency = "1"
            };

            var expectedReturnedData = new PlayerListResultViewModel();
            _playerListService.Search(searchParam).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                var expectedAgentistXml = ExternalApiHelper.CreateDefaultAgentListXml();
                _agentListBuilder.ToXml(controller.CurrencyAgentList, searchParam.Currency).Returns(expectedAgentistXml);

                // Action
                controller.Search(searchParam);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(searchParam.LicenseeId, Is.EqualTo(ExternalApiHelper.DefaultLicenseeId));
                    Assert.That(searchParam.AgentListXml, Is.EqualTo(expectedAgentistXml));
                });
            }
        }

        [Test]
        public void Search_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var searchParam = new PlayerSearchingMetaModel
            {
                UserName = "Test",
                Currency = "1"
            };
            _agentListBuilder.ToXml(Arg.Any<IEnumerable<OneAuthCurrency>>(), searchParam.Currency).Returns(string.Empty);
            var expectedReturnedData = new PlayerListResultViewModel
            {
                DataList = new List<Player> { new Player() },
                TotalItem = 1
            };
            _playerListService.Search(searchParam).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.Search(searchParam);

                // Assert
                Assert.That(result, Is.EqualTo(expectedReturnedData));
            }
        }

        [Test]
        public void GetPlayerListById_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var param = new PlayerListByIdMetaModel
            {
                IdList = "123,987"
            };
            _agentListBuilder.ToXml(Arg.Any<IEnumerable<OneAuthCurrency>>(), param.Currency).Returns(string.Empty);
            var expectedReturnedData = new PlayerListResultViewModel
            {
                DataList = new List<Player> { new Player() },
                TotalItem = 1
            };
            _playerListService.GetPlayerListById(param).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                var result = controller.GetPlayerListById(param);

                // Assert
                Assert.That(result, Is.EqualTo(expectedReturnedData));
            }
        }

        private PlayerListController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();

            return new PlayerListController(_playerListService, _agentListBuilder)
            {
                ActionContext = actionContext
            };
        }
    }
}