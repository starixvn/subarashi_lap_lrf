using Fanex.Athena.Model.Core.DataDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Model.Core.Helper
{
    public static class MetaModelValidationHelper
    {
        public static bool ValidateBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return (isAllowEmpty && string.IsNullOrEmpty(baseCurrency)) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(baseCurrency, StringComparison.OrdinalIgnoreCase));
        }

        public static bool ValidateCurrency(int currencyId, IDictionary<int, string> currencyList)
        {
            return (currencyId >= SystemConstants.MinBaseCurrencyType && currencyId < 0)
                || currencyList.ContainsKey(currencyId);
        }
        private static bool VerifyKeanOceanCurrency(int currencyId, int licenseeId)
        {
            return licenseeId == LicenseeIdentity.KeenOcean && currencyId == CurrencyType.Cny;
        }

        public static bool ValidateCurrencyForKeanOcean(int currencyId, IDictionary<int, string> currencyList, int licenseeId)
        {
            return ValidateCurrency(currencyId, currencyList) || VerifyKeanOceanCurrency(currencyId, licenseeId);

        }
        public static bool IsValidCurrencyIdList(int[] currencyList, IDictionary<int, string> userCurrencyList)
        {
            if (currencyList == null || currencyList.Length == 0)
            {
                return false;
            }

            foreach (var currency in currencyList)
            {
                if (!userCurrencyList.ContainsKey(currency))
                {
                    return false;
                }
            }

            return true;
        }
    }
}
