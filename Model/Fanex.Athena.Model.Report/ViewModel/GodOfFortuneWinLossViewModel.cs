namespace Fanex.Athena.Model.Report.ViewModel
{
    using Core.DTO.Configuration;
    using Fanex.Athena.Model.Report.MetaModel;
    using Model.Core.ViewModel;

    public class GodOfFortuneWinLossViewModel : BaseViewModel
    {
        public GodOfFortuneWinLossMetaModel Param { get; set; }

        public ReportSetting ReportSetting { get; set; }
    }
}