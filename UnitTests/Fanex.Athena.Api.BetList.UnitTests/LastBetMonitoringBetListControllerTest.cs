namespace Fanex.Athena.Api.BetList.UnitTests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using Base.UnitTests;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.MetaModel;
    using Model.Core.DTO.Common;

    using NSubstitute;

    using NUnit.Framework;

    using VendorAdapter.Interfaces;

    public class LastBetMonitoringBetListControllerTest : BaseApiControllerHelperTest
    {
        private const string ApiPath = "/LastBetMonitoringBetList/GetData";

        const string _root_tag = "ROOT";
        const string _sport_tag = "Sport";
        const string _sport_type_attr = "SportType";
        const string _league_group_id_attr = "LeagueGroupIds";
        const string DEFAULT_LEAGUE_ID = "0";

        private IMatchService _matchService;

        private ICacheRefAdapter _cacheRefAdapter;

        private IBetListApiClient _betListApiClient;
        private IPortalApiService _portalApiService;
        private ISportService _sportService;

        [OneTimeSetUp]
        public override void FixtureSetUp()
        {
            base.FixtureSetUp();

            _betListApiClient = Substitute.For<IBetListApiClient>();
            _cacheRefAdapter = Substitute.For<ICacheRefAdapter>();
            _matchService = Substitute.For<IMatchService>();
            _portalApiService = Substitute.For<IPortalApiService>();
            _sportService = Substitute.For<ISportService>();

            MockSessionData();
        }

        [OneTimeTearDown]
        public override void FixtureTearDown()
        {
            base.FixtureTearDown();

            _betListApiClient = null;
        }

        [Test]
        public async Task GetRunningMatchList_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int SportId = 1;
                var matchList = new List<Match>
                {
                    new Match { MatchName = "Match3", IsOutRight = false, LeagueId = 2 },
                    new Match { MatchName = "Match5", IsOutRight = false, LeagueId = 2 },
                    new Match { MatchName = "Match6", IsOutRight = false, LeagueId = 1 },
                    new Match { MatchName = "Match1", IsOutRight = true, LeagueId = 4 },
                    new Match { MatchName = "Match4", IsOutRight = true, LeagueId = 3 },
                    new Match { MatchName = "Match2", IsOutRight = true, LeagueId = 5 },
                };
                _matchService.GetAllRunningMatchAsync(SportId, Arg.Any<string>(), Arg.Any<IEnumerable<int>>()).Returns(matchList);

                _cacheRefAdapter.GetLeagueName(Arg.Any<int>()).Returns(x => { return x[0].ToString(); });

                var expectedMatchList = "Match1,Match2,Match3,Match4,Match5,Match6";
                var expectedLeagueList = "1,2,3,4,5";

                // Action
                var result = await controller.GetRunningMatchList(SportId);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(string.Join(",", ((IOrderedEnumerable<Match>)result.MatchList).Select(x => x.MatchName)), Is.EqualTo(expectedMatchList));
                    Assert.That(string.Join(",", ((IOrderedEnumerable<League>)result.LeagueList).Select(x => x.LeagueName)), Is.EqualTo(expectedLeagueList));
                });
            }
        }

        [Test]
        public async Task GetRunningMatchList_WhenCallWithSportNotSaba_ReturnMatchNoSabaSport()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int SportId = 1;
                var matchList = new List<Match>
                {
                    new Match { MatchName = "Match3", IsOutRight = false, LeagueId = 2, LeagueGroupId = 42 },
                    new Match { MatchName = "Match5", IsOutRight = false, LeagueId = 2, LeagueGroupId = 1 },
                    new Match { MatchName = "Match6", IsOutRight = false, LeagueId = 1, LeagueGroupId = 42 },
                    new Match { MatchName = "Match1", IsOutRight = true, LeagueId = 4, LeagueGroupId = 1 },
                    new Match { MatchName = "Match4", IsOutRight = true, LeagueId = 3, LeagueGroupId = 1 },
                    new Match { MatchName = "Match2", IsOutRight = true, LeagueId = 5, LeagueGroupId = 1 },
                };
                var sabaSports = new List<SabaSport>
                {
                    new SabaSport{ LeagueGroupIds = new List<int>{42}, Id = -1, SportTypeId = 1}
                };

                _matchService.GetAllRunningMatchAsync(SportId, Arg.Any<string>(), Arg.Any<IEnumerable<int>>()).Returns(matchList);

                _cacheRefAdapter.GetLeagueName(Arg.Any<int>()).Returns(x => { return x[0].ToString(); });
                _sportService.GetSabaSports().Returns(sabaSports);

                var expectedMatchList = "Match1,Match2,Match4,Match5";
                var expectedLeagueList = "2,3,4,5";

                // Action
                var result = await controller.GetRunningMatchList(SportId);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(string.Join(",", ((IOrderedEnumerable<Match>)result.MatchList).Select(x => x.MatchName)), Is.EqualTo(expectedMatchList));
                    Assert.That(string.Join(",", ((IOrderedEnumerable<League>)result.LeagueList).Select(x => x.LeagueName)), Is.EqualTo(expectedLeagueList));
                });
            }
        }

        [Test]
        public async Task GetRunningMatchList_WhenCallWithSabaSportId_ReturnSabaSportMatchOnly()
        {
            using (var controller = CreateController())
            {
                // Arrange
                const int sportId = -1;
                const int sportTypeId = 1;
                var matchList = new List<Match>
                {
                    new Match { MatchName = "Match3", IsOutRight = false, LeagueId = 2,  LeagueGroupId = 42 },
                    new Match { MatchName = "Match5", IsOutRight = false, LeagueId = 2, LeagueGroupId = 1 },
                    new Match { MatchName = "Match6", IsOutRight = false, LeagueId = 1, LeagueGroupId = 42 },
                    new Match { MatchName = "Match1", IsOutRight = true, LeagueId = 4, LeagueGroupId = 1 },
                    new Match { MatchName = "Match4", IsOutRight = true, LeagueId = 3, LeagueGroupId = 1 },
                    new Match { MatchName = "Match2", IsOutRight = true, LeagueId = 5, LeagueGroupId = 1 },
                };
                var sabaSports = new List<SabaSport>
                {
                    new SabaSport{ LeagueGroupIds = new List<int>{42}, Id = sportId, SportTypeId = sportTypeId}
                };

                _matchService.GetAllRunningMatchAsync(sportTypeId, Arg.Any<string>(), Arg.Any<IEnumerable<int>>()).Returns(matchList);

                _cacheRefAdapter.GetLeagueName(Arg.Any<int>()).Returns(x => { return x[0].ToString(); });
                _sportService.GetSabaSports().Returns(sabaSports);

                var expectedMatchList = "Match3,Match6";
                var expectedLeagueList = "1,2";

                // Action
                var result = await controller.GetRunningMatchList(sportId);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(string.Join(",", ((IOrderedEnumerable<Match>)result.MatchList).Select(x => x.MatchName)), Is.EqualTo(expectedMatchList));
                    Assert.That(string.Join(",", ((IOrderedEnumerable<League>)result.LeagueList).Select(x => x.LeagueName)), Is.EqualTo(expectedLeagueList));
                });
            }
        }

        [Test]
        public async Task Index_NoCurrency_GenerateAgentListXmlCorrectly()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new LastBetsMonitoringMetaModel { Currency = string.Empty };

                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));

                // Action
                var actual = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(expect, Is.EqualTo(actual));
                    _betListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }

        [Test]
        public async Task Index_HasCurrency_GenerateAgentListXmlCorrectly()
        {
            using (var controller = CreateController())
            {
                // Arrange
                var metaModel = new LastBetsMonitoringMetaModel { Currency = "1,2" };

                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));

                // Action
                var actual = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.That(expect, Is.EqualTo(actual));
                    _betListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }

        [Test]
        public async Task Index_HasSelectNoSport_GenerateEmptyStringSportTypeList()
        {
            using(var controller = CreateController())
            {
                //Arrange
                var metaModel = new LastBetsMonitoringMetaModel { SportIds = string.Empty };
                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));

                // Action
                var actual = await controller.Index(metaModel);

                // Assert
                Assert.Multiple(() =>
                {
                    Assert.IsEmpty(metaModel.SportTypeList);
                    Assert.That(expect, Is.EqualTo(actual));
                    _betListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }

        [Test]
        public async Task Index_HasSelectAllSports_GenerateAllTextInSportTypeList()
        {
            using (var controller = CreateController())
            {
                //Arrange
                var text = "All";
                var metaModel = new LastBetsMonitoringMetaModel { SportIds = text };
                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));

                // Action
                var actual = await controller.Index(metaModel);

                // Assert

                Assert.Multiple(() =>
                {
                    Assert.AreEqual(text, metaModel.SportTypeList);
                    Assert.That(expect, Is.EqualTo(actual));
                    _betListApiClient.Received().PostAsync(ApiPath, metaModel, SessionLanguage);
                });
            }
        }

        [Test]
        public async Task Index_HasSelectNoSabaSport_GenerateSportTypeListXmlCorrectly()
        {
            using (var controller = CreateController())
            {
                //Arrange
                var text = "1";
                var metaModel = new LastBetsMonitoringMetaModel { SportIds = text };
                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));

                // Action
                await controller.Index(metaModel);

                // Assert
                var xml = XDocument.Parse(metaModel.SportTypeList);
                Assert.Multiple(() =>
                {
                    Assert.IsNotNull(xml);
                    Assert.AreEqual(_root_tag, xml.Root.Name.ToString());
                    Assert.AreEqual(text, xml.Root.Element(_sport_tag).Attribute(_sport_type_attr).Value);
                    Assert.AreEqual(DEFAULT_LEAGUE_ID, xml.Root.Element(_sport_tag).Attribute(_league_group_id_attr).Value);
                });
            }
        }

        [Test]
        public async Task Index_HasSelectSabaSport_GenerateSportTypeListXmlCorrectly()
        {
            using (var controller = CreateController())
            {
                //Arrange
                var id = -1;
                var sabaSport = new SabaSport { Id = id, SportTypeId = 1, LeagueGroupIds = new List<int> { 1, 2 } };
                
                var metaModel = new LastBetsMonitoringMetaModel { SportIds = id.ToString() };
                var expect = new HttpResponseMessage();
                _betListApiClient.PostAsync(ApiPath, metaModel, SessionLanguage).Returns(Task.FromResult(expect));
                _sportService.GetSabaSport(id).Returns(sabaSport);

                // Action
                await controller.Index(metaModel);

                // Assert
                var xml = XDocument.Parse(metaModel.SportTypeList);
                Assert.Multiple(() =>
                {
                    Assert.IsNotNull(xml);
                    Assert.AreEqual(_root_tag, xml.Root.Name.ToString());
                    Assert.AreEqual(sabaSport.SportTypeId.ToString(), xml.Root.Element(_sport_tag).Attribute(_sport_type_attr).Value);
                    Assert.AreEqual(string.Join(",", sabaSport.LeagueGroupIds), xml.Root.Element(_sport_tag).Attribute(_league_group_id_attr).Value);
                });
            }
        }

        private LastBetMonitoringBetListController CreateController()
        {
            return new LastBetMonitoringBetListController(LangService, _betListApiClient, _matchService, _cacheRefAdapter, _portalApiService, _sportService)
            {
                SessionService = SessionService,
                ProductService = ProductService
            };
        }
    }
}