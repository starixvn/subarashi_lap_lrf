namespace Fanex.Athena.Model.Report.ViewModel
{
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.ViewModel;
    using Fanex.Athena.Model.Report.MetaModel;
    using System;
    using System.Collections.Generic;

    public class AbnormalBetViewModel : BaseViewModel
    {
        public AbnormalBetViewModel()
        {
            FromDate = DateTime.Today;
            ToDate = DateTime.Today;
        }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public ReportSetting ReportSetting { get; set; }

        public IDictionary<int, string> Sports { get; set; }

        public IDictionary<int, string> Bettypes { get; set; }

        public IDictionary<int, string> LiveStatusList { get; set; }

        public IDictionary<int, string> ReasonList { get; set; }
    }
}