namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using DataAccess.BetSettings.Interfaces;

    using Interfaces;

    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using Resources;

    using StatelessCore.Interfaces;

    using UnitTest.Common.Helpers;

    [TestFixture]
    public partial class DcsBetSettingServiceTest
    {
        private readonly int _custId = FakeHelper.Create<int>();
        private readonly int _productId = FakeHelper.Create<int>();
        private readonly int _userId = FakeHelper.Create<int>();

        private IDcsBetSettingDataAccess _betSettingDataAccess;
        private IDcsBetSettingService _dcsBettingService;
        [OneTimeSetUp]
        public void Setup()
        {
            _betSettingDataAccess = Substitute.For<IDcsBetSettingDataAccess>();
            _dcsBettingService = new DcsBetSettingService(_betSettingDataAccess);
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _betSettingDataAccess = null;
            _dcsBettingService = null;
        }

        [Test]
        public async Task GetStatusAsync_WhenCall_ReturnCorrectData()
        {
            // Arrange
            _betSettingDataAccess.GetStatusAsync(_custId, _productId).Returns(Task.FromResult((bool?)true));

            // Action
            var result = await _dcsBettingService.GetStatusAsync(_custId, _productId);

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task UpdateStatusAsync_WhenCallReturnCorrectResult()
        {
            // Arrange
            var ip = FakeHelper.Create<string>();
            var status = FakeHelper.Create<bool>();
            var expectedResult = FakeHelper.Create<ResultInfo>();

            _betSettingDataAccess.UpdateStatusAsync(_userId, _custId, ip, status, _productId).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _dcsBettingService.UpdateStatusAsync(_userId, _custId, ip, status, _productId);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

    }
}