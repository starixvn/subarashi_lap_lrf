using System.Collections.Generic;

using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility;
using Fanex.Athena.Service.Core.Utility.Interfaces;

using NSubstitute;

using NUnit.Framework;

namespace Fanex.Athena.Service.Core.UnitTests.Utility
{
    [TestFixture]
    public class CurrencyValidationTest
    {
        private ICurrencyValidation _currencyValidation;
        private ISessionService _sessionService;

        [SetUp]
        public void Setup()
        {
            _sessionService = Substitute.For<ISessionService>();

            _sessionService.UserSession.Returns(new UserAuthInfo
            {
                CurrencyList = new Dictionary<int, string> { { 1, "USD" }, { 2, "EUR" }, { 4, "IDR" } }
            });
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = 1 });
            _currencyValidation = new CurrencyValidation(_sessionService);
        }

        [TearDown]
        public void TearDown()
        {
            _currencyValidation = null;
            _sessionService = null;
        }

        [TestCase(1, true)]
        [TestCase(0, true)]
        [TestCase(100, false)]
        [TestCase(-5, true)]
        [TestCase(-100, false)]
        public void IsValidCurrency_WhenCalled_ReturnExpectedResult(int currencyId,
          bool expected)
        {
            //Arrange

            //Action

            var result = _currencyValidation.IsValidCurrency(currencyId);
            //Assert
            Assert.AreEqual(result, expected);
        }

        [TestCase(CurrencyType.Cny, LicenseeIdentity.KeenOcean, true)]
        [TestCase(CurrencyType.Cny, LicenseeIdentity.OneTwoBet, false)]
        [TestCase(100, 1, false)]
        [TestCase(2, 1, true)]
        public void IsValidCurrency_WhenCallWithKeanOcean_ReturnExpectedResult(int currencyId,
            int licenseeId,
        bool expected)
        {
            //Arrange
            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = licenseeId });

            //Action

            var result = _currencyValidation.IsValidCurrency(currencyId, true);
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

            var result = _currencyValidation.IsValidBaseCurrency(baseCurrency, isAllowEmpty);
            //Assert
            Assert.AreEqual(result, expectedValue);
        }

        [TestCase(null, false)]
        [TestCase("", false)]
        [TestCase("1,2", true)]
        [TestCase("1,2,4", true)]
        [TestCase("1,10,4", false)]
        [TestCase("1,2,A", false)]
        [TestCase("1,2,-100", false)]
        public void IsValidCurrency_CurrencyList_ReturnCorrectResult(string currencyIdList, bool expectedValue)
        {
            //Arrange

            //Action
            var result = _currencyValidation.IsValidCurrency(currencyIdList);

            //Assert
            Assert.AreEqual(expectedValue, result);
        }
    }
}