namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class DcsBetLimitServiceTest
    {
        private IDcsBetLinitRepository _repository;

        private IBusinessLogService _businessLogService;

        private DcsBetLimitService _service;

        [OneTimeSetUp]
        public void SetUp()
        {
            _repository = Substitute.For<IDcsBetLinitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new DcsBetLimitService(
                _repository,
                _businessLogService
            );
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _service = null;
        }

        [Test]
        public async Task GetSettingAsync_WhenCall_ReturnsSettingFromRepository()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var productId = FakeHelper.Create<int>();

            // Action
            await _service.GetSettingAsync(custId, productId);

            // Assert
            Assert.Multiple(() =>
            {
                _repository.Received(1).GetSettingAsync(custId, productId);
            });
        }

        [Test]
        public async Task GetStatusAsync_ProductsHasStatusNotContainingProductId_ReturnsTrue()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var productId = ProductTypes.Lottery + FakeHelper.Create<int>();

            // Action
            var result = await _service.GetStatusAsync(custId, productId);

            // Assert
            Assert.IsTrue(result);
        }

        [Test]
        public async Task GetStatusAsync_ProductsHasStatusContainingProductId_ReturnsStatusFromReposity()
        {
            // Arrange
            var custId = FakeHelper.Create<int>();
            var productId = ProductTypes.Lottery;

            // Action
            await _service.GetStatusAsync(custId, productId);

            // Assert
            Assert.Multiple(() =>
            {
                _repository.Received(1).GetStatusAsync(custId, productId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_ReturnsCorectResultAndWritesLog()
        {
            // Arrange
            var metaModel = FakeHelper.Create<PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>>>();
            var expectedResult = Substitute.For<IResultInfo>();
            _repository.UpdateSettingAsync(metaModel).Returns(Task.FromResult(expectedResult));

            // Action
            var result = await _service.UpdateSettingAsync(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.EqualTo(expectedResult));
                _businessLogService.Received(1).Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }
    }
}