using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Services
{
    [TestFixture]
    public class PlayerOddsGroupServiceTest
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
        public void Update_WhenCall_AssignCorrectParam()
        {
            // Arrange
            var objectDb = Substitute.For<IObjectDb>();
            _dbFactory.GetObjectDb("Lrf_CustomerUpdUgroup").Returns(objectDb);
            var metaModel = new OddsGroupUpdatingMetaModel
            {
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                OddsGroup = "C"
            };
            var service = new PlayerOddsGroupService(_dbFactory);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("UserId", metaModel.UserId);
                objectDb.Received(1).SetParameterValue("CustId", metaModel.CustId);
                objectDb.Received(1).SetParameterValue("OddsGroup", metaModel.OddsGroup);
                objectDb.Received(1).SetParameterValue("IP", metaModel.Ip);
                objectDb.Received(1).SetParameterValue("Langkey", metaModel.Language);
                objectDb.Received(1).SetParameterValue("ErrCode", null);
                objectDb.Received(1).SetParameterValue("ErrMsg", null);

                objectDb.Received(1).ExecuteNonQuery();

                Assert.That(result, Is.Not.Null);
            });
        }
    }
}