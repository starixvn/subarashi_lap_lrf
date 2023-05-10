namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;

    [FunctionAuthorization(PermissionKeys.ReportGrossGamingRevenue)]
    public class GrossGamingRevenueReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public GrossGamingRevenueReportController(
            IReportSettingService reportSettingService
            )
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeName = SessionServiceInstance.LicenseeSession.LicenseeName;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportGrossGamingRevenue, licenseeName);
            var selectedDate = GetSelectedDate(reportSetting);
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.GrossGamingRevenue);

            ViewModeByLicensee.TryGetValue(licenseeName, out byte viewMode);
            var baseCurrencyList = GetFakeBaseCurrencies(reportSetting.BaseCurrencies, userSession.DefaultBaseCurrency, viewMode);
            var defaultBaseCurrency = baseCurrencyList.FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase));

            var param = new LicenseeWinLossMetaModel
            {
                FromDate = new DateTime(selectedDate.Year, selectedDate.Month, 1),
                ToDate = selectedDate,
                ReportBy = ReportByType.Daily,
                ProductOptions = GetFakeProductOptions(productAccess.ProductList),
                CurrencyId = defaultBaseCurrency.Key
            };

            var model = new GrossGamingRevenueViewModel
            {
                Param = param,
                CurrencyList = SessionServiceInstance.LicenseeSession.IsShowVND ? HardcodeVNDForFakeLicensee(userSession.CurrencyList) : userSession.CurrencyList,
                ReportSetting = reportSetting,
                BaseCurrencyList = baseCurrencyList,
                BaseCurrencySetting = reportSetting.BaseCurrencies,
                SiteName = licenseeName,
                DefaultBaseCurrency = userSession.DefaultBaseCurrency,
                ViewMode = viewMode
            };

            return View("~/Views/Desktop/Report/GrossGamingRevenue/Main.cshtml", model);
        }

        private static IDictionary<int, string> GetFakeBaseCurrencies(string baseCurrencySetting, string defaultBaseCurrency, byte viewMode)
        {
            IDictionary<int, string> baseCurrencyList = string.IsNullOrWhiteSpace(baseCurrencySetting)
                    ? SystemConstants.BaseCurrencyList.ToDictionary(_ => _.Key, _ => _.Value)
                    : SystemConstants.BaseCurrencyList.Where(x => baseCurrencySetting.Split(',').Contains(x.Value)).ToDictionary(x => x.Key, x => x.Value);

            var defaultBaseCurrencyKey = defaultBaseCurrency?.ToUpperInvariant();

            if (defaultBaseCurrencyKey != null
                && !baseCurrencyList.Any(x => x.Value == defaultBaseCurrencyKey)
                && SystemConstants.BaseCurrencyList.Any(x => x.Value == defaultBaseCurrencyKey))
            {
                baseCurrencyList.Add(SystemConstants.BaseCurrencyList.First(x => x.Value == defaultBaseCurrencyKey));
            }

            return baseCurrencyList.Where(_ => _.Key != BaseCurrencyType.Eur || viewMode != 0).ToDictionary(_ => _.Key, _ => _.Value);
        }

        private static IList<ProductOption> GetFakeProductOptions(IEnumerable<Product> productList)
        {
            return productList.Select(i => new ProductOption
            {
                Code = i.ProductCode,
                Name = i.ProductCode.Equals(Product.CS, StringComparison.InvariantCultureIgnoreCase) ? "RNG" : i.ProductName,
                Status = true
            }).ToList();
        }

        private readonly IDictionary<string, byte> ViewModeByLicensee = new Dictionary<string, byte>(StringComparer.InvariantCultureIgnoreCase)
        {
            {"12B", 0 },
            {"IvoryBet", 1 }
        };
    }
}