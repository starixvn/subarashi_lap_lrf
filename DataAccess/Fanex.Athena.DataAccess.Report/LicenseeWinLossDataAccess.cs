namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Core;
    using Core.Configuration.Interfaces;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.ResultModel;

    public class LicenseeWinLossDataAccess : BaseDataAccess, ILicenseeWinLossDataAccess
    {
        private readonly string[] _ignoredLicenseeWLProducts = new[] { Product.BA };
        private readonly string[] _ignoredTurnoverProducts = new[] { Product.BT, Product.CO };

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public LicenseeWinLossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetSummaryWinloss(
            LicenseeWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList,
            bool checkPromotionPrize = false)
        {
            const string UspName = "Lrf_Rpt_LicWinloss";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("reporttype", metaModel.ReportBy);
                UpdateUspParams(db, metaModel, false, checkPromotionPrize);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, false);
                }
            }
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetCustomerWinlossDetail(
            LicenseeWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList,
            bool checkPromotionPrize = false)
        {
            const string UspName = "Lrf_Rpt_LicWinlossDetail";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.DrillDownCustomerId);
                UpdateUspParams(db, metaModel, true, checkPromotionPrize);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true);
                }
            }
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetAgentWinlossDetail(
            LicenseeWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList,
            bool checkPromotionPrize = false)
        {
            const string UspName = "Lrf_Rpt_LicWinlossDetail_Ag";

            using (var db = this.GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, true, checkPromotionPrize);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true);
                }
            }
        }

        private static void ReadData(IDataReader reader, LicenseeWinLoss data, string suffixColumn = "")
        {
            data.CustomerWinLoss = reader.ToDecimal("winlost" + suffixColumn);
            data.CustomerComm = reader.ToDecimal("playercomm" + suffixColumn);
            data.TotalTransaction = reader.ToInt("betcount");
            data.CashOutCommission = reader.ToDecimal("cashoutcomm" + suffixColumn);
            data.BACommission = reader.ToDecimal("commba" + suffixColumn);
            data.BetTradeCommission = reader.ToDecimal("bettradecomm" + suffixColumn);
            data.AmtDueToBetTrade = reader.ToDecimal("AmtDueToBT" + suffixColumn);
            data.AmtDueToBA = reader.ToDecimal("amtduetoba" + suffixColumn);
            data.ActualStake = reader.ToDecimal("BTActualStake" + suffixColumn);
            data.BuyBackAmountSB = reader.ToDecimal("BuyBackAmtSB" + suffixColumn);
            data.BuyBackAmountBA = reader.ToDecimal("BuyBackAmtBA" + suffixColumn);
        }

        private static IDictionary<string, decimal> ReadProductDataList(
            IDataReader reader,
            IDictionary<string, string> columns)
        {
            var data = new Dictionary<string, decimal>();

            foreach (var column in columns)
            {
                data.Add(column.Key, reader.ToDecimal(column.Value));
            }

            return data;
        }

        private bool IsIgnoredLicenseeWLProduct(string productCode)
        {
            return _ignoredLicenseeWLProducts.Contains(productCode);
        }

        private bool IsIgnoredTurnoverProduct(string productCode)
        {
            return _ignoredTurnoverProducts.Contains(productCode);
        }

        private IDictionary<string, LicenseeWinLoss> GetSummaryTotal(
            IDataReader reader,
            LicenseeWinLossMetaModel metaModel,
            bool hasData)
        {
            var summaryTotal = new Dictionary<string, LicenseeWinLoss>();
            var baseCurrencies = SystemConstants.BaseCurrencyListOfSummaryTotalRow.Select(x => new { Name = x, SuffixColumn = x }).ToList();
            if (!string.IsNullOrEmpty(metaModel.DefaultBaseCurrency) &&
                !SystemConstants.BaseCurrencyListOfSummaryTotalRow.Any(x => x.Equals(metaModel.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase)))
            {
                baseCurrencies.Add(new { Name = metaModel.DefaultBaseCurrency.ToUpperInvariant(), SuffixColumn = string.Empty });
            }

            foreach (var currency in baseCurrencies)
            {
                var data = hasData
                    ? ReadSummaryTotal(reader, metaModel.ProductOptions, currency.SuffixColumn)
                    : new LicenseeWinLoss
                    {
                        LicenseeWL = new Dictionary<string, decimal>(),
                        TurnOver = new Dictionary<string, decimal>()
                    };

                summaryTotal.Add(currency.Name, data);
            }

            return summaryTotal;
        }

        private LicenseeWinLoss ReadSummaryTotal(IDataReader reader, IList<ProductOption> productOptions, string suffixColumn = "")
        {
            var licenseeWLColumns = GetLicenseeWLColumn(reader, productOptions, suffixColumn);
            var turnoverColumns = GetTurnoverColumn(reader, productOptions, suffixColumn);
            var data = new LicenseeWinLoss
            {
                LicenseeWL = ReadProductDataList(reader, licenseeWLColumns),
                TurnOver = ReadProductDataList(reader, turnoverColumns),
            };
            ReadData(reader, data, suffixColumn);

            return data;
        }

        private IEnumerable<LicenseeWinLoss> CalculateTotal(IEnumerable<LicenseeWinLoss> dataList)
        {
            if (dataList == null || !dataList.Any())
            {
                return new List<LicenseeWinLoss>();
            }

            return dataList.GroupBy(d => d.CurrencyName).Select(g => new LicenseeWinLoss
            {
                CurrencyName = g.Key,
                TurnOver = g.SelectMany(k => k.TurnOver).GroupBy(j => j.Key).ToDictionary(p => p.Key, p => p.Sum(j => j.Value)),
                ActualStake = g.Sum(p => p.ActualStake),
                BuyBackAmountSB = g.Sum(p => p.BuyBackAmountSB),
                BuyBackAmountBA = g.Sum(p => p.BuyBackAmountBA),
                TotalTransaction = g.Sum(p => p.TotalTransaction),
                CustomerWinLoss = g.Sum(p => p.CustomerWinLoss),
                CustomerComm = g.Sum(p => p.CustomerComm),
                LicenseeWL = g.SelectMany(k => k.LicenseeWL).GroupBy(j => j.Key).ToDictionary(p => p.Key, p => p.Sum(j => j.Value)),
                BetTradeCommission = g.Sum(p => p.BetTradeCommission),
                CashOutCommission = g.Sum(p => p.CashOutCommission),
                BACommission = g.Sum(p => p.BACommission),
                AmtDueToBetTrade = g.Sum(p => p.AmtDueToBetTrade),
                AmtDueToBA = g.Sum(p => p.AmtDueToBA)
            }).ToList();
        }

        private void UpdateUspParams(IObjectDb db, LicenseeWinLossMetaModel metaModel, bool drilldown, bool checkPromotionPrize)
        {
            db.SetParameterValue("licenseeid", metaModel.LicenseeId);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            db.SetParameterValue("drawfilter", metaModel.DrawFilter);
            db.SetParameterValue("movebetsday", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
            db.SetParameterValue("CheckPromotionPrize", checkPromotionPrize);

            foreach (var product in metaModel.ProductOptions)
            {
                db.SetParameterValue("show" + product.Code, product.Status);
            }
        }

        private SortableReportResultModel<LicenseeWinLoss> GetData(
            IDataReader reader,
            IDictionary<int, string> currencyList,
            LicenseeWinLossMetaModel metaModel,
            bool drilldown)
        {
            var dataList = new SortableList<LicenseeWinLoss>();
            var licenseeWLColumns = GetLicenseeWLColumn(reader, metaModel.ProductOptions);
            var turnoverColumns = GetTurnoverColumn(reader, metaModel.ProductOptions);

            var hasSystemId = reader.HasColumn("username");
            var hasExternalId = reader.HasColumn("nickname");
            var hasCustomerId = reader.HasColumn("custid");
            var isMonthly = metaModel.ReportBy == ReportByType.Monthly;

            var index = 0;
            while (reader.Read())
            {
                index++;
                var currencyId = reader.ToInt("currency");
                var item = new LicenseeWinLoss
                {
                    Index = index,
                    SystemId = hasSystemId ? reader.ToString("username") : string.Empty,
                    ExternalId = hasExternalId ? reader.ToString("nickname") : string.Empty,
                    CustomerId = hasCustomerId ? reader.ToInt("custid") : 0,
                    CurrencyId = currencyId,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    Date = drilldown ? metaModel.DrillDownFromDate : ConvertHelper.ToDateTime(reader.ToString("reporttype"), isMonthly),
                    LicenseeWL = ReadProductDataList(reader, licenseeWLColumns),
                    TurnOver = ReadProductDataList(reader, turnoverColumns)
                };
                ReadData(reader, item);

                dataList.Add(item);
            }

            var hasSummaryData = reader.NextResult() && reader.Read();
            var promotionPrize = hasSummaryData ? reader.ToInt("PromotionPrize") : 0;

            return new SortableReportResultModel<LicenseeWinLoss>
            {
                DataList = dataList,
                TotalDataList = CalculateTotal(dataList),
                SummaryTotal = GetSummaryTotal(reader, metaModel, hasSummaryData),
                AdditionalInfo = promotionPrize.ToString()
            };
        }

        private IDictionary<string, string> GetLicenseeWLColumn(IDataReader reader, IList<ProductOption> products, string suffix = "")
        {
            var licenseeWLColumns = new Dictionary<string, string>();

            foreach (var product in products)
            {
                var licenseeWlColumnName = "LicenseeWL" + product.Code + suffix;

                if (!IsIgnoredLicenseeWLProduct(product.Code) && reader.HasColumn(licenseeWlColumnName))
                {
                    licenseeWLColumns.Add(product.Code, licenseeWlColumnName);
                }
            }

            return licenseeWLColumns;
        }

        private IDictionary<string, string> GetTurnoverColumn(IDataReader reader, IList<ProductOption> products, string suffix = "")
        {
            var turnoverColumns = new Dictionary<string, string>();

            foreach (var product in products)
            {
                var turnOverColumnName = "turnover" + product.Code + suffix;

                if (!IsIgnoredTurnoverProduct(product.Code) && reader.HasColumn(turnOverColumnName))
                {
                    turnoverColumns.Add(product.Code, turnOverColumnName);
                }
            }

            return turnoverColumns;
        }
    }
}