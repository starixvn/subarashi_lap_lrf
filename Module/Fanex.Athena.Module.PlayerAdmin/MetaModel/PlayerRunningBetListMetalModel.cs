namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerRunningBetListMetalModel : IMetalModelCustomerIdentity, IMetaModelAgent, IMetaModelCurrencyList
    {
        private const int PageSizeMaximum = 500;

        private int _pageSize;

        private string _sortBy;

        private string _sortOrder;

        public int CustId { get; set; }

        public string SortBy
        {
            get { return _sortBy; }
            set
            {
                _sortBy = !string.IsNullOrWhiteSpace(value) && value.Equals("stake", StringComparison.InvariantCultureIgnoreCase)
                    ? value
                    : null;
            }
        }

        public string SortOrder
        {
            get { return _sortOrder; }
            set
            {
                var normalizedValue = value?.Trim();
                _sortOrder = string.Equals(normalizedValue, "asc", StringComparison.InvariantCultureIgnoreCase) ||
                    string.Equals(normalizedValue, "desc", StringComparison.InvariantCultureIgnoreCase) ?
                    normalizedValue : null;
            }
        }

        public int PageSize
        {
            get { return _pageSize; }
            set
            {
                _pageSize = value > PageSizeMaximum ? PageSizeMaximum : value;
            }
        }

        public string Currency { get; set; }

        public string AgentListXml { get; set; }

        public int PageIndex { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public bool IsExport { get; set; }
    }
}