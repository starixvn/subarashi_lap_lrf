using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Web.ActionFilter;

using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportLicenseeWinLossByTimeZone)]
    public class LicenseeWinLossByTimeZoneReportController : ReportBaseController
    {
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = this.ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.WinLossByTimeZone);

            var model = new LicenseeWinLossByTimeZoneViewModel
            {
                CurrencyList = userSession.CurrencyList,
                ProductOptionList = ToProductOptions(productAccess.ProductList)
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;
            return View("~/Views/Desktop/Report/LicenseeWinLossByTimeZone/Main.cshtml", model);
        }
    }
}