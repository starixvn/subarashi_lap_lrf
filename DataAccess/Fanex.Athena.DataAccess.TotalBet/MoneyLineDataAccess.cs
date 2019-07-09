// -----------------------------------------------------------------------
// <copyright file="MoneyLineDataAccess.cs" company="">
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

    public class MoneyLineDataAccess : BaseDataAccess, IMoneyLineDataAccess
    {
        public async Task<ReportResultModel<MoneyLine>> GetMoneyLineDataList(MoneyLineMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel2021";

            using (var db = this.GetObjectDb(SpName))
            {
                var uspParams = new
                {
                    AgentList = metaModel.AgentListXml,
                    PageSize = metaModel.PageSize,
                    PageIndex = metaModel.PageIndex,
                    TotalRows = metaModel.TotalRows,
                    BaseCurrency = metaModel.BaseCurrency
                };
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    var data = SetToList(reader);

                    reader.NextResult();
                    var totalData = ReadTotalData(reader);

                    return new ReportResultModel<MoneyLine>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        #region Utility

        private static IList<MoneyLine> SetToList(IDataReader reader)
        {
            var dataList = new List<MoneyLine>();

            while (reader.Read())
            {
                var item = new MoneyLine
                {
                    ShowTime = reader.ToString("showtime"),
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeID"),
                    AwayId = reader.ToInt("awayID"),
                    TotalHomeFt = reader.ToDecimal("home_odds"),
                    TotalAwayFt = reader.ToDecimal("away_odds"),
                    ForecastHomeFt = reader.ToDecimal("winlost_home"),
                    ForecastAwayFt = reader.ToDecimal("winlost_away"),
                    TotalHomeFirstHalf = reader.ToDecimal("home_odds_HT"),
                    TotalAwayFirstHalf = reader.ToDecimal("away_odds_HT"),
                    ForecastHomeFirstHalf = reader.ToDecimal("winlost_home_HT"),
                    ForecastAwayFirstHalf = reader.ToDecimal("winlost_away_HT"),
                    LiveHomeScore = reader.ToString("livehomescore"),
                    LiveAwayScore = reader.ToString("liveawayscore"),
                    LiveIndicator = reader.ToInt("liveindicator"),
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static MoneyLine ReadTotalData(IDataReader reader)
        {
            if (reader.Read())
            {
                return new MoneyLine
                {
                    TotalHomeFt = reader.ToDecimal("home_odds"),
                    TotalAwayFt = reader.ToDecimal("away_odds"),
                    TotalHomeFirstHalf = reader.ToDecimal("home_odds_HT"),
                    TotalAwayFirstHalf = reader.ToDecimal("away_odds_HT")
                };
            }

            return new MoneyLine();
        }

        #endregion Utility
    }
}