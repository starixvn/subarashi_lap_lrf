using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    public class PlayerBtcSingleCustomerMetaModel : IMetaModelAgent, IMetaModelCurrencyList
    {
        private const int DefaultPageSize = 50;

        private string _baseCurrency = string.Empty;

        private string _userName;

        public PlayerBtcSingleCustomerMetaModel()
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
        }

        public string ProductCodeList { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string AgentListXml { get; set; }

        public string UserName
        {
            get
            {
                return _userName;
            }

            set
            {
                _userName = value?.Trim();
            }
        }

        public string Status { get; set; }

        public string LiveStatus { get; set; }

        public int Platform { get; set; }

        public bool IsExport { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public bool HasPlayerCom { get; set; }

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

        public IDictionary<int, string> CurrencyList { get; set; }

        public virtual bool IsValid => FromDate <= ToDate
            && !string.IsNullOrWhiteSpace(ProductCodeList)
            && MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency)
            && !string.IsNullOrWhiteSpace(UserName);
    }
}