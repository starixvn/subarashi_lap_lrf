namespace Fanex.Athena.Module.Dashboard.MetaModel
{
    using System;
    using System.Linq;
    using DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;

    public class DashboardBaseModel : IMetaModelCurrencyIdList, IMetaModelAgent, IMetaModelValidation
    {
        private int _currencyId;
        public int CurrencyId
        {
            get
            {
                return _currencyId;
            }
            set
            {
                _currencyId = value;
                if (value > 0)
                {
                    CurrencyIdList = value.ToString();
                }
            }
        }

        public string BaseCurrency { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string SelectedWidgetString { get; set; }

        public virtual bool IsValid
        {
            get
            {
                return string.IsNullOrEmpty(BaseCurrency) || DashboardConfig.SupportedBaseCurrencies.Contains(BaseCurrency.ToUpperInvariant());
            }
        }

        /// <summary>
        /// Used for Autobind Attribute
        /// </summary>
        public string CurrencyIdList { get; set; }
        public string AgentListXml { get; set; }
        public bool IsExcludedTestData { get; set; }
    }
}