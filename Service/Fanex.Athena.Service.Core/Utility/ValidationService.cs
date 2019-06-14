using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.Utility
{
    public class ValidationService : IValidationService
    {
        public bool IsValidCurrency(int currencyId, bool isIncludeKeanOcean = false)
        {
            throw new NotImplementedException();
        }

        public bool IsValidCurrency(int[] currencies)
        {
            throw new NotImplementedException();
        }

        public bool IsValidMetalModel(IMetaModelValidation model)
        {
            return model != null && model.IsValid;
        }

        public bool IsValidProductCode(string productCodeList)
        {
            throw new NotImplementedException();
        }
        private static bool ValidateBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
        {
            return (isAllowEmpty && string.IsNullOrEmpty(baseCurrency)) || SystemConstants.BaseCurrencyList
           .Any(x => x.Value.Equals(baseCurrency, StringComparison.OrdinalIgnoreCase));
        }

        private static bool ValidateCurrency(int currencyId, IDictionary<int, string> currencyList)
        {
            return (currencyId < 0 && currencyId >= SystemConstants.MinBaseCurrencyType)
               || currencyId == BaseCurrencyType.All || currencyList.ContainsKey(currencyId);
        }
        private static bool VerifyKeanOceanCurrency(int currencyId, int licenseeId)
        {
            return licenseeId == LicenseeIdentity.KeenOcean && currencyId == CurrencyType.Cny;
        }

        private static bool ValidateCurrencyWithKeanOceanOption(int currencyId, IDictionary<int, string> currencyList, int licenseeId)
        {
            return ValidateCurrency(currencyId, currencyList) || VerifyKeanOceanCurrency(currencyId, licenseeId);

        }
        private static bool IsValidCurrencyIdList(int[] currencyList, IDictionary<int, string> userCurrencyList)
        {
            if (currencyList == null || currencyList.Length == 0)
            {
                return false;
            }

            return !currencyList.Any(x => !userCurrencyList.ContainsKey(x));

        }
    }
}
