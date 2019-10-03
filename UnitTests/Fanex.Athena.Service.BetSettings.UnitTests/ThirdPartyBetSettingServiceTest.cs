namespace Fanex.Athena.Service.BetSettings.UnitTests
{
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
    public class ThirdPartyBetSettingServiceTest
    {
        private const int UserId = 2;
        private const int CustId = 3;
        private const string Language = "en-US";

        private IThirdPartyBetSettingDataAccess _dataAccess;
        private IThirdPartyBetSettingService _service;

        [SetUp]
        public void SetUp()
        {
            _dataAccess = Substitute.For<IThirdPartyBetSettingDataAccess>();
            _service = new ThirdPartyBetSettingService( _dataAccess);
        }

        [TearDown]
        public void TearDown()
        {
            _dataAccess = null;
            _service = null;
        }

        [Test]
        public async Task GetViewModelAsync_WhenCall_ReturnDataFromDataAcccess()
        {
            // Arrange
            const int ProductId = 100;

            var betSetting = new ThirdPartyBetSetting
            {
                IsEnabled = true,
                IsLineEnabled = true
            };

            _dataAccess.GetBetSettingAsync(CustId, ProductId).Returns(Task.FromResult(betSetting));

            // Action
            var result = await _service.GetViewModelAsync( CustId, ProductId);

            // Assert
            Assert.That(result.IsEnabled, Is.EqualTo(betSetting.IsEnabled));
            Assert.That(result.IsLineEnabled, Is.EqualTo(betSetting.IsLineEnabled));
        }


        [Test]
        public async Task UpdateStatusAsync_WhenCall_CallDataAccessWithCorrectParameters()
        {
            // Arrange
            const int ProductId = 100;

            var betSetting = new ThirdPartyBetSetting
            {
                IsLineEnabled = true
            };
            _dataAccess.GetBetSettingAsync(CustId, ProductId).Returns(Task.FromResult(betSetting));

            // Action
            await _service.UpdateStatusAsync( ProductId, UserId, CustId, Language, "ip", true);

            // Assert
            await _dataAccess.Received(1).UpdateStatusAsync(ProductId, UserId, CustId, Language, "ip", true);
        }

        [Test]
        public async Task UpdateStatusAsync_IsLineEnabledInSettingIsNull_ReturnCorrectErrorResult()
        {
            // Arrange
            const int ProductId = 100;
            var betSetting = new ThirdPartyBetSetting
            {
                IsLineEnabled = false
            };
            _dataAccess.GetBetSettingAsync(CustId, ProductId).Returns(Task.FromResult(betSetting));

            // Action
            var result = await _service.UpdateStatusAsync(ProductId, UserId, CustId, Language, "ip", true);

            // Assert
            Assert.That(result.Code, Is.EqualTo(1));
            Assert.That(result.Message, Is.EqualTo(ViewResources.AccessDeniedMsg));
        }
    }
}