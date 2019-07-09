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
    using Fanex.Athena.Model.Forecast.DTO.ForecastHdou;
    using Fanex.Common.Extensions;
    using Interfaces;
    using Model.Forecast.MetaModel;
    using VendorAdapter.Interfaces;

    public class ForecastDataAccess : ForecastBaseDataAccess, IForecastDataAccess
    {
        public ForecastDataAccess(ICacheRefAdapter cacheRefAdapter)
            : base(cacheRefAdapter)
        {
        }

        public async Task<IList<ForecastHandicapOverUnder>> GetForecastHandicapOverUnder(ForecastHandicapOverUnderMetaModel metaModel)
        {
            const string UspName = "Lrf_Forecast_SelByLeague";

            var paramValues = new
            {
                AgentList = metaModel.AgentListXml,
                LeagueId = metaModel.LeagueId,
                Baseoffsethdp = 0,
                baseoffsetou = 0,
                baseoffseththdp = 0,
                baseoffsethtou = 0,
                BaseCurrency = metaModel.BaseCurrency
            };
            using (var db = this.GetObjectDb(UspName))
            {
                using (var reader = await db.ExecuteReaderAsync(paramValues).ConfigureAwait(false))
                {
                    return GetForecastHandicapOverUnderList(reader);
                }
            }
        }

        /// <summary>
        /// Calculate offset.
        /// </summary>
        /// <param name="forecast">Parameter value.</param>
        private static void CalculateOffsetHandicapOverUnder(ForecastHandicapOverUnder forecast)
        {
            var liveHomeScore = forecast.LiveHomeScore;
            var liveAwayScore = forecast.LiveAwayScore;

            var offsetHdp = liveHomeScore - liveAwayScore;
            var offsetOu = liveHomeScore + liveAwayScore;

            forecast.OffsetHdpMinus1 = offsetHdp - 1;
            forecast.OffsetHdp = offsetHdp;
            forecast.OffsetHdpPlus1 = offsetHdp + 1;
#pragma warning disable S109 // Magic numbers should not be used
            forecast.OffsetOuPlus2 = offsetOu + 2;
#pragma warning restore S109 // Magic numbers should not be used
            forecast.OffsetOuPlus1 = offsetOu + 1;
            forecast.OffsetOu = offsetOu;
        }

        /// <summary>
        /// Get forecast handicap over under list.
        /// </summary>
        /// <param name="reader">Reader value.</param>
        /// <param name="metaModel">Meta model.</param>
        /// <returns>List result.</returns>
        private IList<ForecastHandicapOverUnder> GetForecastHandicapOverUnderList(IDataReader reader)
        {
            var forecasts = new List<ForecastHandicapOverUnder>();

            while (reader.Read())
            {
                var item = new ForecastHandicapOverUnder
                {
                    HandicapMinus1 = reader.ToDecimal("WinLost_M1_HDP"),
                    Handicap = reader.ToDecimal("WinLost_0_HDP"),
                    HandicapPlus1 = reader.ToDecimal("WinLost_1_HDP"),
                    OverUnderPlus2 = reader.ToDecimal("WinLost_2_OU"),
                    OverUnderPlus1 = reader.ToDecimal("WinLost_1_OU"),
                    OverUnder = reader.ToDecimal("WinLost_0_OU"),
                    HtHandicapMinus1 = reader.ToDecimal("WinLost_M1_HTHDP"),
                    HtHandicap = reader.ToDecimal("WinLost_0_HTHDP"),
                    HtHandicapPlus1 = reader.ToDecimal("WinLost_1_HTHDP"),
                    HtOverUnderPlus2 = reader.ToDecimal("WinLost_2_HTOU"),
                    HtOverUnderPlus1 = reader.ToDecimal("WinLost_1_HTOU"),
                    HtOverUnder = reader.ToDecimal("WinLost_0_HTOU")
                };
                ReadCommonData(reader, item);
                CalculateOffsetHandicapOverUnder(item);
                forecasts.Add(item);
            }

            return forecasts;
        }
    }
}