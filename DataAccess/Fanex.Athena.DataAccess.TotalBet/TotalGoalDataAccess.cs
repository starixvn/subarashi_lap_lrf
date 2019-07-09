// -----------------------------------------------------------------------
// <copyright file="TotalGoalDataAccess.cs" company="">
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
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Common.Extensions;
    using Model.Core.ResultModel;
    using Model.TotalBet.DTO;
    using Model.TotalBet.MetaModel;

    public class TotalGoalDataAccess : BaseDataAccess, ITotalGoalDataAccess
    {
        public async Task<ReportResultModel<TotalGoal>> GetTotalGoalDataList(TotalGoalMetaModel metaModel)
        {
            const string UspName = "Lrf_TotalBets_Sel6";
            var uspParams = new
            {
                AgentList = metaModel.AgentListXml,
                PageSize = metaModel.PageSize,
                PageIndex = metaModel.PageIndex,
                TotalRows = metaModel.TotalRows,
                BaseCurrency = metaModel.BaseCurrency
            };
            using (var db = this.GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync(uspParams).ConfigureAwait(false))
                {
                    var data = SetToList(reader);
                    reader.NextResult();
                    var totalData = ReadTotalData(reader);
                    return new ReportResultModel<TotalGoal>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        private static IList<TotalGoal> SetToList(IDataReader reader)
        {
            var dataList = new List<TotalGoal>();

            while (reader.Read())
            {
                var item = new TotalGoal
                {
                    //// LeagueId = reader.ToInt("leagueid"),
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeID"),
                    AwayId = reader.ToInt("awayID"),
                    IsNeutral = reader.ToInt("isNeutral"),
                    Total01 = reader.ToDecimal("total01"),
                    Total23 = reader.ToDecimal("total23"),
                    Total46 = reader.ToDecimal("total46"),
                    Total7Over = reader.ToDecimal("total7over"),
                    TotalFirstHalf01 = reader.ToNullableDecimal("fhtotal01"),
                    TotalFirstHalf23 = reader.ToNullableDecimal("fhtotal23"),
                    Total4Over = reader.ToNullableDecimal("fhtotal4over")
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static TotalGoal ReadTotalData(IDataReader reader)
        {
            if (reader.Read())
            {
                return new TotalGoal
                {
                    Total01 = reader.ToDecimal("total01") + reader.ToDecimal("total23") + reader.ToDecimal("total46") + reader.ToDecimal("total7over"),
                    TotalFirstHalf01 = reader.ToDecimal("fhtotal01") + reader.ToDecimal("fhtotal23") + reader.ToDecimal("fhtotal4over")
                };
            }

            return new TotalGoal();
        }
    }
}