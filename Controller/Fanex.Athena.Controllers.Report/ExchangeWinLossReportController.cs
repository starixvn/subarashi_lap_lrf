namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Extension.Utility;
    using Fanex.Athena.Model.Report.ViewModel;
    using Model.Core.DataDomain;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Core.Configuration.Interfaces;
    using Service.Core.Users.Interfaces;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportExchangeWinLoss)]
    public class ExchangeWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public ExchangeWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSetting,
            IProductService productService,
            IReportSettingService reportSettingService)
        : base(languageService, sessionService, appSetting, productService)
        {
            _reportSettingService = reportSettingService;
        }

        public ActionResult Index()
        {
            var viewModel = CreateViewModel();

            return View("~/Views/Desktop/Report/ExchangeWinLoss/Main.cshtml", viewModel);
        }

        private ExchangeWinLossViewModel CreateViewModel()
        {
            var licensee = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var currencyList = new Dictionary<int, string>
            {
                { BaseCurrencyType.All, ViewResources.All },
                { BaseCurrencyType.Eur, $"{ViewResources.Based} {ViewResources.EUR}" },
                { BaseCurrencyType.Usd, $"{ViewResources.Based} {ViewResources.USD}" },
                { BaseCurrencyType.Gbp, $"{ViewResources.Based} {ViewResources.GBP}" }
            };

            foreach (var item in userSession.CurrencyList)
            {
                currencyList.Add(item.Key, item.Value);
            }

            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportExchangeWinLoss);
            return new ExchangeWinLossViewModel
            {
                MinDate = reportSetting.MinDate,
                MaxDate = reportSetting.MaxDate,
                CurrencyList = currencyList,
                IsAllowedCustomerComm = licensee.IsAllowedCustomerComm,
                LicenseeId = licensee.LicenseeId,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key,
                ReportByOption = new Dictionary<byte, string>
                {
                    { ReportByType.Daily, ViewResources.Daily },
                    { ReportByType.Monthly, ViewResources.Monthly }
                }
            };
        }
    }
}