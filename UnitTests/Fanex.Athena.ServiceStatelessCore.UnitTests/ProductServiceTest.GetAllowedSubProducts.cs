using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;
using NUnit.Framework;
using System.Collections.Generic;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public partial class ProductServiceTest
    {
        [Test]
        public void GetAllowedSubProducts_OfferSubProduct_ReturnCorrectResult()
        {
            var productOptions = new List<ProductOption>
            {
                new ProductOption { Code = "SB", Status = true },
                new ProductOption { Code = "B", Status = false },
                new ProductOption { Code = "C", Status = true }
            };

            var expectedResult = new List<ProductOption>
            {
                new ProductOption { Code = "SB", Status = true },
                new ProductOption { Code = "B", Status = false },
                new ProductOption { Code = "C", Status = true },
                 new ProductOption { Code = "BTC", Status = true }
            };

            // Action
            var result = _productService.GetAllowedSubProductOptions(_subproduct, productOptions);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetAllowedSubProducts_NotOfferSubProduct_ReturnCorrectResult()
        {
            // Arrange
            var expectedResult = new List<ProductOption>
            {
                new ProductOption { Code = "SB", Status = true },
                new ProductOption { Code = "B", Status = false },
                new ProductOption { Code = "C", Status = true }
            };

            // Action
            var result = _productService.GetAllowedSubProductOptions(_subproduct, expectedResult);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}