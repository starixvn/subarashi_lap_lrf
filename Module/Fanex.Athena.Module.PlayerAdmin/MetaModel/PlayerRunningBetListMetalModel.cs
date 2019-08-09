namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerRunningBetListMetalModel : IMetalModelCustomerIdentity, IMetaModelAgent, IMetaModelCurrencyList
    {
        private string _sortBy;

        private string _sortOrder;

        public int CustId { get; set; }

        public string SortBy
        {
            get { return _sortBy; }
            set
            {
                _sortBy = !string.IsNullOrWhiteSpace(value) && value.Equals("stake", System.StringComparison.InvariantCultureIgnoreCase)
                    ? value
                    : null;
            }
        }

        public string SortOrder
        {
            get { return _sortOrder; }
            set
            {
                if (!string.IsNullOrWhiteSpace(value)
                    && (value.Equals("asc", System.StringComparison.InvariantCultureIgnoreCase)
                    || value.Equals("desc", System.StringComparison.InvariantCultureIgnoreCase)))
                {
                    _sortOrder = value;
                }
                else
                {
                    _sortOrder = null;
                }
            }
        }

        public string Currency { get; set; }

        public string AgentListXml { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }
    }
}
