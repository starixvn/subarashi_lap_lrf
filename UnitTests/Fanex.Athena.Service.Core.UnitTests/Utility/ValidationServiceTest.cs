using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Core.MetaModel.Product;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using Fanex.Athena.Session.Model;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Fanex.Athena.Service.Core.UnitTests.Utility
{
    [TestFixture]
    public class ValidationServiceTest
    {
        private IValidationService _validationService;
        private ISessionService _sessionService;
        private IMetaModelValidation _metaModelValidation;

        [SetUp]
        public void Setup()
        {
            _sessionService = Substitute.For<ISessionService>();

            _sessionService.UserSession.Returns(new UserSession
            {
                CurrencyList = new Dictionary<int, string> { { 1, "USD" }, { 2, "EUR" }, { 4, "IDR" } }
            });
            _sessionService.LicenseeSession.Returns(new LicenseeSession { LicenseeId = 1 });
            _validationService = new ValidationService(_sessionService);
            _metaModelValidation = Substitute.For<IMetaModelValidation>();
        }

        [TearDown]
        public void TearDown()
        {
            _validationService = null;
            _sessionService = null;
            _metaModelValidation = null;
        }

        [Test]
        public void IsValid_NullModel_ReturnFalse()
        {
            //Arrange
            var option = new ValidationMetaModelOption();
            //Action
            var result = _validationService.IsValid(option, null);

            //Assert
            Assert.IsFalse(result);
        }

        [Test]
        public void IsValid_NullOption_ReturnFalse()
        {
            //Arrange

            //Action
            var result = _validationService.IsValid(null, _metaModelValidation);

            //Assert
            Assert.IsFalse(result);
        }

        [TestCase(true)]
        [TestCase(true)]
        public void IsValid_ByMetaModelValidation_ReturnExpectedResult(
            bool expected)
        {
            //Arrange
            var option = new ValidationMetaModelOption();
            _metaModelValidation.IsValid.Returns(expected);

            //Action

            var result = _validationService.IsValid(option, _metaModelValidation);
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
            var option = new ValidationMetaModelOption { IsValidCurrency = true };
            var model = new BaseMetaModel { CurrencyId = currencyId, BaseCurrency = "USD" };

            //Action

            var result = _validationService.IsValid(option, model);
            //Assert
            Assert.AreEqual(result, expected);
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
            _sessionService.LicenseeSession.Returns(new LicenseeSession { LicenseeId = licenseeId });
            var option = new ValidationMetaModelOption { IsValidCurrency = true, IsIncludeKeanOcean = true };
            var model = new BaseMetaModel { CurrencyId = currencyId, BaseCurrency = "USD" };
            //Action

            var result = _validationService.IsValid(option, model);
            //Assert
            Assert.AreEqual(result, expected);
        }

        [TestCase("", true, true)]
        [TestCase("", false, false)]
        [TestCase("usd", false, true)]
        [TestCase("KKK", false, false)]
        public void IsValidBaseCurrency_WhenCalled_ReturnCorrectResult(
            string baseCurrency,
           bool isAllowEmpty,
            bool expectedValue)
        {
            //Arrange

            //Action

            var result = _validationService.IsValidBaseCurrency(baseCurrency, isAllowEmpty);
            //Assert
            Assert.AreEqual(result, expectedValue);
        }

        [TestCase(CurrencyType.Cny, LicenseeIdentity.KeenOcean, true)]
        [TestCase(CurrencyType.Cny, LicenseeIdentity.OneTwoBet, false)]
        [TestCase(100, 1, false)]
        [TestCase(2, 1, true)]
        public void IsValidCurrency_WhenCalled_ReturnCorrectResult(
            int currency,
            int licenseeId,
            bool expectedValue)
        {
            //Arrange
            _sessionService.LicenseeSession.Returns(new LicenseeSession { LicenseeId = licenseeId });

            //Action

            var result = _validationService.IsValidCurrency(currency, true);
            //Assert
            Assert.AreEqual(result, expectedValue);
        }
    }
}
