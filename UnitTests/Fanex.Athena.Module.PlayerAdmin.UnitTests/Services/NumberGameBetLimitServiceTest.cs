namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DataDomains;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.Helpers;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.Services;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class NumberGameBetLimitServiceTest
    {
        private INumberGameBetLimitRepository _repository;

        private IBusinessLogService _businessLogService;

        private NumberGameBetLimitService _service;

        [OneTimeSetUp]
        public void SetUp()
        {
            _repository = Substitute.For<INumberGameBetLimitRepository>();
            _businessLogService = Substitute.For<IBusinessLogService>();
            _service = new NumberGameBetLimitService(_repository, _businessLogService);
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

            // Action
            await _service.GetSettingAsync(custId);

            // Assert
            Assert.Multiple(() =>
            {
                _repository.GetSettingAsync(custId);
            });
        }

        [Test]
        public async Task UpdateSettingAsync_WhenCall_ReturnsCorrectResultAndWritesLog()
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
                _businessLogService.Write(BusinessLogType.CustomerBetSetting, Arg.Any<PlayerBetLimitLogMetaModel>());
            });
        }
    }
}