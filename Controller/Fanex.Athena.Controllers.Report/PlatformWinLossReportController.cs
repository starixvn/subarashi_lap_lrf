namespace Fanex.Athena.Controllers.Report
{
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DataDomain;

    [FunctionAuthorization(PermissionKeys.ReportPlatformWinLoss)]
    public class PlatformWinLossReportController : ReportBaseController
    {
        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var licenseeId = licenseeSession.LicenseeId;
            var metaModel = new PlatformWinLossMetaModel
            {
                LicenseeId = licenseeId,
                BaseCurrency = userSession.DefaultBaseCurrency,
            };
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeId,
                userSession.Language,
                FunctionNames.PlatformWinloss);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var model = new PlatformWinLossViewModel
            {
                Param = metaModel,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = productAccess,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                PlatformList = PlatformHelper.GetPlatformList(licenseeSession.SpecialPlatform),
            };

            return View("~/Views/Desktop/Report/PlatformWinLoss/Main.cshtml", model);
        }
    }
}