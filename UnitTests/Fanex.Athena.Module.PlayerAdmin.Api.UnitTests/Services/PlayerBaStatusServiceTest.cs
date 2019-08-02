using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.UnitTest.Common.NUnitExtensions;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    [TestFixture]
    public class PlayerBaStatusServiceTest
    {
        private IPlayerBaStatusRepository _playerBaStatusRepository;

        [SetUp]
        public void Setup()
        {
            _playerBaStatusRepository = Substitute.For<IPlayerBaStatusRepository>();
        }

        [TearDown]
        public void TearDown()
        {
            _playerBaStatusRepository = null;
        }

        [Test]
        public void Update_WhenCall_ReturnCorrectResult()
        {
            // Arrange
            var expectedUpdatingResult = new ResultInfo
            {
                Code = 0,
                Message = string.Empty
            };

            var expectedResult = new ResultViewModel
            {
                Success = true,
                Message = string.Empty,
                ErrorCode = 0
            };

            var metaModel = CreateMetaModel();
            _playerBaStatusRepository.Update(metaModel).Returns(expectedUpdatingResult);

            var service = new PlayerBaStatusService(_playerBaStatusRepository);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
        }

        private static BaStatusUpdatingMetaModel CreateMetaModel()
        {
            return new BaStatusUpdatingMetaModel
            {
                CurrencyPermission = ExternalApiHelper.CreateAuthCurrencyList(),
                Language = ExternalApiHelper.DefaultLanguage,
                CustId = 5
            };
        }
    }
}