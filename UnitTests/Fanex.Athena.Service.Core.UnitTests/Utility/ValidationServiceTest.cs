using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Service.Core.UnitTests.Utility
{
    [TestFixture]
    public class ValidationServiceTest
    {
        private IValidationService _validationService;
        private IMetaModelValidation _metaModelValidation;
        private ICurrencyValidation _currencyValidation;
        private IProductValidation _productValidation;

        [SetUp]
        public void Setup()
        {
            _productValidation = Substitute.For<IProductValidation>();
            _currencyValidation = Substitute.For<ICurrencyValidation>();
            _validationService = new ValidationService(_currencyValidation, _productValidation);
            _metaModelValidation = Substitute.For<IMetaModelValidation>();
        }

        [TearDown]
        public void TearDown()
        {
            _validationService = null;
            _currencyValidation = null;
            _metaModelValidation = null;
        }

        [Test]
        public void IsValid_NullModel_ReturnFalse()
        {
            //Arrange

            //Action
            var result = _validationService.IsValid(null);

            //Assert
            Assert.IsFalse(result);
        }

        [TestCase(true)]
        [TestCase(true)]
        public void IsValid_ByMetaModelValidation_ReturnExpectedResult(
            bool expected)
        {
            //Arrange
            _metaModelValidation.IsValid.Returns(expected);

            //Action

            var result = _validationService.IsValid(_metaModelValidation);
            //Assert
            Assert.AreEqual(result, expected);
        }

        [TestCase(1, true)]
        [TestCase(0, true)]
        [TestCase(100, false)]
        [TestCase(-5, true)]
        [TestCase(-100, false)]
        public void IsValid_ByCurrencyValidation_ReturnExpectedResult(int currencyId,
          bool expected)
        {
            //Arrange
            var option = new CurrencyValidationOption { IsValidCurrency = true };
            var model = new BaseMetaModel { CurrencyId = currencyId, BaseCurrency = "USD" };
            _currencyValidation.IsValidCurrency(currencyId).Returns(expected);
            //Action

            var result = _validationService.IsValid(model, option);
            //Assert
            Assert.AreEqual(result, expected);
            _currencyValidation.Received(1).IsValidCurrency(currencyId);
        }

        [TestCase(CurrencyType.Cny, LicenseeIdentity.KeenOcean, true)]
        [TestCase(CurrencyType.Cny, LicenseeIdentity.OneTwoBet, false)]
        [TestCase(100, 1, false)]
        [TestCase(2, 1, true)]
        public void IsValid_ByCurrencyValidationWithKeanOcean_ReturnExpectedResult(int currencyId,
            int licenseeId,
        bool expected)
        {
            //Arrange
            var option = new CurrencyValidationOption { IsValidCurrency = true, IsIncludeKeanOcean = true };
            var model = new BaseMetaModel { CurrencyId = currencyId, BaseCurrency = "USD" };
            _currencyValidation.IsValidCurrency(currencyId, true).Returns(expected);

            //Action

            var result = _validationService.IsValid(model, option);
            //Assert
            Assert.AreEqual(result, expected);
            _currencyValidation.Received(1).IsValidCurrency(currencyId, true);
        }

        [Test]
        public void IsValid_ByCurrencyList_ReturnExpectedResult()
        {
            //Arrange
            const string currencyIdList = "1,2";
            var option = new CurrencyValidationOption { IsValidCurrencyList = true };
            var model = new BaseBettingTicketMetaModel { CurrencyIdList = currencyIdList };
            _currencyValidation.IsValidCurrency(Arg.Any<string>()).Returns(true);

            //Action
            _validationService.IsValid(model, option);
            //Assert
            _currencyValidation.Received(1).IsValidCurrency(currencyIdList);
        }

        [Test]
        public void IsValid_ByProduct_HavingCallProducationValidation()
        {
            //Arrange
            const string functionKey = "winloss";
            var option = new ProductValidationOption { IsValidProductCodeList = true, FunctionConfig = functionKey };
            var model = new CasinoTurnoverMetaModel { ProductCodeList = "SB", BaseCurrency = "USD", Status = new[] { 1 } };
            _productValidation.IsValid(Arg.Any<IMetaModelProductCodeList>(), Arg.Any<ProductValidationOption>()).Returns(true);
            //Action
            _validationService.IsValid(model, null, option);
            //Assert
            _productValidation.Received(1).IsValid(model, option);
        }
    }
}