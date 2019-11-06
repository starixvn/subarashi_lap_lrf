using System.Collections.Generic;
using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelCurrencyList
    {
        IEnumerable<Currency> CurrencyList { get; set; }
    }
}