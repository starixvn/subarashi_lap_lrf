using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Services;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Services
{
    [TestFixture]
    public class PlayerDetailTransactionServiceTests
    {
        private IPlayerDetailTransactionRepository repository;
        private PlayerDetailTransactionService service;

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            repository = Substitute.For<IPlayerDetailTransactionRepository>();
            service = new PlayerDetailTransactionService(repository);
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            repository = null;
            service = null;
        }

        [Test]
        public void GetAllCommGroups_Always_GetData()
        {
            // Arrange
            var query = new PlayerDetailTransactionsMetaModel();
            var model = new PlayerDetailTransactionReportViewModel();
            repository.GetDetailTransactions(query).Returns(model);

            // Action
            var actualData = service.GetDetailTransactionReport(query).GetAwaiter().GetResult();

            // Assert
            Assert.AreEqual(model, actualData);
        }
    }
}
