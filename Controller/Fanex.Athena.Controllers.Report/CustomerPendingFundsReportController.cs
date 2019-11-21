// -----------------------------------------------------------------------
// <copyright file="ReportController.CustomerPendingFunds.cs" company="">
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

    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportCustomerPendingFunds)]
    public class CustomerPendingFundsReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new CustomerPendingFundsMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                UserId = userSession.UserId,
                BaseCurrency = userSession.DefaultBaseCurrency
            };
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                metaModel.LicenseeId,
                userSession.Language,
                FunctionNames.CustomerPendingFunds);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var model = new CustomerPendingFundsViewModel
            {
                CurrencyList = userSession.CurrencyList,
                Param = metaModel,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName)
            };

            return View("~/Views/Desktop/Report/CustomerPendingFunds/Main.cshtml", model);
        }
    }
}