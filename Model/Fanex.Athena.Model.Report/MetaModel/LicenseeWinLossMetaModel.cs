using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class LicenseeWinLossMetaModel : BaseDrilldownReportMetaModel, IMetaModelSubsidiarySearch
    {
        public byte ReportBy { get; set; }

        public int DrawFilter { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public string DefaultBaseCurrency { get; set; }

        public bool IsVIPPlayerOnly { get; set; }

        public bool HasVIPManagementPermission { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}