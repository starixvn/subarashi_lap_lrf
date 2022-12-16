namespace Fanex.Athena.DataAccess.Customer.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.UnitTests.TestHelpers;

    using Customer;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.UnitTest.Common.Helpers;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using NSubstitute;

    using NUnit.Framework;

    [TestFixture]
    public class SabaVirtualSettingAccessTest : BaseDataAccessHelperTest<SabaVirtualSettingAccess>
    {
        private ICacheRefAdapter _cacheRefAdapter;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            base.FixtureSetUp();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            _cacheRefAdapter = null;
            base.FixtureTearDown();
        }

        protected override void SetUpDataAccess()
        {
            DataAccess = Substitute.ForPartsOf<SabaVirtualSettingAccess>(_cacheRefAdapter);
            _cacheRefAdapter.GetSportName(Arg.Any<int>()).Returns("");
        }

        [Test]
        public async Task GetSabaVirtualSettingInformation_WhenCall_ParametersPassedCorrectly()
        {
            // Arrange
            var metaModel = FakeHelper.Create<SabaVirtuaSettingInformationMetaModel>();
            DataAccess.GetObjectDb(Arg.Is("Lrf_SabaVirtualSettingSel")).Returns(ObjectDb);

            // Action
            await DataAccess.GetSabaVirtualSettingInformation(metaModel);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received().SetParameterValue("DangerLevel", metaModel.LevelList);
            });
        }

        [Test]
        public async Task GetSabaVirtualSettingInformation_WhenCall_ReturnResultCorrectly()
        {
            //Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_SabaVirtualSettingSel")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);

            var expectedData = new Dictionary<string, object>
            {
                { "DangerLevel", FakeHelper.Create<string>() },
                { "SportType", FakeHelper.Create<string>() },
                { "LeagueGroupId", FakeHelper.Create<int>() },
                { "BetDelay", FakeHelper.Create<decimal>() },
                { "NextBetInterval", FakeHelper.Create<decimal>() },
                { "MaxPerMatch", FakeHelper.Create<decimal>() },
                { "ApplyParlay", FakeHelper.Create<bool>() }
            };

            MapReaderData(expectedData);

            var metaModel = FakeHelper.Create<SabaVirtuaSettingInformationMetaModel>();

            //Action
            var result = await DataAccess.GetSabaVirtualSettingInformation(metaModel);
            var firstData = result.First();

            //Assert
            Assert.Multiple(() =>
            {
                Assert.AreEqual(expectedData["DangerLevel"], firstData.DangerLevel);
                Assert.AreEqual(expectedData["SportType"], firstData.SportType);
                Assert.AreEqual(expectedData["LeagueGroupId"], firstData.LeagueGroupId);
                Assert.AreEqual(expectedData["ApplyParlay"], firstData.ApplyParlay);
            });
        }
    }
}