namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using BetSettings;
    using BetSettings.Interfaces;

    using DataAccess.BetSettings.Interfaces;

    using Model.BetSettings.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    [TestFixture]
    public class NumberGameBetSettingServiceTest
    {
        private const int UserId = 2;
        private const int CustId = 3;
        private const string Language = "en-US";

        private INumberGameBetSettingDataAccess _dataAccess;
        private INumberGameBetSettingService _service;

        [OneTimeSetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<INumberGameBetSettingDataAccess>();
            _service = new NumberGameBetSettingService(_dataAccess);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _service = null;
        }

        [Test]
        public async Task GetViewModelAsync_WhenCall_ReturnDataFromDataAcccess()
        {
            // Arrange
            var betSettings = new List<BetSetting>
            {
                new BetSetting()
            };
            _dataAccess.GetBetSettingAsync(CustId).Returns(Task.FromResult<IList<BetSetting>>(betSettings));

            // Action
            var result = await _service.GetViewModelAsync( CustId);

            // Assert
            Assert.That(result.MainData.Count, Is.EqualTo(betSettings.Count));
        }

        [Test]
        public async Task UpdateBetSettingAsync_WhenCall_CallDataAccessWithCorrectParameters()
        {
            // Arrange
            var data = new Hashtable
            {
                { "minbet161", 111m },
                { "maxbet161", 222m },
                { "maxpermatch161", 333m },
                { "maxperball", 444m }
            };
            var setting = new CommonBetSetting
            {
                CustId = CustId,
                UserId = UserId,
                Language = Language,
                Ip = "ip"
            };

            // Action
            await _service.UpdateBetSettingAsync(setting, data);

            // Assert
            await _dataAccess.Received(1).UpdateBetSettingAsync(Arg.Is<NumberGameBetSetting>(
                x => x.CustId == CustId &&
                    x.UserId == UserId &&
                    x.Language == Language &&
                    x.Ip == "ip" &&
                    x.MinBet == 111m &&
                    x.MaxBet == 222m &&
                    x.MaxPerMatch == 333m &&
                    x.MaxPerBall == 444m &&
                    x.IsDataChange));
        }
    }
}