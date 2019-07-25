namespace Fanex.Athena.Controllers.Report
{
    using Extension.Utility;

    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;
    using Model.Core.DTO.Common;
    using Model.Report.ViewModel;

    using Resources;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCasinoTurnover)]
    public class CasinoTurnoverController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public CasinoTurnoverController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IReportSettingService reportSettingService)
        : base(languageService, sessionService, productService)
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionService.UserSession;
            var productAccess = ProductService.GetSingleWalletProductAccess(
                SessionService.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CasinoTurnover);
            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportCasinoTurnover, 
                SessionService.LicenseeSession.LicenseeName);

            var viewModel = new CasinoTurnoverViewModel
            {
                FromDate = DateTime.Today,
                ToDate = DateTime.Today,
                CurrencyList = SessionService.UserSession.CurrencyList,
                BaseCurrencies = SystemConstants.BaseCurrencyList.Select(i => i.Value),
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
                new CheckedItem { ID = StatusTypes.Lose, Name = ViewResources.Lose, Checked = true },
                new CheckedItem { ID = StatusTypes.Draw, Name = ViewResources.Draw, Checked = false }
            };
        }
    }
}