namespace Fanex.Athena.Model.Report.ViewModel
{
    using System.Collections.Generic;
    using Core.DTO.Configuration;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ViewModel;

    public class LicenseeWinLossViewModel : BaseViewModel
    {
        public bool IgnoreSharding { get; set; }

        public bool IsHistory { get; set; }
        public IList<LicenseeWinLoss> MainResult { get; set; }

        public IDictionary<string, LicenseeWinLoss> SummaryTotal { get; set; }

        public LicenseeWinLossMetaModel Param { get; set; }

        public ReportSetting ReportSetting { get; set; }

    }
}