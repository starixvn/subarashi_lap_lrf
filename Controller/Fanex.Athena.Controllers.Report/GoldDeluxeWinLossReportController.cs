// -----------------------------------------------------------------------
// <copyright file="GoldDeluxeWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;

    using System;
    using System.Linq;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportGoldDeluxeWinloss)]
    public class GoldDeluxeWinLossReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var date = DateTime.Now.AddDays(-1);
            var productAccess = ProductServiceInstance.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

            var product = productAccess.ProductList.SingleOrDefault(p => p.ProductCode == Product.GD);

            if (product == null)
            {
                return this.Redirect("~/Utility/AccessDenied");
            }

            var metaModel = new ThirdPartyWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                LicenseeId = licenseeSession.LicenseeId,
                ReportBy = 1,
                IsExcludedTestData = true,
                ProductId = product.ProductID,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key
            };

            var model = new ThirdPartyWinLossViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList
            };

            return View("~/Views/Desktop/Report/GoldDeluxeWinLoss/Main.cshtml", model);
        }
    }
}