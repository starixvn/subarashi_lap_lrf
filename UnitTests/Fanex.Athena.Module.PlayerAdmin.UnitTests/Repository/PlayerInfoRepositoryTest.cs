namespace Fanex.Athena.Module.PlayerAdmin.UnitTests.Repository
{
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
    using Fanex.Athena.Module.PlayerAdmin.Repository;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using NSubstitute;
    using NUnit.Framework;

    public class PlayerInfoRepositoryTest : BaseDataAccessHelperTest<PlayerInfoRepository>
    {
        [Test]
        public async Task GetPlayerInfoAsync_WhenCall_PassCorrectParameter()
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_PlayerAdmin_GetPlayerInfo")).Returns(ObjectDb);
            var custId = FakeHelper.Create<int>();

            // Action
            var result = await DataAccess.GetPlayerInfoAsync(custId);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("custid", custId);
            });
        }
    }
}
