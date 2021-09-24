namespace Fanex.Athena.DataAccess.Core.UnitTests.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Core.Common;

    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Model.Core.MetaModel.Common;

    using NSubstitute;

    using NUnit.Framework;

    using TestHelpers;

    using VendorAdapter.Interfaces;

    public class LeagueDataAccessTest : BaseDataAccessHelperTest<LeagueDataAccess>
    {
        private static readonly IEnumerable<int> DefaultSpecialLeauges = new[] { 999 };

        private ICacheRefAdapter _cacheRef;

        private IAppSettings _appSettings;

        private IBalanceUpDataAccess _balanceUpDataAccess;


        protected override void SetUpDataAccess()
        {
            _cacheRef = Substitute.For<ICacheRefAdapter>();
            _appSettings = Substitute.For<IAppSettings>();
            _balanceUpDataAccess = Substitute.For<IBalanceUpDataAccess>();
            DataAccess = Substitute.ForPartsOf<LeagueDataAccess>(_cacheRef, _appSettings, _balanceUpDataAccess);
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task GetLeaguesBySport_WhenCall_ParametersPassedCorrectly(bool isProduction)
        {
            // Arrange
            DataAccess.GetObjectDb(Arg.Is("Lrf_SelLeagueBySport")).Returns(ObjectDb);
            _appSettings.IsProduction.Returns(isProduction);
            var metaModel = new LeagueMetaModel
            {
                AgentListXml = "hello",
                SportId = 4,
                FromDate = new DateTime(2016, 8, 10),
                ToDate = new DateTime(2016, 8, 11)
            };

            var balanceUpDate = new DateTime(2018, 2, 3);
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp
            {
                BalanceUpDay = balanceUpDate
            });

            // Action
            await DataAccess.GetLeaguesBySport(metaModel, DefaultSpecialLeauges);

            // Assert
            Assert.Multiple(() =>
            {
                ObjectDb.Received(1).SetParameterValue("sportId", metaModel.SportId);
                ObjectDb.Received(1).SetParameterValue("Fromdate", metaModel.FromDate);
                ObjectDb.Received(1).SetParameterValue("Todate", metaModel.ToDate);
                ObjectDb.Received(1).SetParameterValue("AgentList", metaModel.AgentListXml);
                ObjectDb.Received(1).SetParameterValue("IsIncludeTestLeague", !isProduction);
            });
        }

        [Test]
        public async Task GetLeaguesBySport_WhenCall_ReturnData()
        {
            // Arrange
            const int LeagueId = 1234;
            const string LeagueName = "League 1234 xxx";
            DataAccess.GetObjectDb(Arg.Is("Lrf_SelLeagueBySport")).Returns(ObjectDb);
            Reader.Read().Returns(true, false);
            MapReaderData(new
            {
                leagueid = LeagueId
            });
            _cacheRef.GetLeagueName(LeagueId).Returns(LeagueName);

            var balanceUpDate = new DateTime(2018, 2, 3);
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp
            {
                BalanceUpDay = balanceUpDate
            });

            // Action
            var result = await DataAccess.GetLeaguesBySport(new LeagueMetaModel(), DefaultSpecialLeauges);
            var firstItem = result.First();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstItem.LeagueId, Is.EqualTo(LeagueId));
                Assert.That(firstItem.LeagueName, Is.EqualTo(LeagueName));
            });
        }

        [TestCase(false)]
        [TestCase(true)]
        public async Task GetRunningLeagues_WhenCall_ParametersPassedCorrectly(bool isProduction)
        {
            // Arrange
            const string AgentList = "<sdfsdfml>";
            const string BetTypes = "1,2,3,4,5";
            DataAccess.GetObjectDb(Arg.Is("Lrf_LeagueSelRunning")).Returns(ObjectDb);
            _appSettings.IsProduction.Returns(isProduction);

            var balanceUpDate = new DateTime(2018, 2, 3);
            _balanceUpDataAccess.GetBalanceUp().Returns(new BalanceUp
            {
                BalanceUpDay = balanceUpDate
            });

            // Action
            await DataAccess.GetRunningLeagues(AgentList, BetTypes, DefaultSpecialLeauges);

            // Assert
            ObjectDb.Received(1).SetParameterValue("AgentList", AgentList);
            ObjectDb.Received(1).SetParameterValue("betTypes", BetTypes);
            ObjectDb.Received(1).SetParameterValue("IsIncludeTestLeague", !isProduction);
        }
    }
}