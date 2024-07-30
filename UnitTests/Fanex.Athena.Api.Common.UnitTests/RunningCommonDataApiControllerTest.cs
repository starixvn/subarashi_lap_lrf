namespace Fanex.Athena.Api.Common.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.Api.Base;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using NSubstitute;
    using NUnit.Framework;
    using UnitTest.Common.Helpers;

    public class RunningCommonDataApiControllerTest
    {
        private ISessionService _sessionService = Substitute.For<ISessionService>();

        private readonly IBetTypeService _betTypeService = Substitute.For<IBetTypeService>();

        private IPortalApiService _portalApiService;

        private ICustomMemoryCacheService _memCacheService = Substitute.For<ICustomMemoryCacheService>();

        private IMatchService _matchService = Substitute.For<IMatchService>();

        private ICacheRefAdapter _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();

        private IBettingTicketCenterSportService _btcSportService = Substitute.For<IBettingTicketCenterSportService>();

        [OneTimeSetUp]
        public void FixtureSetUp()
        {
            const string DefaultLicenseeName = "12bet";

            _sessionService.LicenseeSession.Returns(new LicenseeAuthInfo { LicenseeId = FakeHelper.Create<int>(), LicenseeName = DefaultLicenseeName, SpecialPlatform = 0 });
            _sessionService.UserSession.Returns(new UserAuthInfo
            {
                UserId = FakeHelper.Create<int>(),
                Language = FakeHelper.Create<string>(),
                CurrencyAgentList = new Dictionary<int, int[]>()
            });

            _portalApiService = Substitute.For<IPortalApiService>();
            _portalApiService.GetSpecialLeaguesAsync(DefaultLicenseeName)
                .Returns(Task.FromResult(Enumerable.Empty<int>()));
        }

        [OneTimeTearDown]
        public void FixtureTearDown()
        {
            _matchService = null;
            _cacheRefAdapter = null;
            _btcSportService = null;
        }

        private RunningCommonDataApiController CreateController()
        {
            return new RunningCommonDataApiController(
                Substitute.For<ILanguageService>(),
                _portalApiService,
                _matchService,
                _cacheRefAdapter,
                _btcSportService)
            {
                SessionService = _sessionService
            };
        }

        [Test]
        public async Task GetRunningLeagueList_WhenCall_ReturnCorrectData()
        {
            using (var controller = CreateController())
            {
                // arrange
                var sportId = FakeHelper.Create<int>();
                var specialLeaguesIds = FakeHelper.CreateMany<int>();
                var runningMatchs = new List<Model.Core.DTO.Common.Match>
                {
                    new Model.Core.DTO.Common.Match
                        { MatchId = FakeHelper.Create<int>(), MatchName = FakeHelper.Create<string>(), LeagueId = 1, IsOutRight = true },
                    new Model.Core.DTO.Common.Match
                        { MatchId = FakeHelper.Create<int>(), MatchName = FakeHelper.Create<string>(), LeagueId = 1, IsOutRight = false },
                    new Model.Core.DTO.Common.Match
                        { MatchId = FakeHelper.Create<int>(), MatchName = FakeHelper.Create<string>(), LeagueId = 2, IsOutRight = true }
                };
                var expectedRunningLeagues = new List<dynamic>
                {
                    new {Id = 1, Value = "league a", Status = true},
                    new {Id = 2, Value = "league b", Status = true}
                };

                _portalApiService.GetSpecialLeaguesAsync(_sessionService.LicenseeSession.LicenseeName).Returns(specialLeaguesIds);
                _matchService.GetAllRunningMatchAsync(sportId, _sessionService.UserSession.Language, specialLeaguesIds).Returns(runningMatchs);
                _cacheRefAdapter.GetLeagueName(1).Returns("league a");
                _cacheRefAdapter.GetLeagueName(2).Returns("league b");

                // action
                var result = await controller.GetRunningLeagueList(sportId).ConfigureAwait(false); ;

                // assert
                Assert.Multiple(() =>
                {
                    for (int i = 0; i < expectedRunningLeagues.Count; i++)
                    {
                        var resultLeague = result.ElementAt(i);
                        var expectedLeague = expectedRunningLeagues.ElementAt(i);

                        Assert.That(resultLeague.GetType().GetProperty("Id").GetValue(resultLeague, null), Is.EqualTo(expectedLeague.Id));
                        Assert.That(resultLeague.GetType().GetProperty("Value").GetValue(resultLeague, null), Is.EqualTo(expectedLeague.Value));
                        Assert.That(resultLeague.GetType().GetProperty("Status").GetValue(resultLeague, null), Is.EqualTo(expectedLeague.Status));
                    }
                });
            }
        }
    }
}