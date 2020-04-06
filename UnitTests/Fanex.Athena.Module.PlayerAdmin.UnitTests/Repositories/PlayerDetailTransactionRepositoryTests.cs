using System.Linq;
using Alpha.Reports.Tests.Database.WinLossDetail;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Repositories;
using Fanex.Athena.VendorAdapter.Interfaces;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repositories
{
    [TestFixture]
    public class PlayerDetailTransactionRepositoryTests
    {
        private IObjectDb objectDb;
        private PlayerDetailTransactionRepository repository;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            var dbFactory = Substitute.For<IDbFactory>();
            var cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            repository = new PlayerDetailTransactionRepository(dbFactory, cacheRefAdapter);

            objectDb = Substitute.For<IObjectDb>();
            dbFactory.GetObjectDb(Arg.Any<string>()).Returns(objectDb);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            repository = null;
        }

        [Test]
        public void GetDetailTransactions_HasData_ReturnCorrectValue()
        {
            // Arrange
            var criteria = new PlayerDetailTransactionsMetaModel();
            var dataSet = PlayerDetailTransactionDatabase.DetailTransaction.CreateDataReader();
            objectDb.ExecuteReaderAsync().Returns(dataSet);

            // Action
            var actualData = repository.GetDetailTransactions(criteria).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(1, actualData.DetailTransactions.Count());
        }
    }
}
