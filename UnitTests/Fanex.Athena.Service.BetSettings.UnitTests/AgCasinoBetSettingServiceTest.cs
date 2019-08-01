namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BetSettings;
    using BetSettings.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Extension.Utility;
    using Extension.Utility.Interfaces;

    using Fanex.Logging;

    using Model.BetSettings.DTO;
    using Model.BetSettings.DTO.AgCasino;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class AgCasinoBetSettingServiceTest
    {
        private const string FakeApiUrl = "http://api.com";

        private IAgCasinoBetSettingDataAccess _dataAccess;
        private IAppSettings _appSettings;
        private IWebClientService _webClientService;
        private IAgCasinoBetSettingService _service;
        private ILogger _logger;

        [OneTimeSetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<IAgCasinoBetSettingDataAccess>();
            _appSettings = Substitute.For<IAppSettings>();
            _webClientService = Substitute.For<IWebClientService>();
            _logger = Substitute.For<ILogger>();
            _service = new AgCasinoBetSettingService(
                _logger,
                _dataAccess,
                _appSettings,
                _webClientService);

            const string ApiUrlName = "AGCasinoApiUrl";
            _appSettings.GetValue(ApiUrlName).Returns(FakeApiUrl);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _appSettings = null;
            _webClientService = null;
            _service = null;
        }

        [Test]
        public async Task GetViewModelAsync_WhenCall_ApiResultRetriviedCorrectly()
        {
            // Arrange
            var licenseeName = FakeHelper.Create<string>();
            var custId = FakeHelper.Create<int>();
            var gameType = FakeHelper.Create<string>();
            var groupType = FakeHelper.Create<string>();
            var group = FakeHelper.Create<string>();

            var fakeSetting = new AgCasinoBetSetting
            {
                AgGroup = group,
                CheckedGroups = new[] { "B" }
            };

            _dataAccess.GetBetSettingAsync(custId).Returns(Task.FromResult(fakeSetting));
            _webClientService.UploadStringAsync(new Uri(FakeApiUrl), $"SiteName={licenseeName}&Currency=0")
                .Returns(Task.FromResult($"<Game GameType='{gameType}' Name='{group}'><Group GroupType='{groupType}'><Min>1</Min><Max>100</Max></Group></Game>"));

            // Action
            var result = await _service.GetViewModelAsync(custId, licenseeName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Games[0].GameType, Is.EqualTo(gameType));
                Assert.That(result.Games[0].Groups[0].GroupType, Is.EqualTo(groupType));
                Assert.That(result.BetSetting.CheckedGroups.Contains(group), Is.True);
            });
        }

        [Test]
        public async Task GetViewModelAsync_CheckGroupsContainAgGroupInSetting_ReturnCorrectViewModel()
        {
            // Arrange
            var licenseeName = FakeHelper.Create<string>();
            var custId = FakeHelper.Create<int>();
            var gameType = FakeHelper.Create<string>();
            var groupType = FakeHelper.Create<string>();
            var group = FakeHelper.Create<string>();

            var fakeSetting = new AgCasinoBetSetting
            {
                AgGroup = group,
                CheckedGroups = new[] { group, "B", "C" },
                IsEnabled = true
            };

            _dataAccess.GetBetSettingAsync(custId).Returns(Task.FromResult(fakeSetting));
            _webClientService.UploadStringAsync(new Uri(FakeApiUrl), $"SiteName={licenseeName}&Currency=0")
                .Returns(Task.FromResult($"<Game GameType='{gameType}' Name='{group}'><Group GroupType='{groupType}'><Min>1</Min><Max>100</Max></Group></Game>"));

            // Action
            var result = await _service.GetViewModelAsync(custId, licenseeName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Games[0].GameType, Is.EqualTo(gameType));
                Assert.That(result.Games[0].Groups[0].GroupType, Is.EqualTo(groupType));
                Assert.That(result.BetSetting.CheckedGroups.Length, Is.EqualTo(3));
                Assert.That(result.IsEnabled, Is.True);
            });
        }

        [Test]
        public async Task UpdateAgCasinoBetSettingAsync_WhenCall_ReturnDataFromDataAccess()
        {
            // Arrange
            var expectedResult = FakeHelper.Create<ResultInfo>();
            var group = FakeHelper.Create<string>();
            var setting = new CommonBetSetting { LicenseeId = FakeHelper.Create<int>(), CustId = FakeHelper.Create<int>() };

            _dataAccess.GetBetSettingAsync(setting.CustId).Returns(Task.FromResult(new AgCasinoBetSetting
            {
                IsEnabled = true
            }));
            _dataAccess.UpdateBetSettingAsync(Arg.Any<CommonBetSetting>(), group).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _service.UpdateAgCasinoBetSettingAsync(setting, group);

            // Assert
            Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
        }

        [Test]
        public async Task UpdateAgCasinoBetSettingAsync_SettingParamIsNull_ReturnCorrectErrorResult()
        {
            // Arrange
            var expectedResult = new ResultInfo
            {
                Code = 1,
                Message = "Invalid parameter. AG Casino is null"
            };

            // Action
            var result = await _service.UpdateAgCasinoBetSettingAsync(null, FakeHelper.Create<string>());

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public async Task UpdateAgCasinoBetSettingAsync_IsEnabledOfSettingIsFalse_ReturnCorrectErrorResult()
        {
            // Arrange
            var expectedResult = new ResultInfo
            {
                Code = 1,
                Message = ViewResources.AccessDeniedMsg
            };

            var setting = new CommonBetSetting { LicenseeId = FakeHelper.Create<int>(), CustId = FakeHelper.Create<int>() };

            _dataAccess.GetBetSettingAsync(setting.CustId).Returns(Task.FromResult(new AgCasinoBetSetting
            {
                IsEnabled = false
            }));

            // Action
            var result = await _service.UpdateAgCasinoBetSettingAsync(setting, FakeHelper.Create<string>());

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public async Task UpdateStatusAsync_WhenCall_ReturnDataFromDataAccess()
        {
            // Arrange
            var expectedResult = FakeHelper.Create<ResultInfo>();

            var userId = FakeHelper.Create<int>();
            var custId = FakeHelper.Create<int>();
            var language = FakeHelper.Create<string>();
            var ip = FakeHelper.Create<string>();

            _dataAccess.UpdateStatusAsync(userId, custId, language, ip, true).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _service.UpdateStatusAsync(userId, custId, language, ip, true);

            // Assert
            Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
        }

    }
}