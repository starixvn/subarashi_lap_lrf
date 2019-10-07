using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services;
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
        public void Update_WhenCall_AssignCorrectParam()
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

            var logUserControlDataAccess = Substitute.For<ILogUserControlDataAccess>();

            var service = new PlayerBaStatusService(_dbFactory, logUserControlDataAccess);
            var expectedLogContent = $"LAP - {metaModel.SiteName} - {LogActionId.PlayerAdminActionDetailUpdateBA} - Success - ON - OFF";

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

                logUserControlDataAccess.Received(1).Write(metaModel.CustId, metaModel.UserId, LogActionId.PlayerAdminUpdateBAStatus, expectedLogContent);
            });
        }
    }
}