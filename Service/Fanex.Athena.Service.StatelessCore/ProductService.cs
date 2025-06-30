namespace Fanex.Athena.Service.StatelessCore
{
    #region

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Xml.Linq;

    using Extension.Utility.Interfaces;

    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Configuration;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    #endregion

    public class ProductService : IProductService
    {
        private readonly ICommonApiClient _commonApiClient;

        private const string ProductAccessUrl = "api/productaccess";
        private const string ProductResourceUrl = "api/productresource";

        public ProductService(ICommonApiClient commonApiClient)
        {
            _commonApiClient = commonApiClient;
        }

        #region Public Methods and Operators

        private static object BuildProductAccessRequest(int licenseeId, string functionConfigKey) => new
        {
            licenseeId,
            functionKey = functionConfigKey
        };

        public IList<Product> GetProductList(int licenseeId, string languageCode, string functionConfigKey = null) =>
             _commonApiClient.GetAsync<IList<Product>>(
                ProductAccessUrl,
                languageCode,
                BuildProductAccessRequest(licenseeId, functionConfigKey)).ConfigureAwait(false).GetAwaiter().GetResult();

        public string GetProductName(string productCode) =>
            _commonApiClient.GetAsync<string>(
                ProductResourceUrl,
                GetCurrentIBCLanguageCode(),
                new { productCode }).ConfigureAwait(false).GetAwaiter().GetResult();

        public ProductAccess GetProductAccess(int licenseeId, string languageCode, string functionConfigKey = null)
        {
            var allowedProducts = GetProductList(licenseeId, languageCode, functionConfigKey);

            return new ProductAccess(allowedProducts);
        }

        public ProductAccess GetSingleWalletProductAccess(int licenseeId, string languageCode, string functionConfigKey = null)
        {
            var allowedProducts = GetProductList(licenseeId, languageCode, functionConfigKey);

            var productList = allowedProducts.Where(i => i.IsOfferedSingleWallet).ToList();

            return new ProductAccess(productList);
        }

        public bool IsOfferCashOutProduct(int licenseeId, string languageCode)
        {
            var allowedProducts = GetProductList(licenseeId, languageCode);

            return allowedProducts.Any(_ => _.ProductCode == Product.CO);
        }

        #endregion

        public IList<ProductOption> GetAllowedSubProductOptions(IEnumerable<string> offeredSubProductList, IList<ProductOption> productOptions)
        {
            if (!offeredSubProductList.IsPresent() || !productOptions.IsPresent(_ => _.Code == Product.SB && _.Status))
            {
                return productOptions;
            }

            var newProductOptions = new List<ProductOption>(productOptions);
            newProductOptions.AddRange(offeredSubProductList.Select(subProduct => new ProductOption
            {
                Code = subProduct,
                Status = true
            }));

            return newProductOptions;
        }

        public string GetAllowedSubProductCodeList(IEnumerable<string> offeredSubProductList, string productCodes)
        {
            if (!offeredSubProductList.IsPresent() || !(productCodes?.Split(',')).IsPresent(_ => _ == Product.SB))
            {
                return productCodes;
            }

            return productCodes + "," + string.Join(",", offeredSubProductList);
        }

        private static string GetCurrentIBCLanguageCode(string languageCode = null)
        {
            return string.IsNullOrEmpty(languageCode) ? Thread.CurrentThread.CurrentUICulture.IetfLanguageTag : languageCode;
        }
    }
}