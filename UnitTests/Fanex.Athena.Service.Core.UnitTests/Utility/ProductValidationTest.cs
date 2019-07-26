using System.Collections.Generic;

using AutoFixture;

using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Service.Core.UnitTests.Utility
{
    [TestFixture]
    public class ProductValidationTest
    {
        private IProductValidation _productValidation;
        private ISessionService _sessionService;
        private IProductService _productService;
        private Fixture _fixture = new Fixture();

        [SetUp]
        public void Setup()
        {
            _sessionService = Substitute.For<ISessionService>();
            _fixture.Register<IMetaModelProductCodeList>(() =>
            _fixture.Create<BaseReportMetaModel>());
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = 1 });
            _productService = Substitute.For<IProductService>();
            _productValidation = new ProductValidation(_productService, _sessionService);
        }

        [TearDown]
        public void TearDown()
        {
            _productValidation = null;
            _sessionService = null;
            _productService = null;
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            _fixture = null;
        }

        [Test]
        public void IsValid_NullModel_ReturnFalse()
        {
            //Arrange
            var option = new ProductValidationOption { FunctionConfig = "winloss" };
            //Action
            var result = _productValidation.IsValid(null, option);

            //Assert

            Assert.IsFalse(result);
        }

        [TestCase(null)]
        [TestCase("")]
        public void IsValid_NullOrEmptyFunctionKey_ReturnFalse(string functionKey)
        {
            //Arrange
            var option = new ProductValidationOption { FunctionConfig = functionKey };

            var model = _fixture.Create<IMetaModelProductCodeList>();
            //Action
            var result = _productValidation.IsValid(model, option);

            //Assert

            Assert.IsFalse(result);
        }

        [TestCase("", false)]
        [TestCase("SB", true)]
        [TestCase("SB,AG", false)]
        public void IsValid_ProductCodeList_ReturnCorrectResult(string productCodeList, bool expectedValue)
        {
            //Arrange
            var model = new BaseReportMetaModel { ProductCodeList = productCodeList };
            var option = new ProductValidationOption { FunctionConfig = "winloss" };
            _sessionService.UserSession.Returns(new UserAuthInfo { Language = "en-US" });
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = 1 });
            _productService.GetProductAccess(Arg.Any<int>(), Arg.Any<string>(), Arg.Any<string>())
                .Returns(new ProductAccess(new List<Product> { new Product { ProductCode = "SB" } }));
            //Action
            var result = _productValidation.IsValid(model, option);

            //Assert

            Assert.AreEqual(expectedValue, result);
        }

        [TestCase("", false)]
        [TestCase("SB", true)]
        [TestCase("SB,AG", false)]
        public void IsValid_SingleWallerProductList_ReturnCorrectResult(string productCodeList, bool expectedValue)
        {
            //Arrange
            var model = new BaseReportMetaModel { ProductCodeList = productCodeList };
            var option = new ProductValidationOption { FunctionConfig = "winloss", IsSingleWallet = true };
            _sessionService.UserSession.Returns(new UserAuthInfo { Language = "en-US" });
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = 1 });
            _productService.GetSingleWalletProductAccess(Arg.Any<int>(), Arg.Any<string>(), Arg.Any<string>())
                .Returns(new ProductAccess(new List<Product> { new Product { ProductCode = "SB" } }));
            //Action
            var result = _productValidation.IsValid(model, option);

            //Assert

            Assert.AreEqual(expectedValue, result);
        }

        [TestCase(", ,,")]
        public void IsValid_InValidProductCodeList_ReturnFalse(string productCodeList)
        {
            //Arrange
            var model = new BaseReportMetaModel { ProductCodeList = productCodeList };
            var option = new ProductValidationOption { FunctionConfig = "winloss" };

            //Action
            var result = _productValidation.IsValid(model, option);

            //Assert

            Assert.IsFalse(result);
        }
    }
}