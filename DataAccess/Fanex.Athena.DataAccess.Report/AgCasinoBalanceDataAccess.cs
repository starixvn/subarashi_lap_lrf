// -----------------------------------------------------------------------
// <copyright file="AgCasinoBalanceDataAccess.cs" company="">
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
    using Core;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.ResultModel;

    public class AgCasinoBalanceDataAccess : BaseDataAccess, IAgCasinoBalanceDataAccess
    {
        public async Task<SortableReportResultModel<AgCasinoBalance>> GetSummaryBalance(
            ThirdPartyWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_AGCasinoBalance";

            using (var db = GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, false);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel);
                }
            }
        }

        public async Task<SortableReportResultModel<AgCasinoBalance>> GetCustomerBalanceDetail(
            ThirdPartyWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "LRF_Rpt_AGCasinoBalance_Mem";

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.DrillDownCustomerId);
                db.SetParameterValue("pagesize", metaModel.IsExportExcel ? SystemConstants.MaxDataTotalRow : metaModel.PageSize);
                db.SetParameterValue("pageindex", metaModel.IsExportExcel ? 1 : metaModel.PageIndex);
                db.SetParameterValue("TotalRows", null);

                UpdateUspParams(db, metaModel, true);
                SortableReportResultModel<AgCasinoBalance> result;
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    result = GetData(reader, currencyList, metaModel);
                }

                result.TotalRows = Convert.ToInt32(db.GetParameterValue("TotalRows"));

                return result;
            }
        }

        public async Task<SortableReportResultModel<AgCasinoBalance>> GetAgentBalanceDetail(ThirdPartyWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "LRF_Rpt_AGCasinoBalance_Ag";

            using (var db = GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, true);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel);
                }
            }
        }

        private static void ReadSummaryTotal(IDataReader reader, IDictionary<string, AgCasinoBalance> summaryTotal, string defaultBaseCurrency)
        {
            foreach (var summary in summaryTotal)
            {
                var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && summary.Key.Equals(defaultBaseCurrency, StringComparison.OrdinalIgnoreCase)
                                     ? "Base"
                                     : summary.Key;

                summary.Value.CustomerWinLoss += reader.ToDecimal("winlost" + suffixColumn);
                summary.Value.TotalTransaction += reader.ToInt("totaltrans");
                summary.Value.LicenseeWL += reader.ToDecimal("licenseewinlost" + suffixColumn);
                summary.Value.TurnOver += reader.ToDecimal("turnover" + suffixColumn);
                summary.Value.OpeningBalance += reader.ToDecimal("OpeningBalance" + suffixColumn);
                summary.Value.TransferIn += reader.ToDecimal("TransferIn" + suffixColumn);
                summary.Value.TransferOut += reader.ToDecimal("TransferOut" + suffixColumn);
                summary.Value.ClosingBalance += reader.ToDecimal("ClosingBalance" + suffixColumn);
            }
        }

        private static void UpdateUspParams(IObjectDb db, ThirdPartyWinLossMetaModel metaModel, bool drilldown)
        {
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private SortableReportResultModel<AgCasinoBalance> GetData(
            IDataReader reader,
            IDictionary<int, string> currencyList,
            ThirdPartyWinLossMetaModel metaModel)
        {
            var dataList = new SortableList<AgCasinoBalance>();

            var summaryTotal = InitSummaryTotalList(metaModel.DefaultBaseCurrency, () => new AgCasinoBalance());

            var hasSystemIdColumn = reader.HasColumn("username");
            var hasExternalIdColumn = reader.HasColumn("nickname");
            var hasCustomerIdColumn = reader.HasColumn("custid");
            var hasWinlostDateColumn = reader.HasColumn("date");
            var index = metaModel.DrillDownLevel == 2 ? ((metaModel.PageIndex - 1) * metaModel.PageSize) + 1 : 1;
            while (reader.Read())
            {
                var currencyId = reader.ToInt("currency");
                var item = new AgCasinoBalance
                {
                    Index = index++,
                    SystemId = hasSystemIdColumn ? reader.ToString("username") : string.Empty,
                    ExternalId = hasExternalIdColumn ? reader.ToString("nickname") : string.Empty,
                    CustomerId = hasCustomerIdColumn ? reader.ToInt("custid") : 0,
                    CurrencyId = currencyId,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    CustomerWinLoss = reader.ToDecimal("winlost"),
                    LicenseeWL = reader.ToDecimal("licenseewinlost"),
                    TurnOver = reader.ToDecimal("turnover"),
                    TotalTransaction = reader.ToInt("totaltrans"),
                    Date = hasWinlostDateColumn ? (DateTime?)reader.ToDateTime("date") : metaModel.DrillDownFromDate,
                    OpeningBalance = reader.ToDecimal("OpeningBalance"),
                    TransferIn = reader.ToDecimal("TransferIn"),
                    TransferOut = reader.ToDecimal("TransferOut"),
                    ClosingBalance = reader.ToDecimal("ClosingBalance"),
                };

                dataList.Add(item);
                ReadSummaryTotal(reader, summaryTotal, metaModel.DefaultBaseCurrency);
            }

            return new SortableReportResultModel<AgCasinoBalance>
            {
                DataList = dataList,
                SummaryTotal = summaryTotal
            };
        }
    }
}