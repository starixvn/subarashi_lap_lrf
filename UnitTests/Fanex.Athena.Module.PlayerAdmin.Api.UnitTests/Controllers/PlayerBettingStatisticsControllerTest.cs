using System;
using Fanex.Athena.Module.PlayerAdmin.Api.Controllers;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Controllers
{
    [TestFixture]
    public class PlayerBettingStatisticsControllerTest
    {
        private IPlayerBettingStatisticsService _playerBettingStatisticsService;

        [SetUp]
        public void Setup()
        {
            _playerBettingStatisticsService = Substitute.For<IPlayerBettingStatisticsService>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerBettingStatisticsService = null;
        }

        [Test]
        public void GetData_WhenCall_PassCorrectParam()
        {
            // Arrange
            PlayerBettingStatisticsMetaModel passedMetaModel = null;
            _playerBettingStatisticsService.GetPlayerBettingStatistics(Arg.Any<PlayerBettingStatisticsMetaModel>())
                .Returns(callInfo =>
                {
                    passedMetaModel = callInfo.ArgAt<PlayerBettingStatisticsMetaModel>(0);
                    return new PlayerBettingStatistics();
                });
            var now = DateTime.Now;

            // Action
            using (var controller = new PlayerBettingStatisticsController(_playerBettingStatisticsService))
            {
                controller.GetData(new PlayerBettingStatisticsMetaModel());
            }

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(passedMetaModel.FromDate.Day, Is.EqualTo(1));
                Assert.That(passedMetaModel.ToDate.Day, Is.EqualTo(now.Day));
                Assert.That(passedMetaModel.FromDate.Month, Is.EqualTo(now.Month));
                Assert.That(passedMetaModel.ToDate.Month, Is.EqualTo(now.Month));
                Assert.That(passedMetaModel.FromDate.Year, Is.EqualTo(now.Year));
                Assert.That(passedMetaModel.ToDate.Year, Is.EqualTo(now.Year));
            });
        }
    }
}