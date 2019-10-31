using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelCurrencyList
    {
        IEnumerable<Currency> CurrencyList { get; set; }
        string SelectedCurrency { get; set; }

    }
}
