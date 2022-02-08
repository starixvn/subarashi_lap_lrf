using System.Collections.Generic;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class NewCashOutWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public IDictionary<int, string> UserCurrencyList { get; set; }

        public string CurrencyIdList { get; set; }

        public byte ReportBy { get; set; }

        public bool IsConvertAllToBaseCurrency { get; set; }

        public string BaseCurrencyName { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}