using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fanex.Athena.Api.Common
{
    [CLSCompliant(false)]
    [ApiFunctionAuthorization(PermissionKeys.ReportLastBetsMonitoring)]
    public class LastBetMonitoringDataApiController : BaseApiController
    {
        private readonly IMatchService _matchService;
        private readonly ICacheRefAdapter _cacheRefAdapter;
        private readonly IPortalApiService _portalApiService;
        private readonly ISportService _sportService;

        public LastBetMonitoringDataApiController(
            ILanguageService languageService,
            IMatchService matchService,
            ICacheRefAdapter cacheRefAdapter,
            IPortalApiService portalApiService,
            ISportService sportService)
            :base(languageService)
        {
            _matchService = matchService;
            _cacheRefAdapter = cacheRefAdapter;
            _portalApiService = portalApiService;
            _sportService = sportService;
        }

        [HttpGet]
        public async Task<dynamic> GetRunningMatchList(int sportId)
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

            return new
            {
                MatchList = filterMatches.OrderBy(i => i.MatchName),
                LeagueList = leagueList.OrderBy(i => i.LeagueName)
            };
        }
        private async Task<IEnumerable<Match>> GetMatchList(int sportId)
        {
            if (sportId == ProductTypes.Parlay)
            {
                return new List<Match>();
            }

            var isSabaSport = sportId < 0;
            var sabaSports = _sportService.GetSabaSports();
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
