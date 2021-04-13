namespace Fanex.Athena.Service.BetSettings.UnitTests
{
    using System.Threading.Tasks;

    using DataAccess.BetSettings.Interfaces;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Interfaces;

    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

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
            var status = FakeHelper.Create<int>();
            var expectedResult = FakeHelper.Create<ResultInfo>();
            var metaModel = new UpdateStatusMetaModel
            {
                CustId = _custId,
                Status = status,
                ProductId = _productId
            };

            _betSettingDataAccess.UpdateStatusAsync(_userId, ip, metaModel).Returns(Task.FromResult<IResultInfo>(expectedResult));

            // Action
            var result = await _dcsBettingService.UpdateStatusAsync(_userId, ip, metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

    }
}
