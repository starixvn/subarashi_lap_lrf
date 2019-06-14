using Fanex.Athena.Model.Core.DataDomain;

using System;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class MetaModelValidationHelper
    {
        public static bool ValidateBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return (isAllowEmpty && string.IsNullOrEmpty(baseCurrency)) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(baseCurrency, StringComparison.OrdinalIgnoreCase));
        }

        public static bool IsValidCurrencyIdList(int[] currencyList, IDictionary<int, string> userCurrencyList)
        {
            if (currencyList == null || currencyList.Length == 0)
            {
                return false;
            }

            return !currencyList.Any(x => !userCurrencyList.ContainsKey(x));

        }
    }
}
