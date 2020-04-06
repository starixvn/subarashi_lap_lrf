using System;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerDetailTransaction
{
    [TestFixture]
    public class PlayerDetailTransactionViewModelTests
    {
        private PlayerDetailTransactionViewModel model;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            model = new PlayerDetailTransactionViewModel();
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            model = null;
        }

        [Test]
        public void TransactionTimeStr_Always_ReturnCorrectValue()
        {
            // Arrange 
            model.TransactionTime = new DateTime(2020, 4, 29, 1, 1, 1);

            // Action
            var actualData = model.TransactionTimeStr;

            // Assert
            Assert.AreEqual("04/29/2020 01:01:01", actualData);
        }

        [TestCase(100.347, "+100.34")]
        [TestCase(100.343, "+100.34")]
        [TestCase(-100.347, "-100.34")]
        [TestCase(-100.00, "-100")]
        public void BalanceChangeStr_Always_ReturnCorrectValue(
            decimal value, string expectedValue)
        {
            // Arrange 
            model.BalanceChange = value;

            // Action
            var actualData = model.BalanceChangeStr;

            // Assert
            Assert.AreEqual(expectedValue, actualData);
        }

        [TestCase(100.347, "100.34")]
        [TestCase(100.343, "100.34")]
        [TestCase(-100.347, "-100.34")]
        [TestCase(-100.00, "-100.00")]
        public void AfterBalanceStr_Always_ReturnCorrectValue(
            decimal value, string expectedValue)
        {
            // Arrange 
            model.AfterBalance = value;

            // Action
            var actualData = model.AfterBalanceStr;

            // Assert
            Assert.AreEqual(expectedValue, actualData);
        }
    }
}
