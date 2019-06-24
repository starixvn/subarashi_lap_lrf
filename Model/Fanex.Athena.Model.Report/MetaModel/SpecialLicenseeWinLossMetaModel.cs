namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.ComponentModel;
    using System.Linq;

    public class SpecialLicenseeWinLossMetaModel : IMetaModelValidation, IMetaModelCurrency
    {
        private string _baseCurrency = string.Empty;

        public int CurrencyId { get; set; }

        [DefaultValue("")]
        public string BaseCurrency
        {
            get
            {
                return _baseCurrency;
            }

            set
            {
                _baseCurrency = value == null
                    ? string.Empty
                    : value.ToLowerInvariant();
            }
        }

        public byte ReportBy { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string[] ProductCodeList { get; set; }

        public string BaseCurrencySetting { get; set; }

        public string SiteName { get; set; }

        public string CurrencyListXml { get; set; }

        public string DefaultBaseCurrency { get; set; }

        public bool IsValid => CurrencyId >= SystemConstants.MinBaseCurrencyType
            && (string.IsNullOrEmpty(BaseCurrency) || SystemConstants.BaseCurrencyList
            .Any(x => x.Value.Equals(BaseCurrency, StringComparison.OrdinalIgnoreCase)));
    }
}