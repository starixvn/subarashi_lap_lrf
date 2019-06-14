using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
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
        private readonly ISessionService _sessionService;
        public ValidationService(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }
        public bool IsValidBaseCurrency(string baseCurrency, bool isAllowEmpty = true)
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
        private static bool IsValidMetalModel(IMetaModelValidation model)
        {
            return model != null && model.IsValid;
        }

        public bool IsValid(ValidationMetaModelOption option, object model)
        {
            if (option is null || model is null)
            {
                return false;
            }

            var result = IsValidMetalModel(model as IMetaModelValidation);
            if (option.IsValidCurrency)
            {
                result &= IsValidCurrency(model as IMetaModelCurrency, option.IsIncludeKeanOcean);
            }
            if (option.IsValidCurrencyList)
            {
                result &= IsValidCurrency(model as IMetaModelCurrencyList);
            }
            if (option.IsValidProductCodeList)
            {
                result &= IsValidProductCode(model as IMetaModelProductCodeList);
            }

            return result;
        }

        private static bool IsValidProductCode(IMetaModelProductCodeList model)
        {
            throw new NotImplementedException();
        }

        private bool IsValidCurrency(IMetaModelCurrency model, bool isIncludeKeanOcean = false)
        {
            return IsValidCurrency(model.CurrencyId, isIncludeKeanOcean);
        }

        private static bool IsValidCurrency(IMetaModelCurrencyList currencyList)
        {
            throw new NotImplementedException();
        }

        public bool IsValidCurrency(int currencyId, bool isIncludeKeanOcean = false)
        {
            var currencyList = _sessionService.UserSession.CurrencyList;
            if (isIncludeKeanOcean)
            {
                return ValidateCurrencyWithKeanOceanOption(currencyId
                    , currencyList
                    , _sessionService.LicenseeSession.LicenseeId);
            }

            return ValidateCurrency(currencyId, currencyList);
        }
    }
}
