using System;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.MetaModel
{
    public class PlayerDetailTransactionsMetaModelTests
    {
        private PlayerDetailTransactionsMetaModel query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<PlayerDetailTransactionsMetaModel>();
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            query = null;
        }

        [Test]
        public void IsValid_FromDateGreaterThanToDate_ReturnFalse()
        {
            // Arrange
            query.FromDate = DateTime.Now.AddDays(1);
            query.ToDate = DateTime.Now;

            // Action
            var actualValue = query.IsValid;

            // Assert
            Assert.AreEqual(false, actualValue);
        }

        [Test]
        public void IsValid_GapGreateThan3Months_ReturnFalse()
        {
            // Arrange
            query.FromDate = DateTime.Now.AddMonths(-4);
            query.ToDate = DateTime.Now;

            // Action
            var actualValue = query.IsValid;

            // Assert
            Assert.AreEqual(false, actualValue);
        }

        [Test]
        public void IsValid_CorrectValue_ReturnTrue()
        {
            // Arrange
            query.FromDate = DateTime.Now;
            query.ToDate = DateTime.Now;

            // Action
            var actualValue = query.IsValid;

            // Assert
            Assert.AreEqual(true, actualValue);
        }

        [Test]
        public void GetSPName_Always_ReturnCorrectValue()
        {
            // Action
            var actualValue = query.GetSPName();

            // Assert
            Assert.AreEqual("LAP_Rpt_DetailTransaction_Mem", actualValue);
        }

        [Test]
        public void SetParameterValues_Always_SetCorrectValue()
        {
            // Arrange
            var db = Substitute.For<IObjectDb>();
            query.CustId = 1;

            // Action
            query.SetParameterValues(db);

            // Assert
            db.Received().SetParameterValue("CustId", 1);
        }
    }
}
