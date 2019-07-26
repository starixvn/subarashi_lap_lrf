using System;
using System.Linq;

using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;

namespace Fanex.Athena.Service.Core.Utility
{
    public class ProductValidation : IProductValidation
    {
        private readonly IProductService _productService;
        private readonly ISessionService _sessionService;

        public ProductValidation(IProductService productService, ISessionService sessionService)
        {
            _productService = productService;
            _sessionService = sessionService;
        }

        public bool IsValid(IMetaModelProductCodeList model, ProductValidationOption option)
        {
            if (string.IsNullOrEmpty(option.FunctionConfig) || model == null
                || string.IsNullOrEmpty(model.ProductCodeList))
            {
                return false;
            }
            return IsValidProducts(option, model.ProductCodeList);
        }

        private bool IsValidProducts(ProductValidationOption option, string productCodeList)
        {
            var productCodes = productCodeList?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            if (!productCodes.Any() || productCodes.Any(x => string.IsNullOrEmpty(x.Trim())))
            {
                return false;
            }

            var productAccess = option.IsSingleWallet ? _productService.GetSingleWalletProductAccess(
                _sessionService.LicenseeSession.LicenseeId,
                _sessionService.UserSession.Language,
                option.FunctionConfig) : _productService.GetProductAccess(
                _sessionService.LicenseeSession.LicenseeId,
                _sessionService.UserSession.Language,
                option.FunctionConfig);

            var allowedProductCodes = productAccess.ProductList.Select(x => x.ProductCode).ToArray();

            return !productCodes.Except(allowedProductCodes).Any();
        }
    }
}