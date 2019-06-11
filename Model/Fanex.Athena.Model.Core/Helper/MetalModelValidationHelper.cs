using Fanex.Athena.Model.Core.DataDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class MetalModelValidationHelper
    {
        public static bool ValidateBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return (isAllowEmpty && string.IsNullOrEmpty(baseCurrency)) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(baseCurrency, StringComparison.OrdinalIgnoreCase));
        }

        public static bool IsValidCurrency(int currencyId, IDictionary<int, string> currencyList)
        {
            return currencyId >= SystemConstants.MinBaseCurrencyType
                || currencyList.ContainsKey(currencyId);
        }
    }
}
