namespace Fanex.Athena.Excel.Report.Models
{
    using System.Collections.Generic;
    using Base.Entities;
    using Model.Report.DTO;
    using Model.Report.MetaModel;

    public class SabaVirtualSportsWinLossExcelModel
    {
        public ConvertingOption ConvertingOption { get; set; }

        public SabaVirtualSportsWinLossMetaModel MetaModel { get; set; }

        public IEnumerable<LicenseeWinLoss> DataList { get; set; }

        public IEnumerable<LicenseeWinLoss> TotalData { get; set; }

        public IDictionary<string, LicenseeWinLoss> SummaryTotal { get; set; }

        public bool SBVisible { get; set; }

        public bool COVisible { get; set; }

        public bool CustomerCommVisible { get; set; }
    }
}