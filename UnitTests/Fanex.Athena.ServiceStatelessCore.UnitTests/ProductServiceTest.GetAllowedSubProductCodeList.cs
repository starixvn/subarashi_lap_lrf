using Fanex.Athena.Model.Core.DTO.Common;
using NUnit.Framework;
using System.Collections.Generic;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public partial class ProductServiceTest
    {
        [Test]
        public void GetAllowedSubProductCodeList_OfferSubProduct_ReturnCorrectResult()
        {
            // Arrange
            var productList = new List<Product>
            {
                new Product { ProductID = 100, ProductCode = "SB" },
                new Product { ProductID = 200, ProductCode = "AB" },
                new Product { ProductID = 300, ProductCode = "BTC" },
            };

            var productCodeList = "SB,BA";

            var expectedResult = "SB,BA,BTC";

            SetUpForGetProductListFromCache(productList);

            // Action
            var result = _productService.GetAllowedSubProductCodeList(_subproduct, productCodeList);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetAllowedSubProductCodeList_NotOfferSubProduct_ReturnCorrectResult()
        {
            // Arrange
            var productList = new List<Product>
            {
                new Product { ProductID = 100, ProductCode = "SB" },
                new Product { ProductID = 200, ProductCode = "AB" },
            };

            var expectedResult = "SB,BA";

            SetUpForGetProductListFromCache(productList);

            // Action
            var result = _productService.GetAllowedSubProductCodeList(_subproduct, expectedResult);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}