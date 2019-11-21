namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DataDomain;

    using Resources;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportExchangeWinLoss)]
    public class ExchangeWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public ExchangeWinLossReportController(
            IReportSettingService reportSettingService)
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
            var licensee = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var currencyList = new Dictionary<int, string>
            {
                { BaseCurrencyType.All, ViewResources.All },
            };

            foreach (var item in SystemConstants.BaseCurrencyList)
            {
                currencyList.Add(item.Key, $"{ViewResources.Based} {item.Value}");
            }

            foreach (var item in userSession.CurrencyList)
            {
                currencyList.Add(item.Key, item.Value);
            }

            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportExchangeWinLoss, licensee.LicenseeName);
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