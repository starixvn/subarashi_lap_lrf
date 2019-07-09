using Fanex.Athena.Module.PlayerAdmin.Api;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Api
{
    [TestFixture]
    public class PlayerListControllerTest
    {
        private IPlayerListQueryService _playerListService;

        [OneTimeSetUp]
        public void Setup()
        {
            _playerListService = Substitute.For<IPlayerListQueryService>();
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
            var searchParam = new SearchPlayerByUserNameMetaModel
            {
                UserName = "Test",
                AgentListXml = "4"
            };

            var expectedReturnedData = new EntityResult<Player>();
            _playerListService.SearchPlayerByUserName(searchParam).Returns(expectedReturnedData);

            using (var controller = CreateController())
            {
                // Action
                controller.Search(searchParam);

                // Assert
                Assert.That(searchParam.LicenseeId, Is.EqualTo(1));
            }
        }

        private PlayerListQueryController CreateController()
        {
            var actionContext = ExternalApiHelper.CreateMockActionContext();

            return new PlayerListQueryController(_playerListService)
            {
                ActionContext = actionContext
            };
        }
    }
}