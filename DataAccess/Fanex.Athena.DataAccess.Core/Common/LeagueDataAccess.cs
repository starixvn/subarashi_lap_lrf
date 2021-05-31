// -----------------------------------------------------------------------
// <copyright file="LeagueDataAccess.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Core.Common
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Resources;
    using Fanex.Common.Extensions;
    using Interfaces;
    using Model.Core.MetaModel.Common;
    using VendorAdapter.Interfaces;

    public class LeagueDataAccess : BaseDataAccess, ILeagueDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;

        private readonly IAppSettings _appSettings;

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly IDictionary<int, List<int>> _sportList = new Dictionary<int, List<int>>
        {
            { (int)SportType.Soccer, new List<int>{42, 74, 108, 113 } },
            { (int)SportType.BasketBall, new List<int>{42 } },
            { (int)SportType.Cricket, new List<int>{42 } }
        };

        public LeagueDataAccess(ICacheRefAdapter cacheRefAdapter, IAppSettings appSettings, IBalanceUpDataAccess balanceUpDataAccess)
        {
            _cacheRefAdapter = cacheRefAdapter;
            _appSettings = appSettings;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<IEnumerable<League>> GetLeaguesBySport(LeagueMetaModel metaModel, bool isOfferLeagueM88 = false)
        {
            using (var db = this.GetObjectDb("Lrf_SelLeagueBySport"))
            {
                db.SetParameterValue("sportId", metaModel.SportId);
                db.SetParameterValue("Fromdate", metaModel.FromDate);
                db.SetParameterValue("Todate", metaModel.ToDate);
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                return await ReadLeagues(db, isOfferLeagueM88).ConfigureAwait(false);
            }
        }

        public async Task<IEnumerable<League>> GetRunningLeagues(string agentList, string betTypes, bool isOfferLeagueM88 = false)
        {
            const string UspName = "Lrf_LeagueSelRunning";
            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentList", agentList);
                db.SetParameterValue("betTypes", betTypes);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                return await ReadLeagues(db, isOfferLeagueM88).ConfigureAwait(false);
            }
        }

        public async Task<IEnumerable<League>> GetSabaVirtualSportLeaguesBySport(LeagueMetaModel metaModel, bool isOfferLeagueM88 = false)
        {
            using (var db = this.GetObjectDb("Lrf_SelLeagueBySport"))
            {
                db.SetParameterValue("sportId", metaModel.SportId);
                db.SetParameterValue("Fromdate", metaModel.FromDate);
                db.SetParameterValue("Todate", metaModel.ToDate);
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
                db.SetParameterValue("IsIncludeTestLeague", !_appSettings.IsProduction);
                return await ReadSabaVirtualSportLeagues(db, isOfferLeagueM88).ConfigureAwait(false);
            }
        }

        private async Task<IEnumerable<League>> ReadSabaVirtualSportLeagues(IObjectDb db, bool isOfferLeagueM88 = false)
        {
            var dataList = new List<League>();
            using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (reader.Read())
                {
                    var leagueId = reader.ToInt("leagueid");
                    var sportid = reader.ToInt("sportid");
                    var leagueGroupID = reader.ToInt("LeagueGroupID");

                    if (_sportList.ContainsKey(sportid) && _sportList[sportid].Contains(leagueGroupID) && (!_appSettings.ExcludeLeagues.Contains(leagueId) || isOfferLeagueM88))
                    {
                        dataList.Add(new League
                        {
                            LeagueId = leagueId,
                            LeagueName = _cacheRefAdapter.GetLeagueName(leagueId)
                        });
                    }
                }

                if (dataList.Any())
                {
                    dataList.Insert(0, new League
                    {
                        LeagueId = 0,
                        LeagueName = ViewResources.All
                    });
                }

                return dataList;
            }
        }

        private async Task<IEnumerable<League>> ReadLeagues(IObjectDb db, bool isOfferLeagueM88 = false)
        {
            var dataList = new List<League>();
            using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (reader.Read())
                {
                    var leagueId = reader.ToInt("leagueid");

                    if (!_appSettings.ExcludeLeagues.Contains(leagueId) || isOfferLeagueM88)
                    {
                        dataList.Add(new League
                        {
                            LeagueId = leagueId,
                            LeagueName = _cacheRefAdapter.GetLeagueName(leagueId)
                        });
                    }
                }

                return dataList;
            }
        }
    }
}