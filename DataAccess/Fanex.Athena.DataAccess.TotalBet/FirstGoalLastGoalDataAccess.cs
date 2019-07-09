// -----------------------------------------------------------------------
// <copyright file="FirstGoalLastGoalDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.TotalBet
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Core;
    using Core.Extensions;
    using DataAccess.TotalBet.Interfaces;
    using Extension.Helper;
    using Fanex.Common.Extensions;
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;

    public class FirstGoalLastGoalDataAccess : BaseDataAccess, IFirstGoalLastGoalDataAccess
    {
        public async Task<ReportResultModel<FirstGoalLastGoal>> GetFirstGoalLastGoalDataList(FirstGoalLastGoalMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel14";

            using (var db = GetObjectDb(SpName))
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

                    return new ReportResultModel<FirstGoalLastGoal>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        #region Utility

        private static IList<FirstGoalLastGoal> SetToList(IDataReader reader)
        {
            var dataList = new List<FirstGoalLastGoal>();

            while (reader.Read())
            {
                var item = new FirstGoalLastGoal
                {
                    LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    ShowTime = reader.ToString("showtime"),
                    IsNeutral = reader.ToInt("isNeutral"),
                    HomeId = reader.ToInt("homeid"),
                    AwayId = reader.ToInt("awayid"),
                    HomeFirstGoal = reader.ToDecimal("winlost_homeFG"),
                    HomeLastGoal = reader.ToDecimal("winlost_homeLG"),
                    AwayFirstGoal = reader.ToDecimal("winlost_awayFG"),
                    AwayLastGoal = reader.ToDecimal("winlost_awayLG"),
                    NoGoal = reader.ToDecimal("winlost_NoGoal"),
                    HomeFirstHalfFirstGoal = reader.ToNullableDecimal("winlost_1HhomeFG"),
                    HomeFirstHalfLastGoal = reader.ToNullableDecimal("winlost_1HhomeLG"),
                    AwayFirstHalfFirstGoal = reader.ToNullableDecimal("winlost_1HawayFG"),
                    AwayFirstHalfLastGoal = reader.ToNullableDecimal("winlost_1HawayLG"),
                    FirstHalfNoGoal = reader.ToNullableDecimal("winlost_1HNoGoal")
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static FirstGoalLastGoal ReadTotalData(IDataReader reader)
        {
            if (reader.Read())
            {
                return new FirstGoalLastGoal
                {
                    HomeFirstGoal = SumColumns(reader, "winlost_homeFG", "winlost_homeLG", "winlost_awayFG", "winlost_awayLG", "winlost_NoGoal"),
                    HomeFirstHalfFirstGoal = SumColumns(
                                                reader, "winlost_1HhomeFG", "winlost_1HhomeLG", "winlost_1HawayFG", "winlost_1HawayLG", "winlost_1HNoGoal")
                };
            }

            return new FirstGoalLastGoal();
        }

        private static decimal SumColumns(IDataReader reader, params string[] columns)
        {
            decimal result = 0;
            foreach (var column in columns)
            {
                result += reader.ToDecimal(column);
            }

            return result;
        }

        #endregion Utility
    }
}