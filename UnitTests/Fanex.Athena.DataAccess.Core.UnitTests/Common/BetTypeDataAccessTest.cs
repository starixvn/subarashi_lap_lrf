namespace Fanex.Athena.DataAccess.Core.UnitTests.Common
{
    using System.Threading.Tasks;

    using Core.Common;

    using NSubstitute;

    using NUnit.Framework;

    using TestHelpers;

    using VendorAdapter.Interfaces;

    public class BetTypeDataAccessTest : BaseDataAccessHelperTest<BetTypeDataAccess>
    {
        private const string UspName = "Lrf_SelBetTypeBySport";
        private const string Sports = "1,2,3";

        protected override void SetUpDataAccess()
        {
            DataAccess = Substitute.ForPartsOf<BetTypeDataAccess>(Substitute.For<ICacheRefAdapter>());
        }

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            DataAccess.GetObjectDb(Arg.Is(UspName)).Returns(ObjectDb);
        }

        [Test]
        public async Task GetBettypes_WhenCall_PassCorrectParameters()
        {
            // Action
            await DataAccess.GetBettypes(Sports);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("sportlist", Sports);
            });
        }

        [Test]
        public async Task GetBettypes_WhenCall_DataReturnedCorrectly()
        {
            // Arrange
            (string ProductPrefix, int BetTypeId) expected = ("NG", 1);

            MapReaderData(new
            {
                BetType = expected.BetTypeId,
                ProductPrefix = expected.ProductPrefix
            });
            Reader.Read().Returns(true, false);

            // Action
            var result = await DataAccess.GetBettypes(Sports).ConfigureAwait(false);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result[0].ProductPrefix, Is.EqualTo(expected.ProductPrefix));
                Assert.That(result[0].BetTypeId, Is.EqualTo(expected.BetTypeId));
            });
        }
    }
}