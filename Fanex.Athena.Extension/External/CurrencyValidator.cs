using System;
using System.Linq;

namespace Fanex.Athena.Extension.External
{
    public static class CurrencyValidator
    {
        public static bool IsValid(string allowedCurrencyString, string selectedCurrencyString)
        {
            if (string.IsNullOrEmpty(selectedCurrencyString))
            {
                return true;
            }

            if (string.IsNullOrEmpty(allowedCurrencyString))
            {
                return false;
            }

            var allowedCurrencyIdList = allowedCurrencyString.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var selectedCurrencyIdList = selectedCurrencyString.Trim().Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            return selectedCurrencyIdList.All(x => allowedCurrencyIdList.Contains(x));
        }
    }
}