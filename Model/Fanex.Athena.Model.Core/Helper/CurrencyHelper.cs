using Fanex.Athena.Model.Core.DTO.Common;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class CurrencyHelper
    {
        public static void BindCurrencyDisplayName<T>(IEnumerable<T> items, IDictionary<int, string> currencyList)
           where T : ICurrencyInfo
        {
            foreach (var item in items)
            {
                item.Currency = currencyList.TryGetValue(item.CurrencyId, out string currency) ? currency : item.CurrencyId.ToString();
            }
        }
    }
}
