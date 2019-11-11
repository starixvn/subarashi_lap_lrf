namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
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
        private const int EsportIndex = 2;

        private ISportsBookBetLimitRepository _betSetting;

        private IDcsBetLinitRepository _dcsBetSetting;

        private IBusinessLogService _businessLogService;

        private SportsBookBetLimitService _service;

        [SetUp]
        public void SetUp()
        {
            _betSetting = Substitute.For<ISportsBookBetLimitRepository>();
            _dcsBetSetting = Substitute.For<IDcsBetLinitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new SportsBookBetLimitService(_betSetting, _dcsBetSetting, _businessLogService);
        }

        [TearDown]
        public void TearDown()
        {
            _service = null;
        }

        [Test]
        public void GetSettingAsync_WhenCallAndRetriveEmptyESportSetting_ThrowsInvalidOperationException()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedESportSetting = Substitute.For<IEnumerable<PlayerBetLimit>>();
            _dcsBetSetting.GetSettingAsync(custId, ProductTypes.Sportsbooks2).Returns(Task.FromResult(expectedESportSetting));

            // Action
            var exception = Assert.ThrowsAsync<InvalidOperationException>(() => _service.GetSettingAsync(custId, isShowMixedSport));

            // Assert
            Assert.Multiple(() =>
            {
                Assert.IsInstanceOf(typeof(InvalidOperationException), exception);
                Assert.That(exception.Message.Contains("There is no E-sport setting data."));
            });
        }

        [Test]
        public async Task GetSettingAsync_WhenCallAndRetrieveAnyESportSetting_ReturnsCorrectResult()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedESportSetting = FakeHelper.Create<IEnumerable<PlayerBetLimit>>();
            var expectedGetSBSettingTask = FakeHelper.Create<IEnumerable<PlayerBetLimit>>();
            _dcsBetSetting.GetSettingAsync(custId, ProductTypes.Sportsbooks2).Returns(Task.FromResult(expectedESportSetting));
            _betSetting.GetSettingAsync(custId, isShowMixedSport).Returns(Task.FromResult(expectedGetSBSettingTask));
            var expectedResult = expectedGetSBSettingTask.ToList();
            expectedResult.Insert(EsportIndex, expectedESportSetting.First());

            // Action
            var result = await _service.GetSettingAsync(custId, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_NotHasEsportsType_ReturnsExpectedResult()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            var esportsTypeId = ((int)SportType.Esports + 1).ToString();
            item.Id = esportsTypeId;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = setting;
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = new ResultInfo { Code = 1, Message = "Invalid parameters. Setting is null." };

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public async Task UpdateSettingAsync_HasEsportsTypeAndPositiveResultCode_ReturnsExpectedResultAndWritesLog()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            var esportsTypeId = ((int)SportType.Esports).ToString();
            item.Id = esportsTypeId;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = setting;
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = Substitute.For<IResultInfo>();
            expectedResult.Code = FakeHelper.Create<int>();
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult(expectedResult));

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
                _betSetting.Received(1).UpdateSettingAsync(metaModel, isShowMixedSport);
                _businessLogService.Received(1).Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }

        [Test]
        public async Task UpdateSettingAsync_HasEsportsTypeAndResultCodeIsNotPositiveAndNotUpdated_ReturnsExpectedResultAndWritesLog()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            var esportsTypeId = ((int)SportType.Esports).ToString();
            item.Id = esportsTypeId;
            item.IsUpdated = false;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = setting;
            var isShowMixedSport = FakeHelper.Create<bool>();
            var expectedResult = Substitute.For<IResultInfo>();
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult(expectedResult));

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
                _betSetting.Received(1).UpdateSettingAsync(metaModel, isShowMixedSport);
                _businessLogService.Received(1).Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }

        [Test]
        public async Task UpdateSettingAsync_HasEsportsTypeAndResultCodeIsNotPositiveAndUpdated_ReturnsExpectedResultAndWritesLog()
        {
            // Arrange
            var item = FakeHelper.Create<PlayerBetLimitMetaModel>();
            var esportsTypeId = ((int)SportType.Esports).ToString();
            item.Id = esportsTypeId;
            item.IsUpdated = true;
            var setting = new List<PlayerBetLimitMetaModel> { item };
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            metaModel.Setting = setting;
            var isShowMixedSport = FakeHelper.Create<bool>();

            var expectedResult = Substitute.For<IResultInfo>();
            _betSetting.UpdateSettingAsync(metaModel, isShowMixedSport).Returns(Task.FromResult(expectedResult));

            var dcsMetaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            var expectedDcsResult = Substitute.For<IResultInfo>();
            _dcsBetSetting.UpdateSettingAsync(dcsMetaModel).ReturnsForAnyArgs(Task.FromResult(expectedDcsResult));

            // Action
            var result = await _service.UpdateSettingAsync(metaModel, isShowMixedSport);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedDcsResult));
                _betSetting.Received(1).UpdateSettingAsync(metaModel, isShowMixedSport);
                _dcsBetSetting.Received(1).UpdateSettingAsync(Arg.Any<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>());
                _businessLogService.Received(1).Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }
    }
}