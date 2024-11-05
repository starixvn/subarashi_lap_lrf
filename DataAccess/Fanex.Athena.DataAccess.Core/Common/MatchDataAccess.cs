// -----------------------------------------------------------------------
// <copyright file="MatchDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Configuration.Interfaces;
    using Extension.Utility;
    using Fanex.Common.Extensions;
    using Interfaces;
    using Model.Core.DTO.Common;
    using Model.Core.MetaModel.Common;
    using VendorAdapter.Interfaces;

    public class MatchDataAccess : BaseDataAccess, IMatchDataAccess
    {
        private readonly IAppSettings _appSettings;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public MatchDataAccess(ICacheRefAdapter cacheRefAdapter, IAppSettings appSettings, IBalanceUpDataAccess balanceUpDataAccess)
        {
            _cacheRefAdapter = cacheRefAdapter;
            _appSettings = appSettings;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<IList<Match>> GetForecastMatchListByLeague(int leagueId)
        {
            const string UspName = "Lrf_Forecast_MatchList";
            IList<Match> result = new List<Match>();

            var uspParam = new
            {
                LeagueId = leagueId
            };

            using (var db = GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync(uspParam).ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var match = new Match
                        {
                            LeagueId = leagueId,
                            MatchId = reader.ToInt("matchid"),
                            HomeId = reader.ToInt("homeid"),
                            AwayId = reader.ToInt("awayid"),
                            IsNeutral = reader.ToBool("IsNeutral")
                        };
                        match.MatchName = GetMatchName(match);

                        result.Add(match);
                    }
                }
            }

            return result;
        }

        /// <summary>
        ///     Get all running matches.
        /// </summary>
        /// <param name="sportId">Sport ID value.</param>
        /// <returns>The result value.</returns>
        public async Task<IList<Match>> GetAllRunningMatch(int sportId, IEnumerable<int> specialLeagues)
        {
            var result = new List<Match>();

            using (var db = GetObjectDb("Lrf_LeagueMatchSelRunning"))
            {
                db.SetParameterValue("sporttype", sportId);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var awayId = Convert.ToInt32(reader["awayid"]);
                        var leagueId = Convert.ToInt32(reader["leagueid"]);

                        if (!specialLeagues.Contains(leagueId))
                        {
                            var match = new Match
                            {
                                MatchId = Convert.ToInt32(reader["matchid"]),
                                LeagueId = leagueId,
                                IsOutRight = awayId == 0,
                                HomeId = Convert.ToInt32(reader["homeid"]),
                                AwayId = awayId,
                                LeagueGroupId = reader.ToInt("LeagueGroupId")
                            };

                            match.MatchName = GetMatchName(match);

                            result.Add(match);
                        }
                    }
                }
            }

            return result;
        }

        /// <summary>
        ///     Get matches by league id (only for SB)
        /// </summary>
        public async Task<IList<Match>> GetMatchesByLeague(GetMatchMetaModel metaModel)
        {
            var result = new List<Match>();

            using (var db = GetObjectDb("Lrf_SelMatchByLeague"))
            {
                var uspParam = new
                {
                    AgentList = metaModel.AgentListXml,
                    metaModel.SportId,
                    metaModel.LeagueId,
                    metaModel.FromDate,
                    metaModel.ToDate,
                    _balanceUpDataAccess.GetBalanceUp().MoveBetsDay
                };

                using (var reader = await db.ExecuteReaderAsync(uspParam).ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var match = new Match
                        {
                            MatchId = Convert.ToInt32(reader["matchid"]),
                            HomeId = reader.ToInt("homeid"),
                            AwayId = reader.ToInt("awayid"),
                            LeagueGroupId = reader.ToInt("LeagueGroupID")
                        };
                        match.MatchName = GetMatchName(match);

                        result.Add(match);
                    }
                }
            }

            return result;
        }

        private string GetMatchName(Match match)
        {
            var homeTeamText = _cacheRefAdapter.GetTeamName(match.HomeId) + (match.IsNeutral ? " (N)" : string.Empty);
            var awayTeamText = _cacheRefAdapter.GetTeamName(match.AwayId);

            return $"{homeTeamText} -vs- {awayTeamText}";
        }
    }
}