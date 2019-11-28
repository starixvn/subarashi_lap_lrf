namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class SportsBookBetLimitServiceTest
    {
        private ISportsBookBetLimitRepository _betSetting;

        private IDcsBetLinitRepository _dcsBetSetting;

        private IBusinessLogService _businessLogService;

        private SportsBookBetLimitService _service;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            _betSetting = Substitute.For<ISportsBookBetLimitRepository>();
            _dcsBetSetting = Substitute.For<IDcsBetLinitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new SportsBookBetLimitService(_betSetting, _dcsBetSetting, _businessLogService);
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
        public void GetSettingAsync_WhenCallAndRetriveEmptyESportSetting_ThrowsInvalidOperationException()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedESportSetting = Enumerable.Empty<PlayerBetLimit>();
            _dcsBetSetting.GetSettingAsync(custId, ProductTypes.Sportsbooks2).Returns(Task.FromResult(expectedESportSetting));

            // Action
            AsyncTestDelegate delegateCall = async () => await _service.GetSettingAsync(custId, isShowMixedSport);

            // Assert
            Assert.ThrowsAsync<InvalidOperationException>(delegateCall);
        }

        [TestCase(4, 2)]
        [TestCase(3, 2)]
        [TestCase(2, 2)]
        [TestCase(1, 1)]
        [TestCase(0, 0)]
        public async Task GetSettingAsync_WhenCall_EsportIsInCorrectIndex(int totalSBSetting, int expectedEsportIndex)
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var isShowMixedSport = FakeHelper.Create<bool>();

            var esportSetting = FakeHelper.CreateMany<PlayerBetLimit>();
            var sbSetting = FakeHelper.CreateMany<PlayerBetLimit>(totalSBSetting);

            _dcsBetSetting.GetSettingAsync(custId, ProductTypes.Sportsbooks2).Returns(Task.FromResult(esportSetting));
            _betSetting.GetSettingAsync(custId, isShowMixedSport).Returns(Task.FromResult(sbSetting));

            // Action
            var result = await _service.GetSettingAsync(custId, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(sbSetting.Count() + 1));
                Assert.That(result.ElementAt(expectedEsportIndex), Is.EqualTo(esportSetting.First()));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_NotHasEsportsType_ReturnsErrorResult()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>(x => x.Id, ((int)SportType.OtherSports).ToString());
            var metaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                Setting = new List<PlayerBetLimitMetaModel> { item }
            };
            var isShowMixedSport = FakeHelper.Create<bool>();

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.That(result.Code, Is.EqualTo(1));
        }

        [Test]
        public async Task UpdateSettingAsync_UpdateSBFailed_WriteSBLog()
        {
            // Arrange
            var actionLogs = new[] { LogActionDetailId.UpdatingMinBet, LogActionDetailId.UpdatingMaxBet, LogActionDetailId.UpdatingMaxPerMatch };

            var sbItem = new PlayerBetLimitMetaModel
            {
                Id = ((int)SportType.Soccer).ToString(),
                MinBet = 1,
                OldMinBet = 2,
                MaxBet = 1,
                OldMaxBet = 2,
                MaxPerMatch = 1,
                OldMaxPerMatch = 2,
                MaxPerBall = 1,
                OldMaxPerBall = 2,
                IsUpdated = true
            };
            var esportsItem = new PlayerBetLimitMetaModel
            {
                Id = ((int)SportType.Esports).ToString(),
                MinBet = 1,
                OldMinBet = 2,
                IsUpdated = true
            };
            var metaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                Setting = new List<PlayerBetLimitMetaModel> { esportsItem, sbItem }
            };

            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = FakeHelper.Create<ResultInfo>(x => x.Code, 1);
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                _businessLogService.Received(1).Write(
                    BusinessLogType.CustomerBetSetting,
                    Arg.Is<PlayerBetLimitLogMetaModel>(x => x.Detail.Count() == actionLogs.Length
                        && !x.Detail.Any(d => !actionLogs.Contains(d.DetailedId))
                        && !x.Detail.Any(d => d.SportType == ((int)SportType.Esports).ToString())));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_OnlyHaveEsports_WriteEsportsLog()
        {
            // Arrange
            var esportsItem = new PlayerBetLimitMetaModel
            {
                Id = ((int)SportType.Esports).ToString(),
                MinBet = 1,
                OldMinBet = 2,
                IsUpdated = true
            };

            var metaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                Setting = new List<PlayerBetLimitMetaModel> { esportsItem }
            };

            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = FakeHelper.Create<ResultInfo>(x => x.Code, 0);
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                _businessLogService.Received(1).Write(
                    BusinessLogType.CustomerBetSetting,
                    Arg.Is<PlayerBetLimitLogMetaModel>(x => !x.Detail.Any(d => d.SportType != ((int)SportType.Esports).ToString())));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_AllSettingsUpdatedSuccessfully_WriteCorrectLog()
        {
            // Arrange
            var sbItem = new PlayerBetLimitMetaModel
            {
                Id = ((int)SportType.Soccer).ToString(),
                MinBet = 1,
                OldMinBet = 2,
                IsUpdated = true
            };
            var esportsItem = new PlayerBetLimitMetaModel
            {
                Id = ((int)SportType.Esports).ToString(),
                MinBet = 1,
                OldMinBet = 2,
                IsUpdated = true
            };
            var metaModel = new PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>
            {
                Setting = new List<PlayerBetLimitMetaModel> { esportsItem, sbItem }
            };

            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = FakeHelper.Create<ResultInfo>(x => x.Code, 0);
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                _businessLogService.Received(1).Write(
                    BusinessLogType.CustomerBetSetting,
                    Arg.Is<PlayerBetLimitLogMetaModel>(x => !x.Detail.Any(d => d.SportType != sbItem.Id && d.SportType != esportsItem.Id)));
            });
        }
    }
}