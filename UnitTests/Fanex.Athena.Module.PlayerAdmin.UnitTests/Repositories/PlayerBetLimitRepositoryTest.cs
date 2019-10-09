using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.Repositories;
using Fanex.Athena.UnitTest.Common.Helpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repositories
{
    public class PlayerBetLimitRepositoryTest
    {
        private IDbFactory _db;
        private IObjectDb _objectDb;

        [SetUp]
        public void SetUp()
        {
            _db = Substitute.For<IDbFactory>();
            _objectDb = Substitute.For<IObjectDb>();
        }

        [TearDown]
        public void TearDown()
        {
            _db = null;
            _objectDb = null;
        }

        [Test]
        public async Task GetEnableBetLimitProducts_WhenCall_AssignCorrectParamAndReturnCorrectData()
        {
            // Arrange
            const string UspName = "Lrf_LicenseeProductByBetLimitSel";
            var reader = Substitute.For<IDataReader>();
            reader.Read().Returns(true, true, false);
            var betLimitProductItem = FakeHelper.Create<PlayerBetLimitProduct>();
            FakeBetLimitProduct(reader, betLimitProductItem);

            _objectDb.ExecuteReaderAsync().Returns(reader);
            _db.GetObjectDb(UspName).Returns(_objectDb);

            const string SiteName = "SiteName";
            var repository = new PlayerBetLimitRepository(_db);

            // Action
            var result = await repository.GetEnableBetLimitProducts(SiteName);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Count(), Is.EqualTo(1));

                _objectDb.Received(1).SetParameterValue("LicenseeName", SiteName);
            });
        }

        private static void FakeBetLimitProduct(IDataReader reader, PlayerBetLimitProduct expectedBetLimitProduct)
        {
            reader["IsEnable"].Returns(true, true, false);
            reader["ProductID"].Returns(expectedBetLimitProduct.ProductId);
            reader["ProductCode"].Returns(expectedBetLimitProduct.ProductCode);
        }
    }
}