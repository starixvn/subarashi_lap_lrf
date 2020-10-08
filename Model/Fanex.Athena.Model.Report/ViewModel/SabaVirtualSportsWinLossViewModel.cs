namespace Fanex.Athena.Model.Report.ViewModel
{
    using System.Collections.Generic;
    using Core.DTO.Configuration;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ViewModel;

    public class SabaVirtualSportsWinLossViewModel : BaseViewModel
    {
        public IList<SabaVirtualSportsWinLoss> MainResult { get; set; }

        public IDictionary<string, SabaVirtualSportsWinLoss> SummaryTotal { get; set; }

        public SabaVirtualSportsWinLossMetaModel Param { get; set; }

        public ReportSetting ReportSetting { get; set; }

        public IDictionary<int, string> Sports { get; set; }

        public IDictionary<int, string> Leagues { get; set; }
    }
}