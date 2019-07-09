// -----------------------------------------------------------------------
// <copyright file="CashOutWinLossDataAccess.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Threading.Tasks;
    using Core;
    using Core.Configuration.Interfaces;
    using Extension.Helper;
    using Fanex.Athena.DataAccess.Core.Extensions;
    using Fanex.Athena.DataAccess.Report.Interfaces;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Common.Extensions;
    using Fanex.Data;
    using Model.Core.ResultModel;

    public class CashOutWinLossDataAccess : BaseDataAccess, ICashOutWinLossDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public CashOutWinLossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<SortableReportResultModel<CashOutWinLoss>> GetSummary(
            ThirdPartyWinLossMetaModel metaModel,
            IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_CashoutWinloss";

            using (var db = this.GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, false);
                db.SetParameterValue("ReportType", metaModel.ReportBy);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    var result = GetData(reader, currencyList, metaModel);
                    AssignRowSpan(result.DataList);
                    return result;
                }
            }
        }

        public async Task<SortableReportResultModel<CashOutWinLoss>> GetDetail(ThirdPartyWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_CashoutWinloss_Detail";

            using (var db = GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel, true);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, currencyList, metaModel);
                }
            }
        }

        private static void ReadSummaryTotal(IDataReader reader, IDictionary<string, CashOutWinLoss> summaryTotal, string defaultBaseCurrency)
        {
            foreach (var summary in summaryTotal)
            {
                var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && summary.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)
                                     ? "Base"
                                     : summary.Key;

                summary.Value.CashOutValue += reader.ToDecimal("cashoutvalue" + suffixColumn);
                summary.Value.CashOutTickets += reader.ToInt("cashoutticket");
                summary.Value.CashOutTimes += reader.ToInt("cashouttime");
                summary.Value.BuyBackAmountSB += reader.ToDecimal("buybackamountSB" + suffixColumn);
                summary.Value.BuyBackAmountBA += reader.ToDecimal("buybackamountBA" + suffixColumn);
                summary.Value.TicketPayout += reader.ToDecimal("ticketpayout" + suffixColumn);
                summary.Value.CashOutCommission += reader.ToDecimal("cashoutcomm" + suffixColumn);
                summary.Value.SettleAmountTicketPayout += reader.ToDecimal("AmountDue_TicketPayout" + suffixColumn);
                summary.Value.SettleAmountBuyBackComm += reader.ToDecimal("AmountDue_Comm" + suffixColumn);
                summary.Value.SettleAmountTotal += reader.ToDecimal("Amount_Total" + suffixColumn);
            }
        }

        private static void AssignRowSpan(IEnumerable<CashOutWinLoss> dataList)
        {
            var date = new System.DateTime();
            var index = 1;
            foreach (var item in dataList)
            {
                if (date != item.Date)
                {
                    date = item.Date;
                    item.RowSpan = dataList.Count(x => x.Date == item.Date);
                    item.Index = index++;
                }
                else
                {
                    item.RowSpan = -1;
                }
            }
        }

        private static IEnumerable<CashOutWinLoss> CalculateTotal(IEnumerable<CashOutWinLoss> dataList)
        {
            if (dataList == null || !dataList.Any())
            {
                return new List<CashOutWinLoss>();
            }

            return dataList.GroupBy(d => d.CurrencyName).Select(g => new CashOutWinLoss
            {
                CurrencyName = g.Key,
                CashOutTimes = g.Sum(p => p.CashOutTimes),
                CashOutTickets = g.Sum(p => p.CashOutTickets),
                CashOutValue = g.Sum(p => p.CashOutValue),
                BuyBackAmountSB = g.Sum(p => p.BuyBackAmountSB),
                BuyBackAmountBA = g.Sum(p => p.BuyBackAmountBA),
                TicketPayout = g.Sum(p => p.TicketPayout),
                CashOutCommission = g.Sum(p => p.CashOutCommission),
                SettleAmountTicketPayout = g.Sum(p => p.SettleAmountTicketPayout),
                SettleAmountBuyBackComm = g.Sum(p => p.SettleAmountBuyBackComm),
                SettleAmountTotal = g.Sum(p => p.SettleAmountTotal),
            }).ToList();
        }

        private void UpdateUspParams(IObjectDb db, ThirdPartyWinLossMetaModel metaModel, bool drilldown)
        {
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        [SuppressMessage("StyleCop.CSharp.StylecopPlus.Rules", "SP2101:MethodMustNotContainMoreLinesThan",
            Justification = "Reviewed. Suppression is OK here.")]
        private SortableReportResultModel<CashOutWinLoss> GetData(IDataReader reader, IDictionary<int, string> currencyList, ThirdPartyWinLossMetaModel metaModel)
        {
            var result = new SortableList<CashOutWinLoss>();

            var summaryTotal = InitSummaryTotalList(metaModel.DefaultBaseCurrency, () => new CashOutWinLoss());

            var hasSystemId = reader.HasColumn("systemid");
            var hasExternalId = reader.HasColumn("externalid");
            var hasCustomerId = reader.HasColumn("custid");
            var isDrilldown = metaModel.DrillDownLevel > 0;
            var index = 1;
            while (reader.Read())
            {
                var currencyId = reader.ToInt("currencyid");
                var item = new CashOutWinLoss
                {
                    Index = index++,
                    SystemId = hasSystemId ? reader.ToString("systemid") : string.Empty,
                    ExternalId = hasExternalId ? reader.ToString("externalid") : string.Empty,
                    CustomerId = hasCustomerId ? reader.ToInt("custid") : 0,
                    CurrencyId = currencyId,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    CashOutTimes = reader.ToInt("cashouttime"),
                    CashOutValue = reader.ToDecimal("cashoutvalue"),
                    CashOutTickets = reader.ToInt("cashoutticket"),
                    BuyBackAmountSB = reader.ToDecimal("buybackamountSB"),
                    BuyBackAmountBA = reader.ToDecimal("buybackamountBA"),
                    TicketPayout = reader.ToDecimal("ticketpayout"),
                    CashOutCommission = reader.ToDecimal("cashoutcomm"),
                    SettleAmountTicketPayout = reader.ToDecimal("AmountDue_TicketPayout"),
                    SettleAmountBuyBackComm = reader.ToDecimal("AmountDue_Comm"),
                    SettleAmountTotal = reader.ToDecimal("Amount_Total"),
                    Date = isDrilldown
                        ? metaModel.DrillDownFromDate
                        : ConvertHelper.ToDateTime(reader.ToString("reporttype"), metaModel.ReportBy == ReportByType.Monthly)
                };

                result.Add(item);
                ReadSummaryTotal(reader, summaryTotal, metaModel.DefaultBaseCurrency);
            }

            return new SortableReportResultModel<CashOutWinLoss>
            {
                DataList = result,
                TotalDataList = CalculateTotal(result),
                SummaryTotal = summaryTotal
            };
        }
    }
}