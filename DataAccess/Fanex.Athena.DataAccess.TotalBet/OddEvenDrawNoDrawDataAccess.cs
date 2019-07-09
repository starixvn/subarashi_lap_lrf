// -----------------------------------------------------------------------
// <copyright file="OddEvenDrawNoDrawDataAccess.cs" company="">
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
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;

    public class OddEvenDrawNoDrawDataAccess : BaseDataAccess, IOddEvenDrawNoDrawDataAccess
    {
        public async Task<ReportResultModel<OddEvenDrawNoDraw>> GetOddEvenDrawNoDrawDataList(OddEvenDrawNoDrawMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel25";

            using (var db = this.GetObjectDb(SpName))
            {
                var uspParams = new
                {
                    PageSize = metaModel.PageSize,
                    PageIndex = metaModel.PageIndex,
                    TotalRows = metaModel.TotalRows,
                    AgentList = metaModel.AgentListXml,
                    BaseCurrency = metaModel.BaseCurrency
                };
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    var data = SetToList(reader);

                    reader.NextResult();
                    var totalData = ReadTotalData(reader);

                    return new ReportResultModel<OddEvenDrawNoDraw>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        private static decimal GetRunningStake(IDataReader reader, string columnOne, string columnTwo)
        {
            var oneScore = reader.ToDecimal(columnOne);
            var twoScore = reader.ToDecimal(columnTwo);
            return oneScore + twoScore;
        }

        private static decimal GetTotalScore(IDataReader reader, string homeColumnName, string awayColumnName)
        {
            var homeScore = reader.ToDecimal(homeColumnName);
            var awayScore = reader.ToDecimal(awayColumnName);

            return homeScore - awayScore;
        }

        private static decimal GetOneXTwoScore(IDataReader reader, string columnOne, string columnX, string columnTwo)
        {
            var onwScore = reader.ToDecimal(columnOne);
            var drawScore = reader.ToDecimal(columnX);
            var twoScore = reader.ToDecimal(columnTwo);
            return onwScore + drawScore + twoScore;
        }

        private static IList<OddEvenDrawNoDraw> SetToList(IDataReader reader)
        {
            var dataList = new List<OddEvenDrawNoDraw>();

            while (reader.Read())
            {
                var item = new OddEvenDrawNoDraw
                {
                    ShowTime = reader.ToString("showtime"),
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeID"),
                    AwayId = reader.ToInt("awayID"),
                    Bettype = reader.ToInt("bettype"),
                    LiveHomeScore = reader.ToString("livehomescore"),
                    LiveAwayScore = reader.ToString("liveawayscore"),
                    LiveIndicator = reader.ToInt("liveindicator"),
                    BetCountOddEven = reader.ToInt("betcount_oe"),
                    BetCountOneXTwo = reader.ToInt("betcount_1x2"),
                    BetCountDrawNoDraw = reader.ToInt("betcount_dnd"),
                    BetCountOddEven1StHalf = reader.ToInt("betcount_oe_1st"),
                    BetCountOneXTow1StHalf = reader.ToInt("betcount_1x2_1st"),
                    OddEvenFt = GetTotalScore(reader, "home_odds_OE", "away_odds_OE"),
                    OneXTwoFt = GetOneXTwoScore(reader, "odds_1", "odds_x", "odds_2"),
                    DrawNoDraw = GetTotalScore(reader, "home_odds_DND", "away_odds_DND"),
                    OddEvenFirstHalf = GetTotalScore(reader, "home_odds_OE_1st", "away_odds_OE_1st"),
                    OneXTwoFirstHalf = GetOneXTwoScore(reader, "odds_1_1st", "odds_x_1st", "odds_2_1st"),
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static OddEvenDrawNoDraw ReadTotalData(IDataReader reader)
        {
            if (reader.Read())
            {
                return new OddEvenDrawNoDraw
                {
                    OddEvenFt = GetRunningStake(reader, "home_odds_OE", "away_odds_OE"),
                    OneXTwoFt = GetOneXTwoScore(reader, "odds_1", "odds_x", "odds_2"),
                    DrawNoDraw = GetRunningStake(reader, "home_odds_DND", "away_odds_DND"),
                    OddEvenFirstHalf = GetRunningStake(reader, "home_odds_OE_1st", "away_odds_OE_1st"),
                    OneXTwoFirstHalf = GetOneXTwoScore(reader, "odds_1_1st", "odds_x_1st", "odds_2_1st"),
                };
            }

            return new OddEvenDrawNoDraw();
        }
    }
}