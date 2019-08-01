using Fanex.Athena.Model.Auth;
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
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    [TestFixture]
    public class PlayerBaStatusServiceTest
    {
        private IPlayerBaStatusRepository _playerBaStatusRepository;

        private IAuthorizationService _authorizationService;

        private IProductService _productService;

        [SetUp]
        public void Setup()
        {
            _playerBaStatusRepository = Substitute.For<IPlayerBaStatusRepository>();
            _authorizationService = Substitute.For<IAuthorizationService>();
            _productService = Substitute.For<IProductService>();
        }

        [TearDown]
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
            var expectedResult = new ResultViewModel
            {
                Success = false,
                ErrorMessage = ResourceKeyConstants.NotAllowBA
            };

            var metaModel = CreateMetaModel();
            var productAccess = CreateProductAccess(false);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService);

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
                ErrorMessage = ResourceKeyConstants.InvalidData
            };

            var metaModel = CreateMetaModel();
            _authorizationService.HasPermissionOnData(Arg.Any<OneAuthCurrency[]>(), metaModel.CustId, 0).Returns(false);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
        }

        [Test]
        public void Update_ValidPermission_ReturnCorrectResult()
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
            _authorizationService.HasPermissionOnData(Arg.Any<OneAuthCurrency[]>(), metaModel.CustId, 0).Returns(true);
            _playerBaStatusRepository.Update(metaModel).Returns(expectedUpdatingResult);

            var service = new PlayerBaStatusService(_playerBaStatusRepository, _authorizationService);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.That(result, Tobe.SameProperties(expectedResult));
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
                CurrencyPermission = ExternalApiHelper.CreateAuthCurrencyList(),
                Language = ExternalApiHelper.DefaultLanguage,
                CustId = 5
            };
        }
    }
}