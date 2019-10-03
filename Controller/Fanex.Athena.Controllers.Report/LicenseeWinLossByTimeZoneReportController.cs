using System.Web.Mvc;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportLicenseeWinLossByTimeZone)]
    public class LicenseeWinLossByTimeZoneReportController : ReportBaseController
    {
        public LicenseeWinLossByTimeZoneReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService)
            : base(languageService, sessionService, productService)
        {
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var productAccess = this.ProductService.GetSingleWalletProductAccess(
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