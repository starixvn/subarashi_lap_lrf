namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Logging;
    using NSubstitute;
    using NUnit.Framework;
    using System.Linq;
    using System.Collections.Generic;

    public class AGCasinoBetLimitServiceTest
    {
        private const string FakeApiUrl = "http://api.com";

        private ILogger _logger;

        private IAppSettings _appSettings;

        private IWebClientService _webClientService;

        private IAGCasinoBetLimitRepository _repository;

        private IBusinessLogService _businessLogService;

        private AGCasinoBetLimitService _service;

        [OneTimeSetUp]
        public void SetUp()
        {
            _logger = Substitute.For<ILogger>();
            _appSettings = Substitute.For<IAppSettings>();
            _webClientService = Substitute.For<IWebClientService>();
            _repository = Substitute.For<IAGCasinoBetLimitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new AGCasinoBetLimitService(
                _logger,
                _appSettings,
                _webClientService,
                _repository,
                _businessLogService
            );

            const string ApiUrlName = "AGCasinoApiUrl";
            _appSettings.GetValue(ApiUrlName).Returns(FakeApiUrl);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _service = null;
        }

        [Test]
        public async Task GetBetSettingAsync_WhenCall_ReturnsBetSettingFromRepository()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();

            // Action
            await _service.GetBetSettingAsync(custId);

            // Assert
            Assert.Multiple(() =>
            {
                _repository.Received(1).GetBetSettingAsync(custId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_ReturnsMetamodelAndWritesLog()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel>>();
            var expectedResult = FakeHelper.Create<ResultInfo>();
            _repository.UpdateSettingAsync(metaModel).Returns(expectedResult);

            // Action
            var result = await _service.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
                _businessLogService.Received(1).Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }

        [Test]
        public async Task GetGroupBettingsAsync_WhenCallAndRetriviedInvalidApiResult_ReturnsEmptyListAndLogsError()
        {
            // Arrange
            var siteName = FakeHelper.Create<string>();
            var currency = FakeHelper.Create<int>();
            var expectedApiResult = FakeHelper.Create<string>();
            _webClientService.UploadStringAsync(new Uri(FakeApiUrl), $"SiteName={siteName}&Currency={currency}").Returns(Task.FromResult(expectedApiResult));

            // Action
            var games = await _service.GetGroupBettingsAsync(siteName, currency);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.IsEmpty(games);
                _logger.Received(1).Error(Arg.Any<string>());
            });
        }

        [Test]
        public async Task GetGroupBettingsAsync_WhenCallAndRetriviedValidApiResult_ReturnsList()
        {
            // Arrange
            var siteName = FakeHelper.Create<string>();
            var currency = FakeHelper.Create<int>();
            const string expectedApiResult = "<Game GameType='AGType' Name='AGName'><Group GroupType='AGGroupType'><Min>1</Min><Max>100</Max></Group></Game>";
            _webClientService.UploadStringAsync(new Uri(FakeApiUrl), $"SiteName={siteName}&Currency={currency}").Returns(Task.FromResult(expectedApiResult));

            // Action
            var games = await _service.GetGroupBettingsAsync(siteName, currency);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(games.Count(), Is.EqualTo(1));
                Assert.That(games[0].GameType, Is.EqualTo("AGType"));
                Assert.That(games[0].Name, Is.EqualTo("AGName"));
                Assert.That(games[0].Groups.Count(), Is.EqualTo(1));
                Assert.That(games[0].Groups[0].GroupType, Is.EqualTo("AGGroupType"));
                Assert.That(games[0].Groups[0].Min, Is.EqualTo(1));
                Assert.That(games[0].Groups[0].Max, Is.EqualTo(100));
            });
        }
    }
}