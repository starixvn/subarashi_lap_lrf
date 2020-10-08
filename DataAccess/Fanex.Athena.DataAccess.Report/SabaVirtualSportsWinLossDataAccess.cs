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

    public class SabaVirtualSportsWinLossDataAccess : BaseDataAccess, ISabaVirtualSportsWinLossDataAccess
    {
        private readonly string[] _ignoredLicenseeWLProducts = new[] { Product.BA };
        private readonly string[] _ignoredTurnoverProducts = new[] { Product.BT, Product.CO };

        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public SabaVirtualSportsWinLossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetSummaryWinloss(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_SabaVirtualSportsWinLoss";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("reporttype", metaModel.ReportBy);
                UpdateUspParams(db, metaModel, false);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, false);
                }
            }
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetCustomerWinlossDetail(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_SabaVirtualSportsWinLoss_Mem";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentId", metaModel.DrillDownCustomerId);
                UpdateUspParams(db, metaModel, true);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true);
                }
            }
        }

        public async Task<SortableReportResultModel<LicenseeWinLoss>> GetAgentWinlossDetail(
            SabaVirtualSportsWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_SabaVirtualSportsWinLoss_Ag";
            const string CustomerColumn = "Recommend";

            using (var db = this.GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, true);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true, CustomerColumn);
                }
            }
        }

        private static void ReadData(IDataReader reader, LicenseeWinLoss data, string suffixColumn = "")
        {
            data.CustomerWinLoss = reader.ToDecimal("winlost" + suffixColumn);
            data.CustomerComm = reader.ToDecimal("playercomm" + suffixColumn);
            data.TotalTransaction = reader.ToInt("betcount");
            data.CashOutCommission = reader.ToDecimal("cashoutcomm" + suffixColumn);
            data.BACommission = reader.ToDecimal("bacomm" + suffixColumn);
            data.AmtDueToBA = reader.ToDecimal("amtduetoba" + suffixColumn);
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
            SabaVirtualSportsWinLossMetaModel metaModel,
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
                TotalTransaction = g.Sum(p => p.TotalTransaction),
                CustomerWinLoss = g.Sum(p => p.CustomerWinLoss),
                CustomerComm = g.Sum(p => p.CustomerComm),
                LicenseeWL = g.SelectMany(k => k.LicenseeWL).GroupBy(j => j.Key).ToDictionary(p => p.Key, p => p.Sum(j => j.Value)),
                CashOutCommission = g.Sum(p => p.CashOutCommission),
                BACommission = g.Sum(p => p.BACommission),
                AmtDueToBA = g.Sum(p => p.AmtDueToBA)
            }).ToList();
        }

        private void UpdateUspParams(IObjectDb db, SabaVirtualSportsWinLossMetaModel metaModel, bool drilldown)
        {
            db.SetParameterValue("SportType", metaModel.Sport);
            db.SetParameterValue("LeagueId", metaModel.League);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            db.SetParameterValue("drawfilter", metaModel.DrawFilter);
            db.SetParameterValue("movebetsday", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private SortableReportResultModel<LicenseeWinLoss> GetData(
            IDataReader reader,
            IDictionary<int, string> currencyList,
            SabaVirtualSportsWinLossMetaModel metaModel,
            bool drilldown,
            string customerColumn = "CustId")
        {
            var dataList = new SortableList<LicenseeWinLoss>();
            var licenseeWLColumns = GetLicenseeWLColumn(reader, metaModel.ProductOptions);
            var turnoverColumns = GetTurnoverColumn(reader, metaModel.ProductOptions);

            var hasSystemId = reader.HasColumn("username");
            var hasExternalId = reader.HasColumn("nickname");
            var hasCustomerId = reader.HasColumn(customerColumn);
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
                    CustomerId = hasCustomerId ? reader.ToInt(customerColumn) : 0,
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

            return new SortableReportResultModel<LicenseeWinLoss>
            {
                DataList = dataList,
                TotalDataList = CalculateTotal(dataList),
                SummaryTotal = GetSummaryTotal(reader, metaModel, hasSummaryData)
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