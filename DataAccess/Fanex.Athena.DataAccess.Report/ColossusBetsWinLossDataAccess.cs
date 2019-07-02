// -----------------------------------------------------------------------
// <copyright file="ColossusBetsWinLossDataAccess.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
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

    public class ColossusBetsWinLossDataAccess : BaseDataAccess, IColossusBetsWinLossDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public ColossusBetsWinLossDataAccess(
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public async Task<SortableReportResultModel<ColossusBetWinLoss>> GetSummaryWinloss(
            ColossusBetsWinLossMetaModel metaModel, 
            IDictionary<int, string> currencyList)
        {
            return await GetData("Lrf_Rpt_ColossusBetsWinloss", currencyList, metaModel).ConfigureAwait(false);
        }

        public async Task<SortableReportResultModel<ColossusBetWinLoss>> GetWinlossDetail(ColossusBetsWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            return await GetData("Lrf_Rpt_ColossusBetsWinloss_detail", currencyList, metaModel).ConfigureAwait(false);
        }

        private static void ReadSummaryTotal(IDataReader reader, IDictionary<string, ColossusBetWinLoss> summaryTotal, string defaultBaseCurrency)
        {
            foreach (var summary in summaryTotal)
            {
                var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && summary.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)
                                     ? "Base"
                                     : summary.Key;

                summary.Value.TotalTransaction += reader.ToInt("totaltrans");
                summary.Value.TurnOver += reader.ToDecimal("turnover" + suffixColumn);
                summary.Value.MemberWinning += reader.ToDecimal("winningprize" + suffixColumn);
                summary.Value.CashOut += reader.ToDecimal("cashoutamt" + suffixColumn);
                summary.Value.CashOutShare += reader.ToDecimal("cashinamt" + suffixColumn);
                summary.Value.CommissionShare += reader.ToDecimal("commamt" + suffixColumn);
                summary.Value.GrandPrize += reader.ToDecimal("grandamt" + suffixColumn);
            }
        }

        private async Task<SortableReportResultModel<ColossusBetWinLoss>> GetData(
            string spname, 
            IDictionary<int, string> currencyList, 
            ColossusBetsWinLossMetaModel metaModel)
        {
            using (var db = this.GetObjectDb(spname))
            {
                UpdateUspParams(db, metaModel, metaModel.DrillDownLevel > (int)ReportLevel.Main);
                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return ReadData(reader, currencyList, metaModel);
                }
            }
        }

        private void UpdateUspParams(IObjectDb db, ColossusBetsWinLossMetaModel metaModel, bool drilldown)
        {
            db.SetParameterValue("fromdate", drilldown ? metaModel.DrillDownFromDate : metaModel.FromDate.Date);
            db.SetParameterValue("todate", drilldown ? metaModel.DrillDownToDate : metaModel.ToDate.Date);
            db.SetParameterValue("movebetsday", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
            db.SetParameterValue("ReportType", metaModel.ReportBy);
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("TicketType", metaModel.TicketType);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private SortableReportResultModel<ColossusBetWinLoss> ReadData(
            IDataReader reader,
             IDictionary<int, string> currencyList,
            ColossusBetsWinLossMetaModel metaModel)
        {
            var hasSystemId = reader.HasColumn("systemid");
            var hasExternalId = reader.HasColumn("externalid");
            var hasCustomerId = reader.HasColumn("custid");
            var index = 1;
            var isFirstLevel = metaModel.DrillDownLevel == (int)ReportLevel.Main;
            var isMonthly = metaModel.ReportBy == ReportByType.Monthly;
            var result = new SortableList<ColossusBetWinLoss>();
            var summaryTotal = InitSummaryTotalList(metaModel.DefaultBaseCurrency, () => new ColossusBetWinLoss());

            while (reader.Read())
            {
                var currencyId = reader.ToInt("currencyid");
                result.Add(new ColossusBetWinLoss
                {
                    Index = index++,
                    SystemId = hasSystemId ? reader.ToString("systemid") : string.Empty,
                    ExternalId = hasExternalId ? reader.ToString("externalid") : string.Empty,
                    CustomerId = hasCustomerId ? reader.ToInt("custid") : 0,
                    CurrencyId = currencyId,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    TurnOver = reader.ToDecimal("turnover"),
                    TotalTransaction = reader.ToInt("totaltrans"),
                    MemberWinning = reader.ToDecimal("winningprize"),
                    CashOut = reader.ToDecimal("cashoutamt"),
                    CashOutShare = reader.ToDecimal("cashinamt"),
                    CommissionShare = reader.ToDecimal("commamt"),
                    GrandPrize = reader.ToDecimal("grandamt"),
                    Date = isFirstLevel ? ConvertHelper.ToDateTime(reader.ToString("reporttype"), isMonthly) : metaModel.DrillDownFromDate
                });
                ReadSummaryTotal(reader, summaryTotal, metaModel.DefaultBaseCurrency);
            }

            return new SortableReportResultModel<ColossusBetWinLoss>
            {
                DataList = result,
                SummaryTotal = summaryTotal
            };
        }
    }
}