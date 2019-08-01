using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Repository
{
    [TestFixture]
    public class PlayerBaStatusRepositoryTest : BaseDataAccessHelperTest<PlayerBaStatusRepository>
    {
        [Test]
        public void Update_WhenCall_AssignCorrectParam()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_CustomerUpdMemberBAStatus")).Returns(ObjectDb);
            var metaModel = new BaStatusUpdatingMetaModel
            {
                LicenseeId = 1,
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                IsBa = true
            };
            const string ExpectedOddsGroup = "C";
            ObjectDb.GetParameterValue("OddsGroup").Returns(ExpectedOddsGroup);

            // Action
            var result = DataAccess.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("ModifyBy", metaModel.UserId);
                ObjectDb.Received(1).SetParameterValue("CustID", metaModel.CustId);
                ObjectDb.Received(1).SetParameterValue("LicenseeID", metaModel.LicenseeId);
                ObjectDb.Received(1).SetParameterValue("IsBA", metaModel.IsBa);
                ObjectDb.Received(1).SetParameterValue("IP", metaModel.Ip);
                ObjectDb.Received(1).SetParameterValue("langkey", metaModel.Language);
                ObjectDb.Received(1).SetParameterValue("OddsGroup", null);
                ObjectDb.Received(1).SetParameterValue("ErrCode", null);
                ObjectDb.Received(1).SetParameterValue("ErrMsg", null);

                ObjectDb.Received(1).ExecuteNonQuery();

                Assert.That(result.ExtendedData, Is.EqualTo(ExpectedOddsGroup));
            });
        }
    }
}