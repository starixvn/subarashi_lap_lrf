using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.DataDomains;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.Service.StatelessCore.Interfaces;
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
        public void Update_WhenCall_AssignCorrectParamAndWriteLog()
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
                SpecialLevel = 3,
                SiteName = "sitenametest",
                OldValue = "1",
                LicenseeCustId = 11
            };
            var businessLogService = Substitute.For<IBusinessLogService>();
            var service = new PlayerSpecialLevelService(_dbFactory, businessLogService);

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

                businessLogService.Received(1).Write(BusinessLogType.CustomerUpdateSpecialLevel,
                    Arg.Is<PlayerUpdatingLogMetaModel>(x => x.CustId == metaModel.CustId && x.UserId == metaModel.UserId &&
                    x.ActionId == LogActionId.PlayerAdminUpdateSpecialLevel && x.ActionDetailId == LogActionDetailId.UpdatingSpecialLevel &&
                    x.SiteName == metaModel.SiteName && x.OldValue == metaModel.OldValue && x.LicenseeCustId == metaModel.LicenseeCustId));
            });
        }
    }
}