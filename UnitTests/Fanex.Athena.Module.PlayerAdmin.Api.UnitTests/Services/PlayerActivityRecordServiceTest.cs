using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    public class PlayerActivityRecordServiceTest
    {
        private IDbFactory _dbFactory;

        [SetUp]
        public void SetUp()
        {
            _dbFactory = Substitute.For<IDbFactory>();
        }

        [TearDown]
        public void TearDown()
        {
            _dbFactory = null;
        }

        [Test]
        public void GetActivityRecord_WhenCall_AssignCorrectParam()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb("Lrf_CustomerLoginInfo").Returns(objectDb);
            var metaModel = new PlayerActivityRecordMetaModel
            {
                IbcCustId = 1,
                SiteName = "spondemo"
            };

            var service = new PlayerActivityRecordService(_dbFactory);

            // Action
            var result = service.GetActivityRecord(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("custid", metaModel.IbcCustId);
                objectDb.Received(1).SetParameterValue("siteName", metaModel.SiteName);
            });
        }

        [Test]
        public void GetActivityRecord_WhenCall_ReturnCorrectData()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb("Lrf_CustomerLoginInfo").Returns(objectDb);
            var metaModel = new PlayerActivityRecordMetaModel();
            var expectedResult = new PlayerActivityRecord();

            objectDb.QueryEntity<PlayerActivityRecord>().Returns(expectedResult);

            var service = new PlayerActivityRecordService(_dbFactory);

            // Action
            var result = service.GetActivityRecord(metaModel);

            // Assert
            Assert.That(result, Is.EqualTo(expectedResult));
        }
    }
}