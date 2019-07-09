using System;
using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Extension.External
{
    public static class CurrencyValidator
    {
        public static bool IsValid(IEnumerable<int> allowedCurrencyIdList, string selectedCurrencyString)
        {
            if (string.IsNullOrEmpty(selectedCurrencyString))
            {
                return true;
            }

            var selectedCurrencyIdList = selectedCurrencyString.Trim()
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => Convert.ToInt32(x));

            return selectedCurrencyIdList.All(x => allowedCurrencyIdList.Contains(x));
        }
    }
}