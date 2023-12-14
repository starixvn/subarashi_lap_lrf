namespace Fanex.Athena.Model.Report.ViewModel
{
    public class GrossGamingRevenueViewModel : SpecialLicenseeWinLossViewModel
    {
        public string BaseCurrencySetting { get; set; }

        public string SiteName { get; set; }

        public string DefaultBaseCurrency { get; set; }

        public byte ViewMode { get; set; }
    }
}