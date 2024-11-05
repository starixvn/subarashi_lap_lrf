namespace Fanex.Athena.Service.StatelessCore
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using DataAccess.Core.Common.Interfaces;
    using Extension.Utility.Interfaces;
    using Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;

    public class MatchService : IMatchService
    {
        private const string RunningMatchCacheKey = "RunningMatchCacheKey_";

        private readonly ICustomMemoryCacheService _cache;

        private readonly IMatchDataAccess _matchDataAccess;

        public MatchService(IMatchDataAccess matchDataAccess, ICustomMemoryCacheService cache)
        {
            _matchDataAccess = matchDataAccess;
            _cache = cache;
        }

        public async Task<IList<Match>> GetAllRunningMatchAsync(int sportId, string languageCode, IEnumerable<int> specialLeagues)
        {
            var cacheKey = RunningMatchCacheKey + sportId + languageCode + "_" + string.Join("_", specialLeagues);
            var isInCache = _cache.Contains(cacheKey);
            if (isInCache)
            {
                return _cache.Get<IList<Match>>(cacheKey);
            }

            var matchList = await _matchDataAccess.GetAllRunningMatch(sportId, specialLeagues).ConfigureAwait(false);
            _cache.Set(cacheKey, matchList);

            return matchList;
        }

        public async Task<IList<Match>> GetForecastMatchListByLeagueAsync(int leagueId)
        {
            return await _matchDataAccess.GetForecastMatchListByLeague(leagueId).ConfigureAwait(false);
        }

        public async Task<IList<Match>> GetMatchesByLeagueAsync(GetMatchMetaModel metaModel)
        {
            return await _matchDataAccess.GetMatchesByLeague(metaModel).ConfigureAwait(false);
        }
    }
}