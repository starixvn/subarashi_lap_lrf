namespace Fanex.Athena.DataAccess.Report
{
    using System.Collections.Generic;
    using System.Data;
    using Common.Extensions;
    using Core;
    using Core.Configuration.Interfaces;
    using Extension.Utility;
    using Interfaces;
    using Model.Core.ResultModel;
    using Model.Report;
    using Model.Report.MetaModel;

    public class PromotionPrizeDataAccess : BaseDataAccess, IPromotionPrizeDataAccess
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public PromotionPrizeDataAccess(IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        public ReportResultModel<PromotionPrize> GetData(PromotionPrizeMetaModel metaModel, IDictionary<int, string> currencyList)
        {
            const string UspName = "Lrf_Rpt_PP_PromotionPrize";

            using (var db = this.GetObjectDb(UspName))
            {
                db.SetParameterValue("AgentId", metaModel.AgentId);
                db.SetParameterValue("UserName", metaModel.UserName);
                db.SetParameterValue("FromDate", metaModel.FromDate);
                db.SetParameterValue("ToDate", metaModel.ToDate);
                db.SetParameterValue("MoveBetsDay", _balanceUpDataAccess.GetBalanceUp().MoveBetsDay);
                db.SetParameterValue("AgentList", metaModel.AgentListXml);
                db.SetParameterValue("DefaultBaseCurrency", metaModel.DefaultBaseCurrency);

                using (var reader = db.ExecuteReader())
                {
                    return GetData(reader, currencyList, metaModel.DefaultBaseCurrency);
                }
            }
        }

        private ReportResultModel<PromotionPrize> GetData(IDataReader reader, IDictionary<int, string> currencyList, string defaultBaseCurrency)
        {
            var dataList = new List<PromotionPrize>();
            var summaryTotal = InitSummaryTotalList<PromotionPrize>(defaultBaseCurrency);

            while (reader.Read())
            {
                var currencyId = reader.ToInt("CurrencyId");
                var item = new PromotionPrize
                {
                    SystemId = reader.ToString("UserName"),
                    ExternalId = reader.ToString("NickName"),
                    CurrencyName = currencyList?.GetValueOrDefault(currencyId, currencyId.ToString()),
                    Amount = reader.ToDecimal("Amount"),
                    Date = reader.ToDateTime("Date")
                };

                dataList.Add(item);
            }

            reader.NextResult();
            if (reader.Read())
            {
                foreach (var total in summaryTotal)
                {
                    var suffixColumn = !string.IsNullOrEmpty(defaultBaseCurrency) && total.Key.Equals(defaultBaseCurrency, System.StringComparison.OrdinalIgnoreCase)
                                     ? "Base"
                                     : total.Key;

                    total.Value.CurrencyName = total.Key;
                    total.Value.Amount = reader.ToDecimal("SumAmount" + suffixColumn);
                }
            }

            return new ReportResultModel<PromotionPrize>
            {
                DataList = dataList,
                SummaryTotal = summaryTotal,
                TotalRows = dataList.Count
            };
        }
    }
}