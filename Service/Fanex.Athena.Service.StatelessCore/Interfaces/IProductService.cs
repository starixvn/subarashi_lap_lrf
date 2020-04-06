using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface IProductService
    {
        ProductAccess GetProductAccess(int licenseeId, string languageCode, string functionConfigKey = null);

        IList<Product> GetProductList(int licenseeId, string languageCode);

        ProductAccess GetProductAccessForActiveCustomerSummary(int licenseeId, string languageCode);

        ProductAccess GetSingleWalletProductAccess(int licenseeId, string languageCode, string functionConfigKey = null);

        string[] GetAllowedProducts(string functionName = null);
    }
}
