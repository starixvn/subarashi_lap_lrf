using System.Collections.Generic;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class GodOfFortuneWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        public int DrawFilter { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public byte ReportBy { get; set; }

        public IDictionary<int, string> UserCurrencyList { get; set; }

        public bool IsConvertAll { get; set; }

        public string CurrencyIdList { get; set; }
    }
}