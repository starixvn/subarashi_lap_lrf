namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BetSettings;
    using BetSettings.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Model.BetSettings.DTO;
    using Model.BetSettings.ViewModel;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public class SportsbookBetSettingServiceTest
    {
        private const int CustId = 3;

        private ISportsbookBetSettingDataAccess _dataAccess;
        private ISportsbookBetSettingService _service;
        private IDcsBetSettingService _dcsBetSettingService;
        [SetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<ISportsbookBetSettingDataAccess>();
            _dcsBetSettingService = Substitute.For<IDcsBetSettingService>();
            _service = new SportsbookBetSettingService(_dataAccess, _dcsBetSettingService);
        }

        
        [Test]
        public async Task GetViewModelAsync_WhenCall_ReturnDataFromDataAcccess()
        {
            // Arrange
            var viewModel = new BetSettingViewModel
            {
                MainData = new List<BetSetting>
                {
                    new BetSetting(),
                    new BetSetting(),
                    new BetSetting()
                }
            };
            _dataAccess.GetBetSettingAsync(CustId).Returns(Task.FromResult(viewModel));
            _dcsBetSettingService.GetBetSettingsAsync(CustId, Arg.Any<int>())
                .Returns(Task.FromResult<IList<BetSetting>>(new List<BetSetting>
                {
                    new BetSetting()
                }));

            // Action
            var result = await _service.GetViewModelAsync(CustId);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.MainData.Count, Is.EqualTo(viewModel.MainData.Count));
            });
        }

        [Test]
        public void GetViewModelAsync_NoEsportData_ThrowException()
        {
            // Arrange
            var viewModel = new BetSettingViewModel
            {
                MainData = new List<BetSetting>()
            };
            _dataAccess.GetBetSettingAsync(CustId).Returns(Task.FromResult(viewModel));
            _dcsBetSettingService.GetBetSettingsAsync(CustId, Arg.Any<int>()).Returns(Task.FromResult<IList<BetSetting>>(new List<BetSetting>()));

            // Action
            Task testDelegate() => _service.GetViewModelAsync(CustId);

            // Assert
            Assert.ThrowsAsync<System.InvalidOperationException>(testDelegate, "sdfsdf");
        }

        [Test]
        public async Task UpdateBetSettingAsync_WhenCall_CallUpdateBetSettingMethods()
        {
            // Arrange
            _dataAccess.UpdateBetSettingAsync(Arg.Any<CommonBetSetting>(), Arg.Any<Dictionary<string, object>>()).Returns(Task.FromResult<IResultInfo>(new ResultInfo()));
            var commonBetSetting = FakeHelper.Create<CommonBetSetting>();

            // Action
            var result = await _service.UpdateBetSettingAsync(commonBetSetting,
                new Dictionary<string, object>(), new DcsBetSetting());

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.Received(1).UpdateBetSettingAsync(commonBetSetting, Arg.Any<Dictionary<string, object>>());
                _dcsBetSettingService.Received(1).UpdateBetSettingAsync(
                    commonBetSetting.CustId,
                    commonBetSetting.UserId,
                    commonBetSetting.Ip,
                    Arg.Any<IEnumerable<DcsBetSetting>>());
            });
        }

        [Test]
        public async Task UpdateBetSettingAsync_UpdateSportsbookFail_DoNotCallUpdateEsport()
        {
            // Arrange
            _dataAccess.UpdateBetSettingAsync(Arg.Any<CommonBetSetting>(), Arg.Any<Dictionary<string, object>>())
                .Returns(Task.FromResult<IResultInfo>(new ResultInfo
                {
                    Code = 1,
                    Message = "Error"
                }));

            // Action
            await _service.UpdateBetSettingAsync(new CommonBetSetting(),
                new Dictionary<string, object>(), new DcsBetSetting());

            // Assert
            Assert.Multiple(() =>
            {
                _dataAccess.Received(1).UpdateBetSettingAsync(Arg.Any<CommonBetSetting>(), Arg.Any<Dictionary<string, object>>());
                _dcsBetSettingService.DidNotReceive().UpdateBetSettingAsync(
                    Arg.Any<int>(),
                    Arg.Any<int>(),
                    Arg.Any<string>(),
                    Arg.Any<IEnumerable<DcsBetSetting>>());
            });
        }

        [Test]
        public async Task UpdateBetSettingAsync_SettingParamIsNull_ReturnCorrectErrorResult()
        {
            // Arrange

            // Action
            var result = await _service.UpdateBetSettingAsync(null, new Dictionary<string, object>(), new DcsBetSetting());

            // Assert
            Assert.That(result.Code, Is.EqualTo(1));
            Assert.That(result.Message, Is.EqualTo("Invalid parameters. bet setting is null"));
        }

    }
}