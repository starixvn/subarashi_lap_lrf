// -----------------------------------------------------------------------
// <copyright file="OutrightDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.TotalBet
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Core;
    using DataAccess.TotalBet.Interfaces;
    using Fanex.Common.Extensions;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;
    using VendorAdapter.Interfaces;

    public class OutrightDataAccess : BaseDataAccess, IOutrightDataAccess
    {
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public OutrightDataAccess(ICacheRefAdapter cacheRefAdapter)
        {
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IList<Outright>> GetOutrightDataList(OutrightMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel10";
            var uspParams = new
            {
                AgentList = metaModel.AgentListXml,
                PageSize = metaModel.PageSize,
                PageIndex = metaModel.PageIndex,
                TotalRows = metaModel.TotalRows,
                BaseCurrency = metaModel.BaseCurrency
            };

            using (var db = this.GetObjectDb(SpName))
            {
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    return SetToList(reader);
                }
            }
        }

        private IList<Outright> SetToList(IDataReader reader)
        {
            var dataList = new List<Outright>();

            while (reader.Read())
            {
                var teamId = reader.ToInt("teamid");
                var item = new Outright
                {
                    LeagueId = reader.ToInt("leagueid"),
                    TeamId = teamId,
                    TeamName = _cacheRefAdapter.GetTeamName(teamId),
                    MatchId = reader.ToInt("orid"),
                    Forecast = reader.ToDecimal("totalwinlost"),
                    Balance = reader.ToDecimal("balance")
                };

                dataList.Add(item);
            }

            return dataList;
        }
    }
}