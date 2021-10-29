namespace Fanex.Athena.Model.Report.ViewModel
{
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.ViewModel;
    using Fanex.Athena.Model.Report.MetaModel;
    using System.Collections.Generic;

    public class LeagueWinLossViewModel : BaseViewModel
    {
        public LeagueWinLossMetaModel Param { get; set; }

        public ReportSetting ReportSetting { get; set; }

        public IDictionary<int, string> Sports { get; set; }

        public IEnumerable<CheckedItem> StatusList { get; set; }
    }
}