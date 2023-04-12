using System;
using System.Collections.Generic;
using System.Linq;

using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility.Interfaces;

namespace Fanex.Athena.Service.Core.Utility
{
    public class CurrencyValidation : ICurrencyValidation
    {
        private readonly ISessionService _sessionService;

        public CurrencyValidation(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        public bool IsValidBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return MetaModelHelper.ValidateBaseCurrency(baseCurrency, isAllowEmpty);
        }

        public bool IsValidCurrency(int currencyId)
        {
            var currencyList = _sessionService.UserSession.CurrencyList;

            return ValidateCurrency(currencyId, currencyList);
        }

        private static bool ValidateCurrency(int currencyId, IDictionary<int, string> currencyList)
        {
            return (currencyId < 0 && currencyId >= SystemConstants.MinBaseCurrencyType)
               || currencyId == BaseCurrencyType.All || currencyList.ContainsKey(currencyId);
        }

        public bool IsValidCurrency(string currencyIdList)
        {
            if (string.IsNullOrEmpty(currencyIdList))
            {
                return false;
            }
            var items = currencyIdList.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            int n;
            return !items.Any(x => !int.TryParse(x, out n) || !_sessionService.UserSession.CurrencyList.ContainsKey(n));
        }
    }
}