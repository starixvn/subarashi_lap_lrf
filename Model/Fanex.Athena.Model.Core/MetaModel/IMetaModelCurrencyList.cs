using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.MetaModel
{
    public interface IMetaModelCurrencyList
    {
        IDictionary<int, string> CurrencyList { get; set; }

    }
}
