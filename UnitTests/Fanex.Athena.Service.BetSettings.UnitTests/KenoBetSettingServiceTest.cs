namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BetSettings;

    using DataAccess.BetSettings.Interfaces;

    using Interfaces;

    using Model.BetSettings.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    [TestFixture]
    public class KenoBetSettingServiceTest
    {
        private const int CustId = 2;

        private IKenoBetSettingDataAccess _dataAccess;
        private IKenoBetSettingService _service;
        [OneTimeSetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<IKenoBetSettingDataAccess>();
            _service = new KenoBetSettingService(_dataAccess);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _service = null;
        }

        [Test]
        public async Task GetViewModelAsync_WhenCall_BetSettingListReturnedFromDataAccess()
        {
            // Arrange
            var betSetting = new List<BetSetting>
            {
                new BetSetting()
            };
            _dataAccess.GetBetSettingsAsync(CustId).Returns(Task.FromResult<IList<BetSetting>>(betSetting));

            // Action
            var result = await _service.GetViewModelAsync(CustId);

            // Assert
            Assert.That(result.MainData.Count, Is.EqualTo(betSetting.Count));
        }

        [Test]
        public async Task UpdateBetSettingAsync_WhenCall_DataAccessExecuteWithCorrectParams()
        {
            // Arrange
            var userId = 2;
            var custId = 3;
            var language = "en-US";
            var ip = "ip";
            var setting = new KenoBetSetting
            {
                GameTypeID = "1",
                MinBet = 2,
                MaxBet = 3,
                MaxPerMatch = 4
            };
            var xmlParam = "<settings><setting GameTypeID=\"1\" minbet=\"2\" maxbet=\"3\" maxpermatch=\"4\" ></setting></settings>";

            // Action
            await _service.UpdateBetSettingAsync(custId, userId, language, ip, setting);

            // Assert
            await _dataAccess.Received(1).UpdateBetSettingAsync(custId, userId, language, ip, xmlParam);
        }

        
    }
}