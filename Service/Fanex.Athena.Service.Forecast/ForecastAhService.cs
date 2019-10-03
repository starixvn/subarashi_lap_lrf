// --------------------------------------------------------------------------
// <copyright file="ForecastService.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Service.Forecast
{
    using System.Data;
    using System.Threading.Tasks;

    using DataAccess.Forecast.Interfaces;

    using Fanex.Common;

    using Interfaces;

    using Model.Forecast.DTO.ForecastAH;
    using Model.Forecast.MetaModel;

    public class ForecastAhService : IForecastAhService
    {
        private readonly IForecastAhDataAccess _forecastAhDataAccess;

        public ForecastAhService(IForecastAhDataAccess forecastDataAccess)
        {
            _forecastAhDataAccess = forecastDataAccess;
        }

        public async Task<ForecastAH> GetForecastTopOddsByMatch(int matchId, int betType)
        {
            return await _forecastAhDataAccess.GetForecastTopOddsByMatch(matchId, betType).ConfigureAwait(false);
        }

        public async Task<ForecastValue> GetForecastHandicap(ForecastAHMetaModel metaModel, int userId)
        {
            const int HandicapStartOffsetIndex = -2;
            var forecastHandicapTable = await _forecastAhDataAccess.GetForecastHandicap(metaModel, userId).ConfigureAwait(false);

            return SetForecastValue(forecastHandicapTable, metaModel, HandicapStartOffsetIndex);
        }

        public async Task<ForecastValue> GetForecastOverUnder(ForecastAHMetaModel metaModel, int userId)
        {
            const int OverUnderStartOffsetIndex = 0;
            var overUnderTable = await _forecastAhDataAccess.GetForecastOverUnder(metaModel, userId).ConfigureAwait(false);

            return SetForecastValue(overUnderTable, metaModel, OverUnderStartOffsetIndex);
        }

        private static decimal GetForecastValue(
            DataRow dataRow,
            int currentScore,
            int scoreOffset,
            decimal forecast)
        {
            const decimal OneHalf = 0.5m;

            const string AlColumnName = "al";
            const string HlColumnName = "hl";
            var offset = ConvertToDec(dataRow["offset"].ToString());
            var forecastScore = currentScore - offset + scoreOffset;

            if (offset % 1 == 0 && forecastScore == 0)
            {
                return forecast;
            }
#pragma warning disable S109 // Magic numbers should not be used
            if (forecastScore > 0 && forecastScore < OneHalf)
            {
                return forecast + (ConvertToDec(dataRow[AlColumnName].ToString()) / 2);
            }
            else if (forecastScore >= OneHalf)
            {
                return forecast + ConvertToDec(dataRow[AlColumnName].ToString());
            }
            else if (forecastScore < 0 && forecastScore > -OneHalf)
            {
                return forecast + (ConvertToDec(dataRow[HlColumnName].ToString()) / 2);
            }
#pragma warning restore S109 // Magic numbers should not be used
            else
            {
                return forecast + ConvertToDec(dataRow[HlColumnName].ToString());
            }
        }

        private static decimal ConvertToDec(string stringValue)
        {
            if (string.IsNullOrEmpty(stringValue))
            {
                return 0;
            }

            return Converter.ToDecimal(stringValue);
        }

        private static ForecastValue SetForecastValue(DataTable foreCastData, ForecastAHMetaModel metaModel, int startOffsetIndex)
        {
            var result = new ForecastValue();
            var offset = startOffsetIndex;

            if (foreCastData != null && foreCastData.Rows.Count > 0)
            {
                foreach (DataRow row in foreCastData.Rows)
                {
                    result.ForeCastValue0 =
                        GetForecastValue(row, metaModel.CurrentScore, offset, result.ForeCastValue0);
                    result.ForeCastValue1 =
                        GetForecastValue(row, metaModel.CurrentScore, ++offset, result.ForeCastValue1);
                    result.ForeCastValue2 =
                        GetForecastValue(row, metaModel.CurrentScore, ++offset, result.ForeCastValue2);
                    result.ForeCastValue3 =
                        GetForecastValue(row, metaModel.CurrentScore, ++offset, result.ForeCastValue3);
                    result.ForeCastValue4 =
                        GetForecastValue(row, metaModel.CurrentScore, ++offset, result.ForeCastValue4);

                    offset = startOffsetIndex;
                }

                result.HasData = true;
            }
            else
            {
                result.HasData = false;
            }

            return result;
        }
    }
}