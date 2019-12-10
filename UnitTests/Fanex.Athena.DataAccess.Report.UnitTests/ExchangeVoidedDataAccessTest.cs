using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Core.UnitTests.TestHelpers;
using Fanex.Data;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.DataAccess.Report.UnitTests
{
    [TestFixture]
    public class ExchangeVoidedDataAccessTest : BaseDataAccessHelperTest<ExchangeVoidedDataAccess>
    {
        private const string SPName = "Lrf_UserInfoByUserNameSel";

        [SetUp]
        public override void FixtureSetUp()
        {
            ObjectDb = Substitute.For<IObjectDb>();

            DataAccess = Substitute.ForPartsOf<ExchangeVoidedDataAccess>();
            DataAccess.GetObjectDb(Arg.Is(SPName)).Returns(ObjectDb);
        }

        [Test]
        public async Task GetCustIdAsync_WhenCall_ObjectDbIsCalledCorrectly()
        {
            // Arrange
            const string UserName = "Test";
            const string AgentList = "AgentList";

            // Action
            await DataAccess.GetCustIdAsync(UserName, AgentList);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("UserName", UserName);
                ObjectDb.Received().SetParameterValue("AgentList", AgentList);
                ObjectDb.Received().QueryEntityAsync<int>();
            });
        }
    }
}