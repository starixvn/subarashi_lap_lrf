// -----------------------------------------------------------------------
// <copyright file="WinLossByProductDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Configuration.Interfaces;
    using Extension.Utility;
    using Fanex.Athena.DataAccess.Core;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.DTO.Common;
    using Model.Core.Helper;
    using Model.Report.ResultModel;

    public class WinLossByProductDataAccess : BaseDataAccess, IWinLossByProductDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public WinLossByProductDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<WinLossByProductResultModel> GetWinlossByProducts(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_WinlossByProduct";

            WinLossByProductResultModel data;
            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("reporttype", metaModel.ReportBy);
                db.SetParameterValue("username", metaModel.Username);
                db.SetParameterValue("SystemName", null);
                db.SetParameterValue("CustID", null);
                UpdateUspParams(db, metaModel, false);
                AddResultParam(db);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    data = GetData(reader, currencyList, metaModel, false);
                }

                var resultInfo = GetResult(db);
                resultInfo.ExtendedData = db.GetParameterValue("CustID") + ";" + db.GetParameterValue("SystemName");
                data.ResultInfo = resultInfo;
            }

            return data;
        }

        public async Task<WinLossByProductResultModel> GetWinlossByProductAgents(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_WinlossByProductDetail_Ag";

            using (var db = this.GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, true);
                db.SetParameterValue("CustID", metaModel.MemberId);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true);
                }
            }
        }

        public async Task<WinLossByProductResultModel> GetWinlossByProductCustomers(WinLossByProductMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_WinlossByProductDetail";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.CustomerId);
                db.SetParameterValue("MemberID", metaModel.MemberId);
                UpdateUspParams(db, metaModel, true);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel, true);
                }
            }
        }

        private static void ReadSummary(IDataReader reader, IDictionary<string, IList<WinLossByProduct>> summaryTotalTemp, string defaultBaseCurrency)
        {
            foreach (var summary in summaryTotalTemp)
            {
                var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && summary.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)
                                    ? "Base"
                                    : summary.Key;

                var summaryItem = new WinLossByProduct
                {
                    ProductCode = reader.ToString("productcode"),
                    TurnOver = reader.ToDecimal("turnover" + suffixColumn),
                    CustomerWinLoss = reader.ToDecimal("winlost" + suffixColumn),
                    CustomerComm = reader.ToDecimal("playercomm" + suffixColumn),
                    LicenseeWL = reader.ToDecimal("licenseewl" + suffixColumn),
                    TotalTransaction = reader.ToInt("betcount"),
                    AmountDue = reader.ToDecimal("amtdueto3rd" + suffixColumn),
                    LicenseeWLComm = reader.ToDecimal("comm" + suffixColumn),
                };
                summary.Value.Add(summaryItem);
            }
        }

        private static IDictionary<string, IEnumerable<WinLossByProduct>> CalculateSummaryTotal(
            IDictionary<string, IList<WinLossByProduct>> summaryTotalTemp)
        {
            var summaryTotal = new Dictionary<string, IEnumerable<WinLossByProduct>>();
            foreach (var summary in summaryTotalTemp)
            {
                summaryTotal[summary.Key] = summary.Value.GroupBy(i => i.ProductCode)
                                    .Select(i => new WinLossByProduct
                                    {
                                        ProductCode = i.Key,
                                        ProductName = ProductHelper.GetProductName(i.Key),
                                        TurnOver = i.Sum(j => j.TurnOver),
                                        CustomerWinLoss = i.Sum(j => j.CustomerWinLoss),
                                        CustomerComm = i.Sum(j => j.CustomerComm),
                                        LicenseeWL = i.Sum(j => j.LicenseeWL),
                                        TotalTransaction = i.Sum(j => j.TotalTransaction),
                                        AmountDue = i.Sum(j => j.AmountDue),
                                        LicenseeWLComm = i.Sum(j => j.LicenseeWLComm),
                                    }).ToList();
            }

            return summaryTotal;
        }

        private static IEnumerable<WinLossByProduct> CalculateTotal(IEnumerable<WinLossByProduct> dataList)
        {
            var temp = from item in dataList
                       group item by new { item.CurrencyName, item.ProductCode } into g
                       select new WinLossByProduct
                       {
                           ProductCode = g.Key.ProductCode,
                           ProductName = g.First().ProductName,
                           CurrencyName = g.Key.CurrencyName,
                           AmountDue = g.Sum(i => i.AmountDue),
                           CustomerComm = g.Sum(i => i.CustomerComm),
                           CustomerWinLoss = g.Sum(i => i.CustomerWinLoss),
                           LicenseeWL = g.Sum(i => i.LicenseeWL),
                           TurnOver = g.Sum(i => i.TurnOver),
                           TotalTransaction = g.Sum(i => i.TotalTransaction),
                           LicenseeWLComm = g.Sum(i => i.LicenseeWLComm),
                       };
            return temp.OrderBy(i => i.CurrencyName).ToList();
        }

        private void UpdateUspParams(IObjectDb db, WinLossByProductMetaModel metaModel, bool drilldown)
        {
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate.Date : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate.Date : metaModel.ToDate.Date);
            db.SetParameterValue("drawfilter", metaModel.DrawFilter);
            db.SetParameterValue("movebetsday", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("productList", string.Join(",", metaModel.ProductOptions.Where(x => x.Status).Select(x => x.Code)));
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private WinLossByProductResultModel GetData(
            IDataReader reader,
             IDictionary<int, string> currencyList,
            WinLossByProductMetaModel metaModel,
            bool drilldown)
        {
            var result = new List<WinLossByProduct>();
            var summaryTotalTemp = InitSummaryTotalList<IList<WinLossByProduct>>(metaModel.DefaultBaseCurrency, () => new List<WinLossByProduct>());

            var hasSystemId = reader.HasColumn("username");
            var hasExternalId = reader.HasColumn("nickname");
            var hasCustomerId = reader.HasColumn("custid");

            while (reader.Read())
            {
                var currencyId = reader.ToInt("currency");
                var productCode = reader.ToString("productcode");
                var item = new WinLossByProduct
                {
                    SystemId = hasSystemId ? reader.ToString("username") : string.Empty,
                    ExternalId = hasExternalId ? reader.ToString("nickname") : string.Empty,
                    CustomerId = hasCustomerId ? reader.ToInt("custid") : 0,
                    ProductCode = productCode,
                    ProductName = ProductHelper.GetProductName(productCode),
                    CurrencyId = currencyId,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    TurnOver = reader.ToDecimal("turnover"),
                    CustomerWinLoss = reader.ToDecimal("winlost"),
                    CustomerComm = reader.ToDecimal("playercomm"),
                    LicenseeWL = reader.ToDecimal("licenseewl"),
                    TotalTransaction = reader.ToInt("betcount"),
                    AmountDue = reader.ToDecimal("amtdueto3rd"),
                    LicenseeWLComm = reader.ToDecimal("comm"),
                    Date = drilldown
                    ? metaModel.DrillDownFromDate
                    : ConvertHelper.ToDateTime(reader.ToString("reporttype"), metaModel.ReportBy == ReportByType.Monthly)
                };
                result.Add(item);

                ReadSummary(reader, summaryTotalTemp, metaModel.DefaultBaseCurrency);
            }

            return new WinLossByProductResultModel
            {
                DataList = result,
                TotalData = CalculateTotal(result),
                SummaryTotal = CalculateSummaryTotal(summaryTotalTemp),
                ResultInfo = new ResultInfo()
            };
        }
    }
}