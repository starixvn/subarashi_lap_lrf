namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using DataAccess.Core.Common.Interfaces;
    using Extension.Utility.Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;
    using NSubstitute;
    using NUnit.Framework;
    using Service.StatelessCore;
    using Service.StatelessCore.Interfaces;
    using UnitTest.Common.Helpers;

    [TestFixture]
    public class MatchServiceTest
    {
        [SetUp]
        public void SetUp()
        {
            _cache = Substitute.For<ICustomMemoryCacheService>();
            _matchDataAccess = Substitute.For<IMatchDataAccess>();
            _matchService = new MatchService(_matchDataAccess, _cache);
        }

        [TearDown]
        public void TearDown()
        {
            _matchDataAccess = null;
            _matchService = null;
        }

        private const string Language = "en-Us";

        private static readonly IList<Match> ExpectedResultDataList = new List<Match>
        {
            new Match { MatchId = 1 }
        };

        private static readonly IEnumerable<int> DefaultSpecialLeauges = new[] { 999 };

        private ICustomMemoryCacheService _cache;
        private IMatchDataAccess _matchDataAccess;
        private IMatchService _matchService;

        [Test]
        public async Task GetAllRunningMatch_CacheContainsData_ReturnDataFromCache()
        {
            // Arrange
            var sportId = FakeHelper.Create<int>();
            _cache.Contains(Arg.Any<string>()).Returns(true);
            _cache.Get<IList<Match>>(Arg.Any<string>()).Returns(ExpectedResultDataList);

            // Action
            var result = await _matchService.GetAllRunningMatchAsync(sportId, Language, Enumerable.Empty<int>());

            // Assert
            Assert.Multiple(() =>
            {
                _cache.Received().Get<IList<Match>>(Arg.Any<string>());
                Assert.That(result[0].MatchId, Is.EqualTo(ExpectedResultDataList[0].MatchId));
            });
        }

        [Test]
        public async Task GetAllRunningMatch_WhenCall_ReturnResultFromDataAccess()
        {
            // Arrange
            var sportId = FakeHelper.Create<int>();
            _matchDataAccess.GetAllRunningMatch(sportId, DefaultSpecialLeauges).Returns(ExpectedResultDataList);

            // Action
            var result = await _matchService.GetAllRunningMatchAsync(sportId, Language, DefaultSpecialLeauges);

            // Assert
            Assert.Multiple(() =>
            {
                _matchDataAccess.Received().GetAllRunningMatch(sportId, DefaultSpecialLeauges);
                Assert.That(result[0].MatchId, Is.EqualTo(ExpectedResultDataList[0].MatchId));
            });
        }

        [Test]
        public async Task GetAllRunningMatch_GetDataFromCache_ReturnCachedData()
        {
            // Arrange
            var sportId = FakeHelper.Create<int>();
            _matchDataAccess.GetAllRunningMatch(sportId, DefaultSpecialLeauges).Returns(ExpectedResultDataList);
            var firstCall = await _matchService.GetAllRunningMatchAsync(sportId, Language, DefaultSpecialLeauges);

            // Action
            var result = await _matchService.GetAllRunningMatchAsync(sportId, Language, DefaultSpecialLeauges);

            // Assert
            Assert.That(result, Is.EqualTo(ExpectedResultDataList));
        }

        [Test]
        public async Task GetForecastMatchListByLeague_WhenCall_ReturnResultFromDataAccess()
        {
            // Arrange
            var leagueId = FakeHelper.Create<int>();
            _matchDataAccess.GetForecastMatchListByLeague(leagueId).Returns(ExpectedResultDataList);

            // Action
            var result = await _matchService.GetForecastMatchListByLeagueAsync(leagueId);

            // Assert
            Assert.That(result[0].MatchId, Is.EqualTo(ExpectedResultDataList[0].MatchId));
        }

        [Test]
        public async Task GetMatchesByLeague_WhenCall_ReturnResultFromDataAccess()
        {
            // Arrange
            var metaModel = FakeHelper.Create<GetMatchMetaModel>();
            _matchDataAccess.GetMatchesByLeague(metaModel).Returns(ExpectedResultDataList);

            // Action
            var result = await _matchService.GetMatchesByLeagueAsync(metaModel);

            // Assert
            Assert.That(result[0].MatchId, Is.EqualTo(ExpectedResultDataList[0].MatchId));
        }
    }
}