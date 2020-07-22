using System;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.ViewModels.PlayerDetailTransaction
{
    [TestFixture]
    public class PlayerDetailTransactionReportViewModelTests
    {
        private PlayerDetailTransactionReportViewModel model;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            model = new PlayerDetailTransactionReportViewModel();
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            model = null;
        }

        [Test]
        public void FromDateStr_Always_ReturnCorrectValue()
        {
            // Arrange 
            model.FromDate = new DateTime(2020, 4, 29, 1, 1, 1);

            // Action
            var actualData = model.FromDateStr;

            // Assert
            Assert.AreEqual("04/29/2020", actualData);
        }

        [Test]
        public void ToDateStr_Always_ReturnCorrectValue()
        {
            // Arrange 
            model.ToDate = new DateTime(2020, 4, 30, 1, 1, 1);

            // Action
            var actualData = model.ToDateStr;

            // Assert
            Assert.AreEqual("04/30/2020", actualData);
        }

        [Test]
        public void Constructor_NoDataCriteria_SetCorrectValue()
        {
            // Arrange 
            var criteria = new PlayerDetailTransactionsMetaModel();
            criteria.FromDate = new DateTime(2020, 4, 30, 1, 1, 1);

            // Action
            var viewModel = new PlayerDetailTransactionReportViewModel(criteria, null);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(criteria.FromDate, viewModel.FromDate);
                Assert.AreEqual(500, viewModel.PageSize);
                Assert.AreEqual(1, viewModel.PageIndex);
            });
        }

        [Test]
        public void Constructor_HasDataCriteria_SetCorrectValue()
        {
            // Arrange 
            var criteria = new PlayerDetailTransactionsMetaModel();
            criteria.FromDate = new DateTime(2020, 4, 30, 1, 1, 1);
            criteria.PageIndex = 2;
            criteria.PageSize = 100;

            // Action
            var viewModel = new PlayerDetailTransactionReportViewModel(criteria, null);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(criteria.FromDate, viewModel.FromDate);
                Assert.AreEqual(100, viewModel.PageSize);
                Assert.AreEqual(2, viewModel.PageIndex);
            });
        }
    }
}
