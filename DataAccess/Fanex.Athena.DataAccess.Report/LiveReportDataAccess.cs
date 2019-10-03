// -----------------------------------------------------------------------
// <copyright file="LiveReportDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Configuration.Interfaces;
    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.DTO.LiveReports;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.Helper;
    using VendorAdapter.Interfaces;

    public class LiveReportDataAccess : BaseDataAccess, ILiveReportDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        public LiveReportDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
            _cacheRefAdapter = cacheRefAdapter;
        }

        public async Task<IList<LiveReport>> GetLiveReportSummary(LiveReportMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_LiveReportSummary";
            var moveBetsDate = _balanceUpDataAccess.GetBalanceUp().MoveBetsDay;

            using (var db = this.GetObjectDb(UspName))
            {
                AddParameters(db, metaModel, moveBetsDate);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var list = new List<LiveReport>();
                    while (reader.Read())
                    {
                        var productCode = reader.ToString("ProductCode");

                        var item = new LiveReport
                        {
                            ProductName = ProductHelper.GetProductName(productCode),
                            ProductCode = productCode
                        };
                        ReadCommonColumns(reader, item);
                        list.Add(item);
                    }

                    return list;
                }
            }
        }

        public async Task<IList<LiveReport>> GetDetailBySport(LiveReportMetaModel metaModel)
        {
            const string UspName = "Lrf_Rpt_LiveReportBySport";
            var moveBetsDate = _balanceUpDataAccess.GetBalanceUp().MoveBetsDay;

            var list = new List<LiveReport>();
            using (var db = this.GetObjectDb(UspName))
            {
                AddParameters(db, metaModel, moveBetsDate);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var sportType = reader.ToString("SportType");
                        var item = new LiveReport
                        {
                            ProductName = GetProductNameBySport(sportType),
                            ProductCode = sportType
                        };
                        ReadCommonColumns(reader, item);
                        list.Add(item);
                    }

                    return list;
                }
            }
        }

        public async Task<Tuple<IList<LiveReport>, IList<LiveReportByBetType>>> GetDetailByCurrencyAndBettype(
            LiveReportMetaModel metaModel,
            IDictionary<int, string> currencyList,
             IEnumerable<Product> products)
        {
            const string UspName = "Lrf_Rpt_LiveReportSummaryDetail";
            var moveBetsDate = _balanceUpDataAccess.GetBalanceUp().MoveBetsDay;

            using (var db = this.GetObjectDb(UspName))
            {
                AddParameters(db, metaModel, moveBetsDate);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var resultByCurrency = ReadDetailByCurrency(reader, currencyList);

                    var resultByBettype = reader.NextResult() ? ReadDetailByBettype(reader, products) : new List<LiveReportByBetType>();

                    return new Tuple<IList<LiveReport>, IList<LiveReportByBetType>>(resultByCurrency, resultByBettype);
                }
            }
        }

        public async Task<IList<LiveReportWinLossByMatch>> GetLiveReportWinlossByMatch(LiveReportMatchListMetalModel metaModel)
        {
            const string UspName = "Lrf_Rpt_LiveReportWinlossByMatch";
            var moveBetsDate = _balanceUpDataAccess.GetBalanceUp().MoveBetsDay;

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("fromdate", metaModel.FromDate);
                db.SetParameterValue("todate", metaModel.ToDate);
                db.SetParameterValue("movebetsday", moveBetsDate);
                db.SetParameterValue("sportid", metaModel.SportId);
                db.SetParameterValue("liveindicator", metaModel.LiveIndicator);
                db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
                var productList = metaModel.ProductCodeList.Split(',');
                foreach (var product in productList)
                {
                    db.SetParameterValue("show" + product, true);
                }

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var data = new List<LiveReportWinLossByMatch>();

                    while (reader.Read())
                    {
                        data.Add(new LiveReportWinLossByMatch
                        {
                            MatchId = reader.ToLong("matchid"),
                            HomeId = reader.ToInt("homeid"),
                            AwayId = reader.ToInt("awayid"),
                            BetType = reader.ToInt("bettype"),
                            ShowTime = reader.ToString("showtime"),
                            BetCount = reader.ToInt("Betcount"),
                            TurnOver = reader.ToDecimal("Turnover"),
                            CustomerWinLoss = reader.ToDecimal("Winlost"),
                            CustomerComm = reader.ToDecimal("PlayerComm"),
                            LicenseeComm = reader.ToDecimal("Comm"),
                            LicenseeWinLoss = reader.ToDecimal("LicenseeWL"),
                            AmountDue = reader.ToDecimal("AmtDueto3rd"),
                            SportId = metaModel.SportId
                        });
                    }

                    return data;
                }
            }
        }

        private static void AddParameters(IObjectDb db, LiveReportMetaModel metaModel, DateTime moveBetsDate)
        {
            db.SetParameterValue("ProductCodes", metaModel.ProductCodeList);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("fromdate", metaModel.FromDate);
            db.SetParameterValue("todate", metaModel.ToDate);
            db.SetParameterValue("movebetsday", moveBetsDate);
            db.SetParameterValue("liveindicator", metaModel.LiveIndicator);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
        }

        private static void ReadCommonColumns(IDataReader reader, LiveReport item)
        {
            item.TurnOver = reader.ToDecimal("Turnover");
            item.CustomerWinLoss = reader.ToDecimal("Winlost");
            item.CustomerComm = reader.ToDecimal("PlayerComm");
            item.LicenseeComm = reader.ToDecimal("Comm");
            item.LicenseeWinLoss = reader.ToDecimal("LicenseeWL");
            item.AmountDue = reader.ToDecimal("AmtDueto3rd");
            item.BetCount = reader.ToInt("Betcount");
        }

        protected internal virtual string GetProductNameBySport(string sportType)
        {
            // 101 -> 104: const from SP to separate names for special bettypes
            const int MixParlaySportType = 101;
            const int CombinationMixParlaySportType = 102;
            const int OutrightSportType = 103;
            const int VirtualSports2MixParlaySportType = 104;

            var sportId = string.IsNullOrEmpty(sportType) ? 0 : Convert.ToInt32(sportType);

            switch (sportId)
            {
                case MixParlaySportType:
                    return _cacheRefAdapter.GetBettype((int)BetType.MixParlay);

                case CombinationMixParlaySportType:
                    return _cacheRefAdapter.GetBettype((int)BetType.CombinationMixParlay);

                case OutrightSportType:
                    return _cacheRefAdapter.GetBettype((int)BetType.Outright);

                case VirtualSports2MixParlaySportType:
                    return _cacheRefAdapter.GetBettypeWithProductName((int)BetType.VirtualSports2MixParlay);

                default:
                    return _cacheRefAdapter.GetSportName(sportType);
            }
        }

        private IList<LiveReport> ReadDetailByCurrency(IDataReader reader, IDictionary<int, string> currencyList)
        {
            var list = new List<LiveReport>();
            while (reader.Read())
            {
                var currencyId = reader.ToInt("Currency");
                var currencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString());
                var item = new LiveReport
                {
                    ProductName = currencyName,
                    ProductCode = currencyName
                };

                ReadCommonColumns(reader, item);
                list.Add(item);
            }

            return list.OrderBy(x => x.ProductName).ToList();
        }

        private IList<LiveReportByBetType> ReadDetailByBettype(IDataReader reader, IEnumerable<Product> products)
        {
            var dataList = new List<LiveReport>();
            while (reader.Read())
            {
                var bettype = reader.ToString("bettype");
                var item = new LiveReport
                {
                    ProductName = GetBetTypeName(Convert.ToInt32(bettype)),
                    ProductCode = reader.ToString("ProductCode")
                };
                ReadCommonColumns(reader, item);

                dataList.Add(item);
            }

            var result = new List<LiveReportByBetType>();
            if (dataList.Any())
            {
                result = products.Join(
                    dataList,
                    p => p.ProductCode,
                    d => d.ProductCode,
                    (p, d) => new { p.ProductName, LiveReports = d })
                    .GroupBy(
                    x => x.ProductName,
                    (key, g) => new LiveReportByBetType
                    {
                        ProductName = key,
                        LiveReports = g.Select(x => x.LiveReports).ToList()
                    }).ToList();
            }

            return result;
        }

        private string GetBetTypeName(int betType)
        {
            string suffix = GetBettypeNameSuffix(betType);
            return _cacheRefAdapter.GetBettype(Convert.ToInt32(betType), false) + suffix;
        }

        private string GetBettypeNameSuffix(int betType)
        {
            if (betType == (int)BetType.NumberGameHappy5OddEven)
            {
                return " (" + _cacheRefAdapter.GetSportName((int)SportType.NumberGameHappy5) + ")";
            }

            if (betType >= (int)BetType.VirtualBasketballOverUnder && betType <= (int)BetType.VirtualBasketballFirstHalfHandicap)
            {
                return " (" + _cacheRefAdapter.GetSportName((int)SportType.VirtualBasketball) + ")";
            }

            return string.Empty;
        }
    }
}