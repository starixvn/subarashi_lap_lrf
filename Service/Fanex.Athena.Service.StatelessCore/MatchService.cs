// -----------------------------------------------------------------------
// <copyright file="MatchService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Extension.Utility.Interfaces;

    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class MatchService : IMatchService
    {
        private const string RunningMatchCacheKey = "RunningMatchCacheKey_";

        private readonly IMatchDataAccess _matchDataAccess;

        private readonly ICustomMemoryCacheService _cache;

        public MatchService(IMatchDataAccess matchDataAccess, ICustomMemoryCacheService cache)
        {
            _matchDataAccess = matchDataAccess;
            _cache = cache;
        }

        public async Task<IList<Match>> GetAllRunningMatchAsync(int sportId, string languageCode)
        {
            var cacheKey = RunningMatchCacheKey + sportId + languageCode;
            var isInCache = _cache.Contains(cacheKey);
            if (isInCache)
            {
                return _cache.Get<IList<Match>>(cacheKey);
            }
            else
            {
                var matchList = await _matchDataAccess.GetAllRunningMatch(sportId).ConfigureAwait(false);
                _cache.Set(cacheKey, matchList);

                return matchList;
            }
        }

        public async Task<IList<Match>> GetForecastMatchListByLeagueAsync(int leagueId)
        {
            return await _matchDataAccess.GetForecastMatchListByLeague(leagueId).ConfigureAwait(false);
        }

        public async Task<IList<Match>> GetMatchesByLeagueAsync(int leagueId, DateTime fromDate, DateTime toDate)
        {
            return await _matchDataAccess.GetMatchesByLeague(leagueId, fromDate, toDate).ConfigureAwait(false);
        }
    }
}