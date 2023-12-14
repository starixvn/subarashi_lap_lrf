using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.VendorAdapter.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportNewCashOutWinLoss)]
    public class NewCashOutWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ISubsidiaryService _subsidiaryService;
        private readonly ICacheRefAdapter _cacheRefAdapter;

        public NewCashOutWinLossReportController(
            IReportSettingService reportSettingService,
            ISubsidiaryService subsidiaryService,
            ICacheRefAdapter cacheRefAdapter)
        {
            _reportSettingService = reportSettingService;
            _subsidiaryService = subsidiaryService;
            _cacheRefAdapter = cacheRefAdapter;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportNewCashOutWinLoss,
                licenseeSession.LicenseeName);
            var productAccess = ProductServiceInstance.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);

            var model = new NewCashOutWinLossViewModel
            {
                ReportSetting = reportSetting,
                CurrencyList = userSession.CurrencyList,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList,
                SportList = GetSportList(),
                IsLicenseeOfferBA = licenseeSession.IsEnableBA && productAccess.IsAllowBA,
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/NewCashOutWinLoss/Main.cshtml", model);
        }

        private IDictionary<int, string> GetSportList()
        {
            return new Dictionary<int, string>
            {
                { (int)SportType.Soccer, _cacheRefAdapter.GetSportName((int)SportType.Soccer) },
                { (int)SportType.BasketBall, _cacheRefAdapter.GetSportName((int)SportType.BasketBall) }
            };
        }
    }
}