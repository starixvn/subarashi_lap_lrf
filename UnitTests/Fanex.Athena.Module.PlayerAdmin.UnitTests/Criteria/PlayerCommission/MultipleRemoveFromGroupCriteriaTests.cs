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
    public class MultipleRemoveFromGroupCriteriaTests
    {
        private MultipleRemoveFromGroupCriteria criteria;
        private MultipleRemoveFromGroupQuery query;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            query = FakeHelper.Create<MultipleRemoveFromGroupQuery>();
            query.Permissions = new Dictionary<string, bool>
            {
                ["SB"] = false,
                ["AB"] = true
            };

            criteria = new MultipleRemoveFromGroupCriteria(query);
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
            Assert.AreEqual(query.IsRemovePlayerComm, criteria.IsRemovePlayerComm);
        }

        [Test]
        public void GetSPName_Always_ReturnCorrectValue()
        {
            // Action
            var result = criteria.GetSPName();

            // Assert
            Assert.AreEqual("Lrf_CustomerRemoveGroupComm", result);
        }

        [TestCase(true)]
        [TestCase(false)]
        public void SetParameterValues_Always_SetValueToDB(bool isRemovePlayerComm)
        {
            // Arrange
            criteria.IsRemovePlayerComm = isRemovePlayerComm;
            var db = Substitute.For<IObjectDb>();

            // Action
            criteria.SetParameterValues(db);

            // Assert
            db.Received().SetParameterValue("IsRemovePlayercomm", isRemovePlayerComm);
        }
    }
}
