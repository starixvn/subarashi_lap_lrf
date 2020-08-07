// -----------------------------------------------------------------------
// <copyright file="LicenseeWinLossMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class LicenseeWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        public byte ReportBy { get; set; }

        public int DrawFilter { get; set; }

        public string DrillDownCurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public string DefaultBaseCurrency { get; set; }
    }
}