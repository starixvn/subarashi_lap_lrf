// --------------------------------------------------------------------------
// <copyright file="ForecastDataAccess.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Forecast
{
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;
    using Core.Extensions;
    using Fanex.Common.Extensions;
    using Interfaces;
    using Model.Forecast.DTO.Forecast1X2;
    using Model.Forecast.MetaModel;
    using VendorAdapter.Interfaces;

    public class ForecastOneXTwoDataAccess : ForecastBaseDataAccess, IForecastOneXTwoDataAccess
    {
        public ForecastOneXTwoDataAccess(ICacheRefAdapter cacheRefAdapter)
            : base(cacheRefAdapter)
        {
        }

        public async Task<IList<ForecastOneXTwo>> GetForecastOneXTwoByLeague(ForecastOneXTwoMetaModel metaModel)
        {
            const string UspName = "Lrf_Forecast1x2_SelByLeague";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("LeagueId", metaModel.LeagueId);
                db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetForecastOneXTwoList(reader);
                }
            }
        }

        public async Task<IList<ForecastOneXTwo>> GetForecastOneXTwoByMatch(ForecastOneXTwoMetaModel metaModel)
        {
            const string UspName = "Lrf_Forecast_Sel1X2";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("matchid", metaModel.MatchId);
                db.SetParameterValue("betType", metaModel.BetType);
                db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetForecastOneXTwoList(reader);
                }
            }
        }

        private IList<ForecastOneXTwo> GetForecastOneXTwoList(IDataReader reader)
        {
            var forecasts = new List<ForecastOneXTwo>();
            const string ExtraColumnName = "isExtra";

            var hasExtraColumn = reader.HasColumn(ExtraColumnName);
            while (reader.Read())
            {
                var item = new ForecastOneXTwo();
                ReadCommonData(reader, item);
                if (!hasExtraColumn || reader.ToInt(ExtraColumnName) == 0)
                {
                    item.IsExtra = false;
                    item.HomeWinLoss = reader.ToDecimal("hl");
                    item.DrawWinLoss = reader.ToDecimal("dl");
                    item.AwayWinLoss = reader.ToDecimal("al");
                    item.HalfTimeHomeWinLoss = reader.ToDecimal("ht_hl");
                    item.HalfTImeDrawWinLoss = reader.ToDecimal("ht_dl");
                    item.HalfTimeAwayWinLoss = reader.ToDecimal("ht_al");
                }
                else
                {
                    item.IsExtra = true;
                    item.HalfTimeHomeWinLoss = reader.ToDecimal("x_hl");
                    item.HalfTImeDrawWinLoss = reader.ToDecimal("x_dl");
                    item.HalfTimeAwayWinLoss = reader.ToDecimal("x_al");
                }

                forecasts.Add(item);
            }

            return forecasts;
        }
    }
}