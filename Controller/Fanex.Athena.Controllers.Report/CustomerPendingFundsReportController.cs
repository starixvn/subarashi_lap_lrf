// -----------------------------------------------------------------------
// <copyright file="ReportController.CustomerPendingFunds.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DataDomain;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

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