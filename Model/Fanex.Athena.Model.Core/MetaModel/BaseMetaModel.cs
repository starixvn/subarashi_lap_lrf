// -----------------------------------------------------------------------
// <copyright file="BaseMetaModel.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Core.MetaModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Web.Script.Serialization;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.Helper;

    [Serializable]
    public class BaseMetaModel : IMetaModelCurrency, IMetaModelValidation, IMetaModelAgent
    {
        private string _baseCurrency = string.Empty;

        [ScriptIgnore]
        public string AgentListXml { get; set; }

        public int LicenseeId { get; set; }

        public int UserId { get; set; }

        public int CurrencyId { get; set; }

        [DefaultValue("")]
        public string CurrencyName { get; set; }

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

        public int BaseCurrencyId
        {
            get
            {
                return SystemConstants.BaseCurrencyList
                     .Where(x => BaseCurrency.Equals(x.Value, StringComparison.OrdinalIgnoreCase))
                     .DefaultIfEmpty(new KeyValuePair<int, string>(BaseCurrencyType.All, string.Empty))
                     .Select(x => x.Key).FirstOrDefault();

            }
        }

        public virtual bool IsConvert
        {
            get
            {
                return !string.IsNullOrEmpty(BaseCurrency);
            }
        }
        public virtual bool IsValid =>
            MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency);

        public bool IsExcludedTestData { get; set; }
    }
}