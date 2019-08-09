using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Utility.Interfaces;

namespace Fanex.Athena.Service.Core.Utility
{
    public class ValidationService : IValidationService
    {
        private readonly ICurrencyValidation _currencyValidation;
        private readonly IProductValidation _productValidation;

        public ValidationService(ICurrencyValidation currencyValidation, IProductValidation productValidation)
        {
            _currencyValidation = currencyValidation;
            _productValidation = productValidation;
        }

        private static bool IsValidMetalModel(IMetaModelValidation model)
        {
            return model != null && model.IsValid;
        }

        public bool IsValid(object model, CurrencyValidationOption currencyValidationOption = null,
            ProductValidationOption productValidationOption = null)
        {
            if (model == null)
            {
                return false;
            }

            var result = IsValidMetalModel(model as IMetaModelValidation);
            if (currencyValidationOption != null && currencyValidationOption.IsValidCurrency)
            {
                result &= IsValidCurrency(model as IMetaModelCurrency, currencyValidationOption.IsIncludeKeanOcean);
            }
            if (currencyValidationOption != null && currencyValidationOption.IsValidCurrencyList)
            {
                result &= IsValidCurrency(model as IMetaModelCurrencyIdList);
            }
            if (productValidationOption != null && productValidationOption.IsValidProductCodeList)
            {
                result &= IsValidProductCode(model as IMetaModelProductCodeList, productValidationOption);
            }

            return result;
        }

        private bool IsValidProductCode(IMetaModelProductCodeList model, ProductValidationOption option)
        {
            return model != null && _productValidation.IsValid(model, option);
        }

        private bool IsValidCurrency(IMetaModelCurrency model, bool isIncludeKeanOcean = false)
        {
            return model != null && _currencyValidation.IsValidCurrency(model.CurrencyId, isIncludeKeanOcean);
        }

        private bool IsValidCurrency(IMetaModelCurrencyIdList model)
        {
            return model != null &&
                _currencyValidation.IsValidCurrency(model.CurrencyIdList);
        }
    }
}