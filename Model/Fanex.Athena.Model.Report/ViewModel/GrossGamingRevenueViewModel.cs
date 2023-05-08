namespace Fanex.Athena.Model.Report.ViewModel
{
    using System.Collections.Generic;
    using Core.DTO.Configuration;
    using MetaModel;

    public class GrossGamingRevenueViewModel : SpecialLicenseeWinLossViewModel
    {
        public string BaseCurrencySetting { get; set; }

        public string SiteName { get; set; }

        public string DefaultBaseCurrency { get; set; }

        public byte ViewMode { get; set; }
    }
}