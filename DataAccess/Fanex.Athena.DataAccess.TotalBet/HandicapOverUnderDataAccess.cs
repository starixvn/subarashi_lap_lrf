// -----------------------------------------------------------------------
// <copyright file="HandicapOverUnderDataAccess.cs" company="">
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
    using Extension.Helper;
    using Fanex.Common.Extensions;
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;

    public class HandicapOverUnderDataAccess : BaseDataAccess, IHandicapOverUnderDataAccess
    {
        public async Task<ReportResultModel<HandicapOverUnder>> GetHandicapOverUnderDataList(HandicapOverUnderMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel1378";
            var uspParams = new
            {
                LicenseeId = metaModel.LicenseeId,
                PageSize = metaModel.PageSize,
                PageIndex = metaModel.PageIndex,
                AgentList = metaModel.AgentListXml,
                BaseCurrency = metaModel.BaseCurrency
            };

            using (var db = this.GetObjectDb(SpName))
            {
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    var data = SetToList(reader);
                    reader.NextResult();
                    var totalData = ReadTotalData(reader);
                    return new ReportResultModel<HandicapOverUnder>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        #region Utility

        private static decimal GetTotalScore(IDataReader reader, string homeColumnName, string awayColumnName)
        {
            var homeScore = reader.ToDecimal(homeColumnName);
            var awayScore = reader.ToDecimal(awayColumnName);

            return homeScore - awayScore;
        }

        private static IList<HandicapOverUnder> SetToList(IDataReader reader)
        {
            var dataList = new List<HandicapOverUnder>();

            while (reader.Read())
            {
                var item = new HandicapOverUnder
                {
                    ShowTime = reader.ToString("showtime"),
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeID"),
                    AwayId = reader.ToInt("awayID"),
                    LiveHomeScore = reader.ToString("livehomescore"),
                    LiveAwayScore = reader.ToString("liveawayscore"),
                    LiveIndicator = reader.ToInt("liveindicator"),
                    BetCountHandicap = reader.ToInt("betcount_hdp"),
                    BetCountOverUnder = reader.ToInt("betcount_ou"),
                    BetCountHandicap1StHalf = reader.ToInt("BetCount_HTHDP"),
                    BetCountOverUnder1StHalf = reader.ToInt("BetCount_HTOU"),
                    FullTimeHandicap = GetTotalScore(reader, "home_odds_HDP", "away_odds_HDP"),
                    FullTimeOverUnder = GetTotalScore(reader, "home_odds_OU", "away_odds_OU"),
                    FirstTimeHandicap = GetTotalScore(reader, "home_odds_HTHDP", "away_odds_HTHDP"),
                    FirstTimeOverUnder = GetTotalScore(reader, "home_odds_HTOU", "away_odds_HTOU"),
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static HandicapOverUnder ReadTotalData(IDataReader reader)
        {
            if (!reader.Read())
            {
                return new HandicapOverUnder();
            }

            return new HandicapOverUnder
            {
                FullTimeHandicap = GetRunningStake(reader, "home_odds_HDP", "away_odds_HDP"),
                FullTimeOverUnder = GetRunningStake(reader, "home_odds_OU", "away_odds_OU"),
                FirstTimeHandicap = GetRunningStake(reader, "home_odds_HTHDP", "away_odds_HTHDP"),
                FirstTimeOverUnder = GetRunningStake(reader, "home_odds_HTOU", "away_odds_HTOU")
            };
        }

        private static decimal GetRunningStake(IDataReader reader, string homeColumnName, string awayColumnName)
        {
            var homeScore = reader.ToDecimal(homeColumnName);
            var awayScore = reader.ToDecimal(awayColumnName);

            return homeScore + awayScore;
        }

        #endregion Utility
    }
}