namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;

    [FunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss)]
    public class LicenseeWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IAuthorizationService _authService;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public LicenseeWinLossReportController(
            IReportSettingService reportSettingService,
            IAuthorizationService authService,
            IBalanceUpDataAccess balanceUpDataAccess
            )
        {
            _reportSettingService = reportSettingService;
            _authService = authService;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        [HttpGet]
        public ActionResult Index(bool isHistory = true)
        {
            if (IsFakeLicensee(SessionServiceInstance.LicenseeSession.LicenseeName))
            {
                return MapToFakeView();
            }
            var ignoreSharding = string.IsNullOrEmpty(SessionServiceInstance.LicenseeSession.SiteDBServer);
            if (!isHistory && ignoreSharding)
            {
                isHistory = true;
            }

            return MapToView(isHistory, ignoreSharding);
        }

        private static IDictionary<int, string> GetFakeBaseCurrencies(string baseCurrencySetting, string defaultBaseCurrency)
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

            return baseCurrencyList;
        }

        private ActionResult MapToView(bool isHistory, bool ignoreSharding)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss,
                licenseeSession.LicenseeName);
            reportSetting.MinDate = isHistory ? AppSettingInstance.HistoryDate : _balanceUpDataAccess.GetBalanceUp().MoveBetsDay.AddDays(1);

            var selectedDate = GetSelectedDate(reportSetting);
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.LicenseeWinLoss);

            var param = new LicenseeWinLossMetaModel
            {
                FromDate = selectedDate,
                ToDate = selectedDate,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                DrawFilter = DrawFilterType.Normal,
                ReportBy = ReportByType.Daily,
                ProductOptions = ToProductOptions(productAccess.ProductList),
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key,
                IsVIPPlayerOnly = false,
                HasVIPManagementPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.PlayerVIPManagement)
            };

            var model = new LicenseeWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ProductAccess = productAccess,
                ReportSetting = reportSetting,
                IsHistory = isHistory,
                IgnoreSharding = ignoreSharding,
                HasExtraPayoutPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.ReportExtraPayout)
            };
            return View("~/Views/Desktop/Report/LicenseeWinLoss/Main.cshtml", model);
        }

        private ActionResult MapToFakeView()
        {
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss,
                SessionServiceInstance.LicenseeSession.LicenseeName);
            var selectedDate = GetSelectedDate(reportSetting);
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.SpecialLicenseeWinLoss);
            var baseCurrencyList = GetFakeBaseCurrencies(reportSetting.BaseCurrencies, userSession.DefaultBaseCurrency);
            var defaultBaseCurrency = baseCurrencyList.FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase));

            var param = new LicenseeWinLossMetaModel
            {
                FromDate = new DateTime(selectedDate.Year, selectedDate.Month, 1),
                ToDate = selectedDate,
                ReportBy = ReportByType.Daily,
                ProductOptions = GetFakeProductOptions(productAccess.ProductList),
                CurrencyId = defaultBaseCurrency.Key
            };

            var model = new SpecialLicenseeWinLossViewModel
            {
                Param = param,
                CurrencyList = BuildCurrencyList(),
                ReportSetting = reportSetting,
                BaseCurrencyList = baseCurrencyList
            };

            return View("~/Views/Desktop/Report/SpecialLicenseeWinLoss/Main.cshtml", model);
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
    }
}