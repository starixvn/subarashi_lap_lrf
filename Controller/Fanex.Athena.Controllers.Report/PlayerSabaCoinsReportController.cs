using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.SabaCoins)]
    public class PlayerSabaCoinsReportController : ReportBaseController
    {
        private readonly ISubsidiaryService _subsidiaryService;

        public PlayerSabaCoinsReportController(ISubsidiaryService subsidiaryService)
        {
            _subsidiaryService = subsidiaryService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetWhiteLabelTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;

            var viewModel = new PlayerSabaCoinsViewModel
            {
                ViewType = viewType,
                SubsidiaryList = subsidiaryList,
                CurrencyList = BuildCurrencyList(),
                MinDate = DateTimeHelper.Today.AddMonths(-3),
                MaxDate = DateTimeHelper.Today
            };

            return View("~/Views/Desktop/Report/PlayerSabaCoins/Index.cshtml", viewModel);
        }
    }
}