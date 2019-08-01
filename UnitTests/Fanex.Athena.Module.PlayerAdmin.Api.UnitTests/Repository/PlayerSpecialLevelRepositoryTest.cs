using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Module.PlayerAdmin.Api.UnitTests.Repository
{
    [TestFixture]
    public class PlayerSpecialLevelRepositoryTest : BaseDataAccessHelperTest<PlayerSpecialLevelRepository>
    {
        [Test]
        public void Update_WhenCall_AssignCorrectParam()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_CustomerUpdSpecialLevel")).Returns(ObjectDb);
            var metaModel = new SpecialLevelUpdatingMetaModel
            {
                UserId = 1,
                CustId = 2,
                Ip = "127.0.0.1",
                Language = "en-US",
                SpecialLevel = 3
            };

            // Action
            var result = DataAccess.Update(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("userid", metaModel.UserId);
                ObjectDb.Received(1).SetParameterValue("custid", metaModel.CustId);
                ObjectDb.Received(1).SetParameterValue("speciallevel", metaModel.SpecialLevel);
                ObjectDb.Received(1).SetParameterValue("ip", metaModel.Ip);
                ObjectDb.Received(1).SetParameterValue("langkey", metaModel.Language);
                ObjectDb.Received(1).SetParameterValue("ErrCode", null);
                ObjectDb.Received(1).SetParameterValue("ErrMsg", null);

                ObjectDb.Received(1).ExecuteNonQuery();

                Assert.That(result, Is.Not.Null);
            });
        }
    }
}