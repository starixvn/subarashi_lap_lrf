using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Repository
{
    [TestFixture]
    public class PlayerSpecialLevelServiceTest
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
            _dbFactory.GetObjectDb("Lrf_CustomerUpdSpecialLevel").Returns(objectDb);
            var metaModel = new SpecialLevelUpdatingMetaModel
            {
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                SpecialLevel = 3
            };
            var service = new PlayerSpecialLevelService(_dbFactory);

            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("userid", metaModel.UserId);
                objectDb.Received(1).SetParameterValue("custid", metaModel.CustId);
                objectDb.Received(1).SetParameterValue("speciallevel", metaModel.SpecialLevel);
                objectDb.Received(1).SetParameterValue("ip", metaModel.Ip);
                objectDb.Received(1).SetParameterValue("langkey", metaModel.Language);
                objectDb.Received(1).SetParameterValue("ErrCode", null);
                objectDb.Received(1).SetParameterValue("ErrMsg", null);

                objectDb.Received(1).ExecuteNonQuery();

                Assert.That(result, Is.Not.Null);
            });
        }
    }
}