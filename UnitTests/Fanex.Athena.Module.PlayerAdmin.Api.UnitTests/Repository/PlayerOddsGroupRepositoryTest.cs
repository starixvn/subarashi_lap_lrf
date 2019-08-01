using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Repository
{
    [TestFixture]
    public class PlayerOddsGroupRepositoryTest : BaseDataAccessHelperTest<PlayerOddsGroupRepository>
    {
        [Test]
        public void Update_WhenCall_AssignCorrectParam()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_CustomerUpdUgroup")).Returns(ObjectDb);
            var metaModel = new OddsGroupUpdatingMetaModel
            {
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                OddsGroup = "C"
            };

            // Action
            var result = DataAccess.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("UserId", metaModel.UserId);
                ObjectDb.Received(1).SetParameterValue("CustId", metaModel.CustId);
                ObjectDb.Received(1).SetParameterValue("OddsGroup", metaModel.OddsGroup);
                ObjectDb.Received(1).SetParameterValue("IP", metaModel.Ip);
                ObjectDb.Received(1).SetParameterValue("Langkey", metaModel.Language);
                ObjectDb.Received(1).SetParameterValue("ErrCode", null);
                ObjectDb.Received(1).SetParameterValue("ErrMsg", null);

                ObjectDb.Received(1).ExecuteNonQuery();

                Assert.That(result, Is.Not.Null);
            });
        }
    }
}