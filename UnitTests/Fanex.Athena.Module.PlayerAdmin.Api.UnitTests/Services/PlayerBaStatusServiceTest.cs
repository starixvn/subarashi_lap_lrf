using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.Module.PlayerAdmin.Api.Utilities;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    public class PlayerBaStatusServiceTest
    {
        private IPlayerBaStatusRepository _playerBaStatusRepository;

        private IAuthorizationService _authorizationService;

        private IProductService _productService;

        [OneTimeSetUp]
        public void Setup()
        {
            _playerBaStatusRepository = Substitute.For<IPlayerBaStatusRepository>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _productService = Substitute.For<IProductService>();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            _playerBaStatusRepository = null;
            _authorizationService = null;
            _productService = null;
        }

        [Test]
        public void Update_NotAllowBa_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultInfo
            {
                Code = UpdatingUtils.DefaultErrCode,
                Message = ResourceKeyConstants.NotAllowBA
            };

            var metaModel = CreateMetaModel();
            var productAccess = CreateProductAccess(false);
            _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language).Returns(productAccess);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService, _productService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void Update_HasNoPermission_ReturnCorrectErroResult()
        {
            // Arrange
            var expectedResult = new ResultInfo
            {
                Code = UpdatingUtils.DefaultErrCode,
                Message = ResourceKeyConstants.InvalidData
            };

            var metaModel = CreateMetaModel();
            var productAccess = CreateProductAccess(true);
            _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language).Returns(productAccess);
            _authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0).Returns(false);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService, _productService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        [Test]
        public void Update_ValidPermission_ReturnCorrectResult()
        {
            // Arrange
            var expectedResult = new ResultInfo
            {
                Code = 0,
                Message = string.Empty
            };

            var metaModel = CreateMetaModel();
            var productAccess = CreateProductAccess(true);
            _productService.GetProductAccess(metaModel.LicenseeId, metaModel.Language).Returns(productAccess);
            _authorizationService.HasPermissionOnData(metaModel.LicenseeId, metaModel.CustId, 0).Returns(true);
            _playerBaStatusRepository.Update(metaModel).Returns(expectedResult);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService, _productService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Code, Is.EqualTo(expectedResult.Code));
                Assert.That(result.Message, Is.EqualTo(expectedResult.Message));
            });
        }

        private static ProductAccess CreateProductAccess(bool isAllowBA)
        {
            var _productList = new List<Product>
            {
                new Product { ProductCode = isAllowBA ? Product.BA : Product.SB }
            };

            return new ProductAccess(_productList);
        }

        private static BaStatusUpdatingMetaModel CreateMetaModel()
        {
            return new BaStatusUpdatingMetaModel
            {
                LicenseeId = ExternalApiHelper.DefaultLicenseeId,
                Language = ExternalApiHelper.DefaultLanguage,
                CustId = 5
            };
        }
    }
}