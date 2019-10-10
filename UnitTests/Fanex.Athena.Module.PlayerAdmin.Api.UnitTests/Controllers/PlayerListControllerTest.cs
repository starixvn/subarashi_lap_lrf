using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerListControllerTest
    {
        private IPlayerListService _playerListService;

        [SetUp]
        public void Setup()
        {
            _playerListService = Substitute.For<IPlayerListService>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerListService = null;
        }

        [Test]
        public void Search_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var searchParam = new PlayerSearchingMetaModel
            {
                UserName = "Test",
                CurrencyIdList = "1"
            };
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

            return new PlayerListController(_playerListService)
            {
                ActionContext = actionContext
            };
        }
    }
}