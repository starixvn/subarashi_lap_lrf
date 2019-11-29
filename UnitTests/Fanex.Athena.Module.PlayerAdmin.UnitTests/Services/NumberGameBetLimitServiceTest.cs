namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class NumberGameBetLimitServiceTest
    {
        private INumberGameBetLimitRepository _repository;

        private IBusinessLogService _businessLogService;

        private NumberGameBetLimitService _service;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            _repository = Substitute.For<INumberGameBetLimitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new NumberGameBetLimitService(_repository, _businessLogService);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            _service = null;
        }

        [TearDown]
        public void TearDown()
        {
            _businessLogService.ClearReceivedCalls();
        }

        [Test]
        public async Task GetSettingAsync_WhenCall_ReturnsSettingFromRepository()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();

            // Action
            await _service.GetSettingAsync(custId);

            // Assert
            Assert.Multiple(() =>
            {
                _repository.Received(1).GetSettingAsync(custId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            var expectedResult = FakeHelper.Create<ResultInfo>();
            _repository.UpdateSettingAsync(metaModel).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _service.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
                _repository.Received(1).UpdateSettingAsync(metaModel);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_WriteLogWithCorrectData()
        {
            // Arrange
            var actionLogs = new[] 
            {
                LogActionDetailId.UpdatingMinBet,
                LogActionDetailId.UpdatingMaxBet,
                LogActionDetailId.UpdatingMaxPerMatch,
                LogActionDetailId.UpdatingMaxPerBall
            };

            var betSetting = new PlayerBetLimitMetaModel {
                MinBet = 1,
                OldMinBet = 2,
                MaxBet = 1,
                OldMaxBet = 2,
                MaxPerMatch = 1,
                OldMaxPerMatch = 2,
                MaxPerBall = 1,
                OldMaxPerBall = 2,
                IsUpdated = true };
            var metaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                Setting = new List<PlayerBetLimitMetaModel> { betSetting }
            };

            // Action
            await _service.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                _businessLogService.Received(1).Write(
                    BusinessLogType.CustomerBetSetting,
                    Arg.Is<PlayerBetLimitLogMetaModel>(x => x.Detail.Count() == actionLogs.Length
                        && !x.Detail.Any(d => !actionLogs.Contains(d.DetailedId))));
            });
        }
    }
}