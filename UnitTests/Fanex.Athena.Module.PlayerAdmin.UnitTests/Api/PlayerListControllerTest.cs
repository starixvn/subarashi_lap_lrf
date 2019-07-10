using Fanex.Athena.Module.PlayerAdmin.Api;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Api
{
    [TestFixture]
    public class PlayerListControllerTest
    {
        private IPlayerListService _playerListService;

        [OneTimeSetUp]
        public void Setup()
        {
            _playerListService = Substitute.For<IPlayerListService>();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _playerListService = null;
        }

        [Test]
        public void Search_WhenCall_AssignParamValueCorrectly()
        {
            // Arrange
            var searchParam = new PlayerSearchingMetaModel
            {
                UserName = "Test",
                AgentListXml = "4"
            };

            var expectedReturnedData = new PlayerListResultViewModel();
            _playerListService.Search(searchParam).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                controller.Search(searchParam);

                // Assert
                Assert.That(searchParam.LicenseeId, Is.EqualTo(1));
            }
        }

        private PlayerListController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();

            return new PlayerListController(_playerListService)
            {
                ActionContext = actionContext
            };
        }
    }
}