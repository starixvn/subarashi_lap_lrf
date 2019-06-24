namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    using Common.Extensions;
    using Core;
    using Core.Extensions;
    using Data;
    using Extension.Utility;
    using Interfaces;
    using Model.Core.ResultModel;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    public class ExchangeWinLossDataAccess : BaseDataAccess, IExchangeWinLossDataAccess
    {
        public async Task<ReportResultModel<ExchangeWinLoss>> GetMainWinloss(ExchangeWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_ExchangeWinloss";

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("ReportType", metaModel.ReportBy);
                UpdateUspParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, metaModel, currencyList);
                }
            }
        }

        public async Task<ReportResultModel<ExchangeWinLoss>> GetCustomerWinloss(ExchangeWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_ExchangeWinloss_Mem";

            using (var db = GetObjectDb(UspName))
            {
                db.SetParameterValue("CustID", metaModel.CustId);
                UpdateUspParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, metaModel, currencyList);
                }
            }
        }

        public async Task<ReportResultModel<ExchangeWinLoss>> GetLicenseeWinloss(ExchangeWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_ExchangeWinloss_Ag";

            using (var db = GetObjectDb(UspName))
            {
                UpdateUspParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    return GetData(reader, metaModel, currencyList);
                }
            }
        }

        private static void UpdateUspParams(IObjectDb db, ExchangeWinLossMetaModel metaModel)
        {
            db.SetParameterValue("AgentList", metaModel.AgentListXml);
            db.SetParameterValue("Fromdate", metaModel.FromDate.Date);
            db.SetParameterValue("Todate", metaModel.ToDate.Date);
            db.SetParameterValue("LicenseeId", metaModel.LicenseeId);
            db.SetParameterValue("BaseCurrency", metaModel.BaseCurrency);
            db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);
        }

        private static void ReadSummaryTotal(IDataReader reader, IDictionary<string, ExchangeWinLoss> summaryTotal, string defaultBaseCurrency)
        {
            foreach (var item in summaryTotal)
            {
                var suffixColumn = item.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase) ? "Base" : item.Key;
                var detail = item.Value;
                detail.Turnover += reader.ToDecimal("TurnOver" + suffixColumn);
                detail.NetTurnover += reader.ToDecimal("NetTurnOver" + suffixColumn);
                detail.CustomerWL += reader.ToDecimal("Winlost" + suffixColumn);
                detail.CustomerComm += reader.ToDecimal("CustComm" + suffixColumn);
                detail.LicenseeWL += reader.ToDecimal("LicenseeWinlost" + suffixColumn);
                detail.LicenseeNetWL += reader.ToDecimal("LicNetWL" + suffixColumn);
                detail.LicenseeComm += reader.ToDecimal("AgentComm" + suffixColumn);
                detail.AmountDueTo += reader.ToDecimal("AmountDueTo" + suffixColumn);
                detail.TotalTransaction += reader.ToInt("TotalTrans");
            }
        }

        private static IEnumerable<ExchangeWinLoss> CalculateTotal(IEnumerable<ExchangeWinLoss> dataList)
        {
            if (!dataList.Any())
            {
                return new List<ExchangeWinLoss>();
            }

            return dataList.GroupBy(x => new { x.CurrencyId, x.CurrencyName }).Select(g => new ExchangeWinLoss
            {
                CurrencyId = g.Key.CurrencyId,
                CurrencyName = g.Key.CurrencyName,
                Turnover = g.Sum(x => x.Turnover),
                TotalTransaction = g.Sum(x => x.TotalTransaction),
                CustomerWL = g.Sum(x => x.CustomerWL),
                CustomerComm = g.Sum(x => x.CustomerComm),
                LicenseeWL = g.Sum(x => x.LicenseeWL),
                LicenseeNetWL = g.Sum(x => x.LicenseeNetWL),
                LicenseeComm = g.Sum(x => x.LicenseeComm),
                AmountDueTo = g.Sum(x => x.AmountDueTo),
                NetTurnover = g.Sum(x => x.NetTurnover)
            }).ToList();
        }

        private ReportResultModel<ExchangeWinLoss> GetData(IDataReader reader, ExchangeWinLossMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            var dataList = new List<ExchangeWinLoss>();
            var summaryTotal = InitSummaryTotalList(metaModel.DefaultBaseCurrency, () => new ExchangeWinLoss());
            var hasSystemId = reader.HasColumn("username");
            var hasExternalId = reader.HasColumn("nickname");
            var hasCustomerId = reader.HasColumn("custid");
            var hasWinlostdate = reader.HasColumn("Winlostdate");

            while (reader.Read())
            {
                var currencyId = reader.ToInt("CurrencyID");
                var item = new ExchangeWinLoss
                {
                    Date = hasWinlostdate ? reader.ToDateTime("Winlostdate") : metaModel.ToDate,
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    CurrencyId = currencyId,
                    ExternalId = hasExternalId ? reader.ToString("nickname") : string.Empty,
                    SystemId = hasSystemId ? reader.ToString("username") : string.Empty,
                    CustId = hasCustomerId ? reader.ToInt("CustID") : 0,
                    TotalTransaction = reader.ToInt("TotalTrans"),
                    Turnover = reader.ToDecimal("TurnOver"),
                    NetTurnover = reader.ToDecimal("NetTurnOver"),
                    CustomerWL = reader.ToDecimal("Winlost"),
                    CustomerComm = reader.ToDecimal("CustComm"),
                    LicenseeWL = reader.ToDecimal("LicenseeWinlost"),
                    LicenseeNetWL = reader.ToDecimal("LicNetWL"),
                    LicenseeComm = reader.ToDecimal("AgentComm"),
                    AmountDueTo = reader.ToDecimal("AmountDueTo")
                };

                dataList.Add(item);
                ReadSummaryTotal(reader, summaryTotal, metaModel.DefaultBaseCurrency);
            }

            return new ReportResultModel<ExchangeWinLoss>
            {
                DataList = dataList,
                TotalDataList = CalculateTotal(dataList),
                SummaryTotal = summaryTotal,
                AdditionalInfo = metaModel.IsConvert ? metaModel.BaseCurrency.ToUpperInvariant() : string.Empty
            };
        }
    }
}