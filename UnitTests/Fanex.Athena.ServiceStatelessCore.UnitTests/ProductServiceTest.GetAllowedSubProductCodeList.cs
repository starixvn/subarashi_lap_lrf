using System.Linq;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public partial class ProductServiceTest
    {
        [Test]
        public void GetAllowedSubProductCodeList_OfferSubProduct_ReturnCorrectResult()
        {
            // Arrange

            var productCodeList = "SB,BA";

            var expectedResult = "SB,BA,SLT";

            // Action
            var result = _productService.GetAllowedSubProductCodeList(_subproduct, productCodeList);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }

        [Test]
        public void GetAllowedSubProductCodeList_NotOfferSubProduct_ReturnCorrectResult()
        {
            // Arrange

            var productCodes = "SB,BA";
            var expectedResult = "SB,BA";

            // Action
            var result = _productService.GetAllowedSubProductCodeList(Enumerable.Empty<string>(), productCodes);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}