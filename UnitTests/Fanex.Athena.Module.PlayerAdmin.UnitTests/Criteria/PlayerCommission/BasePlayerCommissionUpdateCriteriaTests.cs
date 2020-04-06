using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Criteria.PlayerCommission
{
    [TestFixture]
    public class BasePlayerCommissionUpdateCriteriaTests
    {
        private BasePlayerCommissionUpdateCriteria criteria;
        private BasePlayerCommissionUpdateQuery query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<BasePlayerCommissionUpdateQuery>();
            criteria = new BasePlayerCommissionUpdateCriteria(query);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            criteria = null;
        }

        [Test]
        public void Constructor_Always_AssignQueryValues()
        {
            Assert.AreEqual(query.CustIds, criteria.CustIds);
        }

        [Test]
        public void SetParameterValues_Always_SetValueToDB()
        {
            // Arrange
            var db = Substitute.For<IObjectDb>();

            // Action
            criteria.SetParameterValues(db);

            // Assert
            db.Received().SetParameterValue("LicenseeId", query.LicenseeId);
        }

        [Test]
        public void GetSPName_Always_ReturnCorrectValue()
        {
            // Action
            var result = criteria.GetSPName();

            // Assert
            Assert.AreEqual("", result);
        }
    }
}
