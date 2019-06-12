// -----------------------------------------------------------------------
// <copyright file="HalfTimeFullTimeDataAccess.cs" company="">
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

    public class HalfTimeFullTimeDataAccess : BaseDataAccess, IHalfTimeFullTimeDataAccess
    {
        public async Task<ReportResultModel<HalfTimeFullTime>> GetHalfTimeFullTimeDataList(HalfTimeFullTimeMetaModel metaModel)
        {
            const string SpName = "Lrf_TotalBets_Sel16";

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
                    return new ReportResultModel<HalfTimeFullTime>
                    {
                        DataList = data,
                        TotalData = totalData
                    };
                }
            }
        }

        private static IList<HalfTimeFullTime> SetToList(IDataReader reader)
        {
            var dataList = new List<HalfTimeFullTime>();

            while (reader.Read())
            {
                var item = new HalfTimeFullTime
                {
                    MatchId = reader.ToInt("matchid"),
                    HomeId = reader.ToInt("homeID"),
                    AwayId = reader.ToInt("awayID"),
                    IsNeutral = reader.ToInt("isNeutral"),
                    HomeHome = reader.ToDecimal("totalHH"),
                    HomeDraw = reader.ToDecimal("totalHD"),
                    HomeAway = reader.ToDecimal("totalHA"),
                    DrawHome = reader.ToDecimal("totalDH"),
                    DrawDraw = reader.ToDecimal("totalDD"),
                    DrawAway = reader.ToDecimal("totalDA"),
                    AwayHome = reader.ToDecimal("totalAH"),
                    AwayDraw = reader.ToDecimal("totalAD"),
                    AwayAway = reader.ToDecimal("totalAA"),
                };

                dataList.Add(item);
            }

            return dataList;
        }

        private static HalfTimeFullTime ReadTotalData(IDataReader reader)
        {
            if (reader.Read())
            {
                return new HalfTimeFullTime
                {
                    HomeHome = reader.ToDecimal("totalHH"),
                    HomeDraw = reader.ToDecimal("totalHD"),
                    HomeAway = reader.ToDecimal("totalHA"),
                    DrawHome = reader.ToDecimal("totalDH"),
                    DrawDraw = reader.ToDecimal("totalDD"),
                    DrawAway = reader.ToDecimal("totalDA"),
                    AwayHome = reader.ToDecimal("totalAH"),
                    AwayDraw = reader.ToDecimal("totalAD"),
                    AwayAway = reader.ToDecimal("totalAA"),
                };
            }

            return new HalfTimeFullTime();
        }
    }
}