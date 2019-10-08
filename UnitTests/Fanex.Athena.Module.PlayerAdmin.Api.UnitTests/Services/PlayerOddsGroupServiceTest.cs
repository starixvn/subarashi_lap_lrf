using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.DataDomains;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
using Fanex.Athena.Service.StatelessCore.Interfaces;
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
        public void Update_WhenCall_AssignCorrectParamAndWriteLog()
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
                OddsGroup = "C",
                SiteName = "sitenametest",
                OldValue = "A",
                LicenseeCustId = 11
            };
            var businessLogService = Substitute.For<IBusinessLogService>();
            var service = new PlayerOddsGroupService(_dbFactory, businessLogService);

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

                businessLogService.Received(1).Write(BusinessLogType.CustomerUpdateOddsGroup,
                    Arg.Is<PlayerUpdatingLogMetaModel>(x => x.CustId == metaModel.CustId && x.UserId == metaModel.UserId &&
                    x.ActionId == LogActionId.PlayerAdminUpdateOddsGroup && x.ActionDetailId == LogActionDetailId.UpdatingOddsGroup &&
                    x.SiteName == metaModel.SiteName && x.OldValue == metaModel.OldValue && x.LicenseeCustId == metaModel.LicenseeCustId));
            });
        }
    }
}