namespace Fanex.Athena.Controllers.Report
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;
    using Resources;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCasinoTurnover)]
    public class CasinoTurnoverController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public CasinoTurnoverController(
            IReportSettingService reportSettingService)
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionServiceInstance.UserSession;
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CasinoTurnover);
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover,
                SessionServiceInstance.LicenseeSession.LicenseeName);

            var viewModel = new CasinoTurnoverViewModel
            {
                FromDate = DateTimeHelper.Today,
                ToDate = DateTimeHelper.Today,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                ProductOptions = ToProductOptions(productAccess.ProductList),
                Status = GetStatusList(),
                MinDate = setting.MinDate,
                MaxDate = setting.MaxDate,
            };

            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/CasinoTurnover/Main.cshtml", viewModel);
        }

        private static IList<CheckedItem> GetStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Won, Name = ViewResources.Won, Checked = true },
                new CheckedItem { ID = StatusTypes.Lose, Name = ViewResources.Lost, Checked = true },
                new CheckedItem { ID = StatusTypes.Draw, Name = ViewResources.Draw, Checked = false }
            };
        }
    }
}