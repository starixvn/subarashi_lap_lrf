namespace Fanex.Athena.DataAccess.Report
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.ResultModel;

    public class GoldDeluxeWinLossDataAccess : ThirdPartyWinLossDataAccess<GoldDeluxeWinLoss>, IGoldDeluxeWinLossDataAccess
    {
        public async Task<ReportResultModel<GoldDeluxeWinLoss>> GetSummaryWinloss(ThirdPartyWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            return await GetSummaryWinloss(metaModel, currencyList, "Lrf_Rpt_GoldDeluxeWinloss").ConfigureAwait(false);
        }

        public async Task<ReportResultModel<GoldDeluxeWinLoss>> GetCustomerWinlossDetail(ThirdPartyWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            return await GetCustomerWinlossDetail(metaModel, currencyList, "Lrf_Rpt_GoldDeluxeWinloss_Mem").ConfigureAwait(false);
        }

        public async Task<ReportResultModel<GoldDeluxeWinLoss>> GetAgentWinlossDetail(ThirdPartyWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            return await GetAgentWinlossDetail(metaModel, currencyList, "Lrf_Rpt_GoldDeluxeWinloss_Ag").ConfigureAwait(false);
        }

        protected override void ReadSummaryTotal(IDataReader reader, IDictionary<string, GoldDeluxeWinLoss> summaryTotal, string defaultBaseCurrency)
        {
            foreach (var summary in summaryTotal)
            {
                var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && summary.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)
                                     ? "Base"
                                     : summary.Key;

                var item = summary.Value;
                item.CustomerWinLoss += reader.ToDecimal("winlost" + suffixColumn);
                item.TotalTransaction += reader.ToInt("totaltrans");
                item.LicenseeWL += reader.ToDecimal("licenseewinlost" + suffixColumn);
                item.TurnOver += reader.ToDecimal("turnover" + suffixColumn);
                item.TipAmount += reader.ToDecimal("tipsamount" + suffixColumn);
                item.TipSharing += reader.ToDecimal("tipssharing" + suffixColumn);
                item.AmountDue += reader.ToDecimal("amountdue" + suffixColumn);
            }
        }

        [CLSCompliant(false)]
        protected override void UpdateUspParams(IObjectDb db, ThirdPartyWinLossMetaModel metaModel, bool drilldown)
        {
            base.UpdateUspParams(db, metaModel, drilldown);
            db.SetParameterValue("licenseeId", metaModel.LicenseeId);
        }

        protected override void PostReadItem(IDataReader reader, GoldDeluxeWinLoss item)
        {
            item.TipAmount = reader.ToDecimal("tipsamount");
            item.TipSharing = reader.ToDecimal("tipssharing");
            item.AmountDue = reader.ToDecimal("amountdue");
        }

        protected override IEnumerable<GoldDeluxeWinLoss> CalculateTotal(IEnumerable<GoldDeluxeWinLoss> dataList)
        {
            if (dataList == null || !dataList.Any())
            {
                return new List<GoldDeluxeWinLoss>();
            }

            return dataList.GroupBy(d => d.CurrencyName).Select(g => new GoldDeluxeWinLoss
            {
                CurrencyName = g.Key,
                TurnOver = g.Sum(p => p.TurnOver),
                TotalTransaction = g.Sum(p => p.TotalTransaction),
                CustomerWinLoss = g.Sum(p => p.CustomerWinLoss),
                LicenseeWL = g.Sum(p => p.LicenseeWL),
                TipAmount = g.Sum(p => p.TipAmount),
                TipSharing = g.Sum(p => p.TipSharing),
                AmountDue = g.Sum(p => p.AmountDue)
            }).ToList();
        }
    }
}