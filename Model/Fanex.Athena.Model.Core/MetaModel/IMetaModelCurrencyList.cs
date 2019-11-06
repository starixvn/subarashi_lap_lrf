namespace Fanex.Athena.Model.Core.MetaModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DataDomain;

    public interface IMetaModelCurrencyList
    {
        IEnumerable<Currency> CurrencyList { get; set; }
    }
}
