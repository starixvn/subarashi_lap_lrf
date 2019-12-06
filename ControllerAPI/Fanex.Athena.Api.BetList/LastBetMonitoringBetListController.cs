namespace Fanex.Athena.Api.BetList
{
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.BetList.MetaModel;

    using VendorAdapter.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportLastBetsMonitoring)]
    public class LastBetMonitoringBetListController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        private readonly IMatchService _matchService;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public LastBetMonitoringBetListController(
            ILanguageService languageService,
            IBetListApiClient betListApiClient,
            IMatchService matchService,
            ICacheRefAdapter cacheRefAdapter)
        : base(languageService)
        {
            _betListApiClient = betListApiClient;
            _matchService = matchService;
            _cacheRefAdapter = cacheRefAdapter;
        }

        [HttpGet]
        public async Task<dynamic> GetRunningMatchList(int sportId)
        {
            var matchList = await _matchService.GetAllRunningMatchAsync(sportId, SessionService.UserSession.Language).ConfigureAwait(false);

            var leagueListNormal = matchList.Where(i => !i.IsOutRight).Select(m => m.LeagueId).Distinct()
                                      .Select(l => new League
                                      {
                                          IsOutRight = false,
                                          LeagueId = l,
                                          LeagueName = _cacheRefAdapter.GetLeagueName(l)
                                      }).ToList();
            var leagueListOutRight = matchList.Where(i => i.IsOutRight).Select(m => m.LeagueId).Distinct()

                                      .Select(l => new League
                                      {
                                          IsOutRight = true,
                                          LeagueId = l,
                                          LeagueName = _cacheRefAdapter.GetLeagueName(l)
                                      }).ToList();

            var leagueList = leagueListNormal.Union(leagueListOutRight);

            return new
            {
                MatchList = matchList.OrderBy(i => i.MatchName),
                LeagueList = leagueList.OrderBy(i => i.LeagueName)
            };
        }

        [HttpPost]
        [ValidationApiRequest(ObjectName = "metaModel")]
        public async Task<HttpResponseMessage> Index(LastBetsMonitoringMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            if (string.IsNullOrWhiteSpace(metaModel.Currency))
            {
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            }
            else
            {
                var currencyIdList = metaModel.Currency.Split(',').Select(int.Parse);
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyIdList);
            }

            return await _betListApiClient.PostAsync("/LastBetMonitoringBetList/GetData",
                metaModel, userSession.Language).ConfigureAwait(false);
        }
    }
}