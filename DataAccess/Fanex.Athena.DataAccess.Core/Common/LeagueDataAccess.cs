// -----------------------------------------------------------------------
// <copyright file="LeagueDataAccess.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common
{
    using Data;
    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Common.Extensions;
    using Interfaces;
    using Model.Core.MetaModel.Common;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using VendorAdapter.Interfaces;

    public class LeagueDataAccess : BaseDataAccess, ILeagueDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;

        private readonly IAppSettings _appSettings;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public LeagueDataAccess(ICacheRefAdapter cacheRefAdapter, IAppSettings appSettings, IBalanceUpDataAccess balanceUpDataAccess)
        {
            _cacheRefAdapter = cacheRefAdapter;
            _appSettings = appSettings;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<IEnumerable<League>> GetLeaguesBySport(LeagueMetaModel metaModel, IEnumerable<int> specialLeagues)
        {
            using (var db = this.GetObjectDb("Lrf_SelLeagueBySport"))
            {
                db.SetParameterValue("sportId", metaModel.SportId);
                db.SetParameterValue("Fromdate", metaModel.FromDate);
                db.SetParameterValue("Todate", metaModel.ToDate);
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                return await ReadLeagues(db, specialLeagues).ConfigureAwait(false);
            }
        }

        public async Task<IEnumerable<League>> GetRunningLeagues(string agentList, string betTypes, IEnumerable<int> specialLeagues)
        {
            const string UspName = "Shard_Lrf_LeagueSelRunning";
            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentList", agentList);
                db.SetParameterValue("betTypes", betTypes);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                return await ReadLeagues(db, specialLeagues).ConfigureAwait(false);
            }
        }

        private async Task<IEnumerable<League>> ReadLeagues(IObjectDb db, IEnumerable<int> specialLeagues)
        {
            var dataList = new List<League>();
            using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (reader.Read())
                {
                    var leagueId = reader.ToInt("leagueid");
                    var leagueGroupID = reader.ToInt("LeagueGroupID");

                    if (!specialLeagues.Contains(leagueId))
                    {
                        dataList.Add(new League
                        {
                            LeagueId = leagueId,
                            LeagueName = _cacheRefAdapter.GetLeagueName(leagueId),
                            LeagueGroupId = leagueGroupID,
                        });
                    }
                }

                return dataList;
            }
        }
    }
}