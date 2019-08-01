namespace Fanex.Athena.DataAccess.Core.UnitTests.Users
{
    using Core.Users;

    using NSubstitute;

    using NUnit.Framework;

    using TestHelpers;

    public class AuthorizationDataAccessTest : BaseDataAccessHelperTest<AuthorizationDataAccess>
    {
        private const string UspName = "Lrf_CheckBelonging_GetAgentInfo";
        private const int CustId = 2;
        private const long TransId = 3;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();
            DataAccess.GetObjectDb(Arg.Is(UspName)).Returns(ObjectDb);
        }

        [Test]
        public void IsCustomerBelonging_WhenCall_ParametersPassedCorrectly()
        {
            // Action
            DataAccess.IsCustomerBelonging(CustId, TransId);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("transid", TransId);
                ObjectDb.Received(1).SetParameterValue("custid", CustId);
            });
        }

    }
}