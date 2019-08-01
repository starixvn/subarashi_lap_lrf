namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Model.BetSettings.DTO;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class DcsBetSettingServiceTest
    {
        [Test]
        public async Task GetBetSettingsAsync_WhenCall_ReturnDataFromDataAcccess()
        {
            // Arrange
            var betSettings = FakeHelper.CreateMany<BetSetting>(100).ToList();

            _betSettingDataAccess.GetBetSettingAsync(_custId, _productId).Returns(Task.FromResult<IList<BetSetting>>(betSettings));

            // Action
            var result = await _dcsBettingService.GetBetSettingsAsync(_custId, _productId);

            // Assert
            Assert.That(result.Count, Is.EqualTo(betSettings.Count));
        }

        [Test]
        public async Task UpdateBetSettingAsync_WhenCall_CallDataAccessWithCorrectParameters()
        {
            // Arrange
            var setting = FakeHelper.Create<DcsBetSetting>();
            var betSettings = new List<DcsBetSetting> { setting };

            var expectedXmlParam = string.Format(
                "<ROOT><BetLimit SportType=\"{0}\" BetType=\"{1}\" MinBet=\"{2}\" MaxBet=\"{3}\" MaxPerMatch=\"{4}\" ></BetLimit></ROOT>",
                setting.SportId,
                setting.BetType,
                setting.MinBet,
                setting.MaxBet,
                setting.MaxPerMatch);

            // Action
            await _dcsBettingService.UpdateBetSettingAsync(_custId, _userId, "ip", betSettings);

            // Assert
            await _betSettingDataAccess.Received(1).UpdateBetSettingAsync(_custId, _userId, "ip", expectedXmlParam);
        }

    }
}