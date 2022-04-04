namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportGodOfFortuneWinLoss)]
    public class GodOfFortuneWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public GodOfFortuneWinLossReportController(IReportSettingService reportSettingService)
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss,
                licenseeSession.LicenseeName);
            var date = DateTime.Today;

            var param = new GodOfFortuneWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                IsConvertAll = true,
                DrawFilter = DrawFilterType.Normal,
                ReportBy = ReportByType.Daily,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key,
            };

            var model = new GodOfFortuneWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting
            };

            return View("~/Views/Desktop/Report/GodOfFortuneWinLoss/Main.cshtml", model);
        }
    }
}