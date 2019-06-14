namespace Fanex.Athena.Api.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Base;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Service.Core.Utility.Interfaces;
    using Model.Report.MetaModel;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Core.Utility;

    public class ApiReportBaseController : BaseApiController
    {
        protected ApiReportBaseController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService)
            : base(sessionService, productService, langService)
        {
        }

        protected internal virtual bool IsValidProducts(string functionKey, BaseReportMetaModel metaModel)
        {
            var passedProductCodes = string.IsNullOrEmpty(metaModel.ProductCodeList) ?
                metaModel.ProductOptions.Select(x => x.Code) : metaModel.ProductCodeList.Split(',');
            return IsValidProducts(functionKey, passedProductCodes);
        }

        protected internal virtual bool IsValidProducts(string functionKey, string productCodeList)
        {
            var passedProductCodes = productCodeList?.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            return IsValidProducts(functionKey, passedProductCodes);
        }

        protected internal virtual bool IsValidProducts(string functionKey, IEnumerable<string> productCodes)
        {
            if (productCodes == null || !productCodes.Any())
            {
                return false;
            }

            var productAccess = ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                SessionService.UserSession.Language,
                functionKey);
            var allowedProductCodes = productAccess.ProductList.Select(x => x.ProductCode);

            var invalidProduct = productCodes.FirstOrDefault(x => !allowedProductCodes.Contains(x));

            return invalidProduct == null;
        }
    }
}