// -----------------------------------------------------------------------
// <copyright file="HomeDrawAwayNoBetDataAccess.cs" company="">
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

    public class HomeDrawAwayNoBetDataAccess : BaseDataAccess, IHomeDrawAwayNoBetDataAccess
    {
        public async Task<IList<HomeDrawAwayNoBet>> GetHomeDrawAwayNoBetDataList(HomeDrawAwayNoBetMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel121";
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
                    return GetData(reader);
                }
            }
        }

        #region Utility

        /// <summary>
        /// Set data to list.
        /// </summary>
        /// <param name="reader">Data reader value.</param>
        /// <param name="isConvert">Is convert value.</param>
        /// <param name="baseCurrency">Base currency value.</param>
        /// <returns>A list of Home/Draw/Away no bet.</returns>
        private static IList<HomeDrawAwayNoBet> GetData(IDataReader reader)
        {
            var dataList = new List<HomeDrawAwayNoBet>();

            while (reader.Read())
            {
                var item = new HomeDrawAwayNoBet
                {
                    LiveIndicator = reader.ToInt("liveindicator"),
                    LiveHomeScore = reader.ToString("livehomescore"),
                    LiveAwayScore = reader.ToString("liveawayscore"),
                    ShowTime = reader.ToString("showtime"),
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeid"),
                    AwayId = reader.ToInt("awayid"),
                    IsNeutral = reader.ToInt("isNeutral"),
                    BetCountHomeNoBet = reader.ToInt("betcount_hnb"),
                    BetCountDrawNoBet = reader.ToInt("betcount_dnb"),
                    BetCountAwayNoBet = reader.ToInt("betcount_anb"),
                    HomeOddsHomeNoBet = reader.ToDecimal("home_odds_hnb"),
                    AwayOddsHomeNoBet = reader.ToDecimal("away_odds_hnb"),
                    HomeOddsDrawNoBet = reader.ToDecimal("home_odds_dnb"),
                    AwayOddsDrawNoBet = reader.ToDecimal("away_odds_dnb"),
                    HomeOddsAwayNoBet = reader.ToDecimal("home_odds_anb"),
                    AwayOddsAwayNoBet = reader.ToDecimal("away_odds_anb")
                };

                dataList.Add(item);
            }

            return dataList;
        }

        #endregion Utility
    }
}