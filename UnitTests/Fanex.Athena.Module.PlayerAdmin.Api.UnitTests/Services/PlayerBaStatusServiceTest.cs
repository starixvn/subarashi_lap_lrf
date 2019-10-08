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
    public class PlayerBaStatusServiceTest
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
            _dbFactory.GetObjectDb(Arg.Is("Lrf_CustomerUpdMemberBAStatus")).Returns(objectDb);
            var metaModel = new BaStatusUpdatingMetaModel
            {
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                IsBa = true,
                SiteName = "testsite"
            };
            const string ExpectedOddsGroup = "C";
            objectDb.GetParameterValue("OddsGroup").Returns(ExpectedOddsGroup);
            objectDb.GetParameterValue("ErrCode").Returns(0);

            var businessLogService = Substitute.For<IBusinessLogService>();

            var service = new PlayerBaStatusService(_dbFactory, businessLogService);
            // Action
            var result = service.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                objectDb.Received(1).SetParameterValue("LicenseeName", metaModel.SiteName);
                objectDb.Received(1).SetParameterValue("ModifyBy", metaModel.UserId);
                objectDb.Received(1).SetParameterValue("CustID", metaModel.CustId);
                objectDb.Received(1).SetParameterValue("IsBA", metaModel.IsBa);
                objectDb.Received(1).SetParameterValue("IP", metaModel.Ip);
                objectDb.Received(1).SetParameterValue("langkey", metaModel.Language);
                objectDb.Received(1).SetParameterValue("OddsGroup", null);
                objectDb.Received(1).SetParameterValue("ErrCode", null);
                objectDb.Received(1).SetParameterValue("ErrMsg", null);

                objectDb.Received(1).ExecuteNonQuery();

                Assert.That(result.ExtendedData, Is.EqualTo(ExpectedOddsGroup));

                businessLogService.Received(1).Write(BusinessLogType.CustomerUpdateBA,
                    Arg.Is<PlayerUpdatingLogMetaModel>(x => x.CustId == metaModel.CustId && x.UserId == metaModel.UserId &&
                    x.ActionId == LogActionId.PlayerAdminUpdateBAStatus && x.ActionDetailId == LogActionDetailId.UpdatingBA));
            });
        }
    }
}