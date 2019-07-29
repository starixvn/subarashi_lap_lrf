using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Athena.UnitTest.Common.NUnitExtensions;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    public class PlayerSpecialLevelServiceTest
    {
        private IPlayerSpecialLevelRepository _playerSpecialLevelRepository;

        private IAuthorizationService _authorizationService;

        private ILicenseeSettingService _licenseeSettingService;

        [OneTimeSetUp]
        public void Setup()
        {
            _playerSpecialLevelRepository = Substitute.For<IPlayerSpecialLevelRepository>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _licenseeSettingService = Substitute.For<ILicenseeSettingService>();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _playerSpecialLevelRepository = null;
            _authorizationService = null;
            _licenseeSettingService = null;
        }

        [Test]
        public void Update_FakeLicensee_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.FunctionDenied
            };

            var metaModel = CreateMetaModel();
            _licenseeSettingService.IsFakeLicensee(metaModel.SiteName).Returns(true);

            var service = new PlayerSpecialLevelService(_playerSpecialLevelRepository, _authorizationService, _licenseeSettingService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
        }

        [Test]
        public void Update_HasNoPermission_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultViewModel
            {
                Success = false,
                ErrorCode = UpdatingUtils.DefaultErrCode,
                ErrorMessage = ResourceKeyConstants.InvalidData
            };

            var metaModel = CreateMetaModel();
            _licenseeSettingService.IsFakeLicensee(metaModel.SiteName).Returns(false);
            _authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0).Returns(false);

            var service = new PlayerSpecialLevelService(_playerSpecialLevelRepository, _authorizationService, _licenseeSettingService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
        }

        [Test]
        public void Update_ValidDataAndPermission_ReturnCorrectResult()
        {
            // Arrange
            var expectedResult = new ResultViewModel
            {
                Success = true,
                Message = string.Empty,
                ErrorCode = 0
            };
            var resultInfo = new ResultInfo
            {
                Code = 0,
                Message = string.Empty
            };

            var metaModel = CreateMetaModel();
            _licenseeSettingService.IsFakeLicensee(metaModel.SiteName).Returns(false);
            _authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0).Returns(true);
            _playerSpecialLevelRepository.Update(metaModel).Returns(resultInfo);

            var service = new PlayerSpecialLevelService(_playerSpecialLevelRepository, _authorizationService, _licenseeSettingService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
        }

        private static SpecialLevelUpdatingMetaModel CreateMetaModel()
        {
            return new SpecialLevelUpdatingMetaModel
            {
                LicenseeId = ExternalApiHelper.DefaultLicenseeId,
                Language = ExternalApiHelper.DefaultLanguage,
                CustId = 5,
                SiteName = ExternalApiHelper.DefaultSiteName
            };
        }
    }
}