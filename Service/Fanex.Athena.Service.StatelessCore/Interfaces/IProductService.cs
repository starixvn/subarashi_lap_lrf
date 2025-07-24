using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IProductService
    {
        string GetProductName(string productCode);

        ProductAccess GetProductAccess(int licenseeId, string languageCode, string functionConfigKey = null);

        IList<Product> GetProductList(int licenseeId, string languageCode, string functionConfigKey = null);

        ProductAccess GetSingleWalletProductAccess(int licenseeId, string languageCode, string functionConfigKey = null);

        IList<ProductOption> GetAllowedSubProductOptions(IEnumerable<string> offeredSubProductList, IList<ProductOption> productOptions);

        string GetAllowedSubProductCodeList(IEnumerable<string> offeredSubProductList, string productCodes);

        bool IsOfferCashOutProduct(int licenseeId, string languageCode);
    }
}