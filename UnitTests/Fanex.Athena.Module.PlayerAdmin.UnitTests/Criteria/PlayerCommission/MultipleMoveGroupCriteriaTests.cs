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
    public class MultipleMoveGroupCriteriaTests
    {
        private MultipleMoveGroupCriteria criteria;
        private MultipleMoveGroupQuery query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<MultipleMoveGroupQuery>();
            query.Permissions = new Dictionary<string, bool>
            {
                ["SB"] = false,
                ["AB"] = true
            };

            criteria = new MultipleMoveGroupCriteria(query);
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
            Assert.AreEqual(query.GroupCommId, criteria.GroupCommId);
        }

        [Test]
        public void GetSPName_Always_ReturnCorrectValue()
        {
            // Action
            var result = criteria.GetSPName();

            // Assert
            Assert.AreEqual("Lrf_CustomerMoveGroupComm", result);
        }

        [Test]
        public void SetParameterValues_Always_SetValueToDB()
        {
            // Arrange
            var db = Substitute.For<IObjectDb>();

            // Action
            criteria.SetParameterValues(db);

            // Assert
            db.Received().SetParameterValue("GroupCommId", query.GroupCommId);
        }
    }
}
