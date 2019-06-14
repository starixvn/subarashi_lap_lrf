namespace Fanex.Athena.Api.Report.UnitTests
{
    using System;
    using System.Collections.Generic;
    using Base.UnitTests;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel;
    using NSubstitute;
    using NUnit.Framework;
    using Session.Model;

    public class ApiReportBaseControllerTest : BaseApiControllerHelperTest
    {
        private ApiReportBaseController _controller;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _controller = Substitute.ForPartsOf<ApiReportBaseController>(SessionService, ProductService, LangService);
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _controller = null;
        }

        [TestCase("SB,NGX,XXX", false)]
        [TestCase("XXX", false)]
        [TestCase("SB,NG", true)]
        public void CheckValidProducts_RandomProductlist_ReturnCorrectResult(
            string productCodeList, bool expectedValue)
        {
            // Arrange
            MockSessionData();
            const string FunctionKey = "ACBdfsd";
            var productList = new List<Product>
            {
                new Product { ProductCode = "SB" },
                new Product { ProductCode = "NG" }
            };
            var productAccess = new ProductAccess(productList);
            ProductService.GetSingleWalletProductAccess(Arg.Any<int>(), Arg.Any<string>(), FunctionKey).Returns(productAccess);

            // Action
            var result = _controller.IsValidProducts(FunctionKey, productCodeList);

            // Assert
            Assert.AreEqual(result, expectedValue);
        }

        [TestCase("")]
        [TestCase(null)]
        public void CheckValidProducts_NullProduct_ReturnFalse(string productCodeList)
        {
            // Arrange
            MockSessionData();

            // Action
            var result = _controller.IsValidProducts("any string", productCodeList);

            // Assert
            Assert.IsFalse(result);
        }
    }
}