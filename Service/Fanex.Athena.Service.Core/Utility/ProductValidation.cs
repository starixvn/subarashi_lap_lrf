using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.Core.Utility.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public bool IsValid(IMetaModelProductCodeList model, string functionKey)
        {
            if (string.IsNullOrEmpty(functionKey) || model is null
                || string.IsNullOrEmpty(model.ProductCodeList))
            {
                return false;
            }
            return IsValidProducts(functionKey, model.ProductCodeList);
        }

        private bool IsValidProducts(string functionKey, string productCodeList)
        {
            var productCodes = productCodeList?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            if (!productCodes.Any() || productCodes.Any(x => string.IsNullOrEmpty(x.Trim())))
            {
                return false;
            }

            var productAccess = _productService.GetSingleWalletProductAccess(
                _sessionService.LicenseeSession.LicenseeId,
                _sessionService.UserSession.Language,
                functionKey);

            var allowedProductCodes = productAccess.ProductList.Select(x => x.ProductCode).ToArray();

            return !productCodes.Except(allowedProductCodes).Any();

        }
    }
}
