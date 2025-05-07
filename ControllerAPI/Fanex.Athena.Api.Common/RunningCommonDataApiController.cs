namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Service.Core.Common.Interfaces;
    using Web.ActionFilter;

    [CLSCompliant(false)]
    [FunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class RunningCommonDataApiController : BaseApiController
    {
        private readonly IPortalApiService _portalApiService;
        private readonly IMatchService _matchService;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly ISportService _btcSportService;

        public RunningCommonDataApiController(
            ILanguageService langService,
            IPortalApiService portalApiService,
            IMatchService matchService,
            ICacheRefAdapter cacheRefAdapter,
            ISportService btcSportService)
            : base(langService)
        {
            _portalApiService = portalApiService;
            _matchService = matchService;
            _cacheRefAdapter = cacheRefAdapter;
            _btcSportService = btcSportService;
        }

        [HttpGet]
        public async Task<dynamic> GetRunningMatchList(int sportId, int leagueId)
        {
            var filterMatches = await GetMatchList(sportId);

            return filterMatches.Where(m => m.LeagueId == leagueId)
                .Select(x => new { value = x.MatchId, label = x.MatchName }).OrderBy(i => i.label);
        }

        [HttpGet]
        public async Task<dynamic> GetRunningLeagueList(int sportId)
        {
            var filterMatches = await GetMatchList(sportId);

            var leagueListNormal = filterMatches.Where(i => !i.IsOutRight).Select(m => m.LeagueId).Distinct()
                                      .Select(l => new League
                                      {
                                          IsOutRight = false,
                                          LeagueId = l,
                                          LeagueName = _cacheRefAdapter.GetLeagueName(l)
                                      }).ToList();

            var normalLeagueIdList = leagueListNormal.Select(m => m.LeagueId);

            var leagueListOutRight = filterMatches.Where(i => i.IsOutRight && !normalLeagueIdList.Contains(i.LeagueId)).Select(m => m.LeagueId).Distinct()
                                      .Select(l => new League
                                      {
                                          IsOutRight = true,
                                          LeagueId = l,
                                          LeagueName = _cacheRefAdapter.GetLeagueName(l)
                                      }).ToList();

            var leagueList = leagueListNormal.Union(leagueListOutRight);
            if (IsHideSaba)
            {
                foreach (var league in leagueList)
                {
                    league.LeagueName = SabaHelper.RemoveSabaText(league.LeagueName);
                }
            }

            return leagueList.Select(x => new { Id = x.LeagueId, Value = x.LeagueName, x.IsOutRight, Status = true }).OrderBy(i => i.Value);
        }

        private async Task<IEnumerable<Match>> GetMatchList(int sportId)
        {
            if (sportId == (int)SportType.ParlayTreeView)
            {
                return new List<Match>();
            }

            var isSabaSport = sportId < 0;
            var sabaSports = _btcSportService.GetSabaSports();
            var selectedSabaSport = isSabaSport ? sabaSports.FirstOrDefault(s => s.Id == sportId) : null;
            var sportTypeId = isSabaSport ? selectedSabaSport?.SportTypeId : sportId;

            var specialLeagues = await _portalApiService.GetSpecialLeaguesAsync(SessionService.LicenseeSession.LicenseeName);
            var matchList = await _matchService.GetAllRunningMatchAsync(sportTypeId.GetValueOrDefault(), SessionService.UserSession.Language, specialLeagues).ConfigureAwait(false);

            var excludeSabaSport = sabaSports.Where(s => s.SportTypeId == sportId);

            return isSabaSport
                ? GetSabaSportMatchList(matchList, selectedSabaSport)
                : GetMatchListExcludeSabaSport(matchList, excludeSabaSport);
        }

        private static IEnumerable<Match> GetMatchListExcludeSabaSport(IList<Match> matchList, IEnumerable<SabaSport> excludeSabaSports)
        {
            if (excludeSabaSports == null || !excludeSabaSports.Any())
            {
                return matchList;
            }

            var excludeLeagueGroupIds = excludeSabaSports.SelectMany(s => s.LeagueGroupIds).Distinct();
            return matchList.Where(m => !excludeLeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }

        private static IEnumerable<Match> GetSabaSportMatchList(IList<Match> matchList, SabaSport selectedSabaSport)
        {
            if (selectedSabaSport == null)
            {
                return matchList;
            }

            return matchList.Where(m => selectedSabaSport.LeagueGroupIds.Any(id => id == m.LeagueGroupId));
        }
    }
}