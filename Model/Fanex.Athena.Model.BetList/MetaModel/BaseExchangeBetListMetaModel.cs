using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using System;
using System.Linq;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class BaseExchangeBetListMetaModel: IMetaModelCurrency
    {
        private string _baseCurrency = string.Empty;

        public int CustId { get; set; }

        public int CurrencyId { get; set; }

        public string AgentListXml { get; set; }

        public bool ExcludeTestData { get; set; }

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
                    : value.ToUpperInvariant();
            }
        }

        public virtual bool IsValid => CustId > 0
            && (string.IsNullOrEmpty(BaseCurrency) ||
            SystemConstants.BaseCurrencyList.Any(x => x.Value == BaseCurrency));


    }
}