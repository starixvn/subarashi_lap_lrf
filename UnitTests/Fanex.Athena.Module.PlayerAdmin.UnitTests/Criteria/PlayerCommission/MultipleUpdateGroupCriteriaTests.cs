using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Criteria.PlayerCommission
{
    [TestFixture]
    public class MultipleUpdateGroupCriteriaTests
    {
        private MultipleUpdateGroupCriteria criteria;
        private MultipleUpdateGroupQuery query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<MultipleUpdateGroupQuery>();
            query.Permissions = new Dictionary<string, bool>
            {
                ["SB"] = false,
                ["AB"] = true
            };

            query.Products = new[] { "SB", "AB" };
            query.Comms = new[] { (decimal)0, (decimal)1 };

            criteria = new MultipleUpdateGroupCriteria(query);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            criteria = null;
        }

        [Test]
        public void Constructor_Always_AssignQueryValues()
        {
            // Assert
            Assert.AreEqual(query.Comms, criteria.Comms);
        }

        [Test]
        public void GetSPName_Always_ReturnCorrectValue()
        {
            // Action
            var result = criteria.GetSPName();

            // Assert
            Assert.AreEqual("Lrf_LicenseeCustCommUpd", result);
        }

        [TestCase(true)]
        [TestCase(false)]
        public void SetParameterValues_Always_SetValueToDB(bool isRemovePlayerComm)
        {
            // Arrange
            var db = Substitute.For<IObjectDb>();

            // Action
            criteria.SetParameterValues(db);

            // Assert
            db.Received().SetParameterValue("IsUpdateAllbet", true);
            db.SetParameterValue("SBComm", criteria.Comms[0]);
        }
    }
}
