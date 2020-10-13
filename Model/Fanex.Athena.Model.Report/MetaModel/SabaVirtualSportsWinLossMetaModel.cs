namespace Fanex.Athena.Model.Report.MetaModel
{
    public class SabaVirtualSportsWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        public int Sport { get; set; }

        public int League { get; set; }

        public byte ReportBy { get; set; }

        public int DrawFilter { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public string DefaultBaseCurrency { get; set; }
    }
}