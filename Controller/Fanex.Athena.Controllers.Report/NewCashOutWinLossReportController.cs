using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Web.ActionFilter;
using System.Linq;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportNewCashOutWinLoss)]
    public class NewCashOutWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly ISubsidiaryService _subsidiaryService;

        public NewCashOutWinLossReportController(
            IReportSettingService reportSettingService,
            ISubsidiaryService subsidiaryService)
        {
            _reportSettingService = reportSettingService;
            _subsidiaryService = subsidiaryService;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportNewCashOutWinLoss,
                licenseeSession.LicenseeName);

            var param = new NewCashOutWinLossMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId
            };

            var model = new NewCashOutWinLossViewModel
            {
                Param = param,
                ReportSetting = reportSetting,
                CurrencyList = userSession.CurrencyList,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/NewCashOutWinLoss/Main.cshtml", model);
        }
    }
}