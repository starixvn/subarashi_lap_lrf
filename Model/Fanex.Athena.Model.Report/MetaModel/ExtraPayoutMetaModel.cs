using System.Collections.Generic;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class ExtraPayoutMetaModel : BaseDrilldownReportMetaModel
    {
        public string Username { get; set; }

        public string PromotionTypeIdList { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public IDictionary<int, string> UserCurrencyList { get; set; }

        public string CurrencyIdList { get; set; }

        public byte ReportBy { get; set; }

        public bool IsConvertAllToBaseCurrency { get; set; }

        public string BaseCurrencyName { get; set; }
    }
}