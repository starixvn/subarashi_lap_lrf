using System.Collections.Generic;
using System.Linq;
using Alpha.Reports.Tests.Database.WinLossDetail;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Repositories;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repositories
{
    [TestFixture]
    public class PlayerCommissionRepositoryTests
    {
        private IObjectDb objectDb;
        private PlayerCommissionRepository repository;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            var dbFactory = Substitute.For<IDbFactory>();
            repository = new PlayerCommissionRepository(dbFactory);

            objectDb = Substitute.For<IObjectDb>();
            dbFactory.GetObjectDb(Arg.Any<string>()).Returns(objectDb);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            repository = null;
        }

        [Test]
        public void GetAllCommGroups_HasData_ReturnCorrectValue()
        {
            // Arrange
            var query = new BasePlayerCommissionUpdateQuery();
            var criteria = new GetAllCommGroupsCriteria(query);
            criteria.Permissions = new Dictionary<string, bool>();
            var dataSet = PlayerCommissionDatabase.CommGroups.CreateDataReader();
            objectDb.ExecuteReader().Returns(dataSet);

            // Action
            var actualData = repository.GetAllCommGroups(criteria);

            // Assert
            Assert.AreEqual(2, actualData.Count());
        }

        [Test]
        public void GetCommissionGroupById_HasData_ReturnCorrectValue()
        {
            // Arrange
            var query = new MultipleMoveGroupQuery();
            var criteria = new GetCommissionGroupByIdCriteria(query);
            criteria.Permissions = new Dictionary<string, bool>();
            var dataSet = PlayerCommissionDatabase.CommGroupById.CreateDataReader();
            objectDb.ExecuteReader().Returns(dataSet);

            // Action
            var actualData = repository.GetCommissionGroupById(criteria);

            // Assert
            Assert.AreEqual(1, actualData.GroupCommId);
        }

        [Test]
        public void GetPlayerCommissionGroup_HasData_ReturnCorrectValue()
        {
            // Arrange
            var query = new SingleMoveGroupQuery();
            var criteria = new GetPlayerCommissionGroupCriteria(query);
            criteria.Permissions = new Dictionary<string, bool>();
            var dataSet = PlayerCommissionDatabase.CommGroupById.CreateDataReader();
            objectDb.ExecuteReader().Returns(dataSet);

            // Action
            var actualData = repository.GetPlayerCommissionGroup(criteria);

            // Assert
            Assert.AreEqual(1, actualData.GroupCommId);
        }

        [Test]
        public void MultipleMoveGroupCriteria_Always_ReturnCorrectValue()
        {
            // Arrange
            var query = new MultipleMoveGroupQuery();
            var criteria = new MultipleMoveGroupCriteria(query);
            criteria.Permissions = new Dictionary<string, bool>();

            // Action
            var actualData = repository.MultipleMoveGroup(criteria).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, actualData.IsSuccessful);
        }

        [Test]
        public void MultipleRemoveFromGroup_Always_ReturnCorrectValue()
        {
            // Arrange
            var query = new MultipleRemoveFromGroupQuery();
            var criteria = new MultipleRemoveFromGroupCriteria(query);
            criteria.Permissions = new Dictionary<string, bool>();

            // Action
            var actualData = repository.MultipleRemoveFromGroup(criteria).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, actualData.IsSuccessful);
        }

        [Test]
        public void MultipleUpdateGroupCriteria_Always_ReturnCorrectValue()
        {
            // Arrange
            var query = new MultipleUpdateGroupQuery();
            query.Permissions = new Dictionary<string, bool>();
            var criteria = new MultipleUpdateGroupCriteria(query);
            criteria.Products = new string[] { };

            // Action
            var actualData = repository.MultipleUpdateGroup(criteria).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(true, actualData.IsSuccessful);
        }
    }
}
