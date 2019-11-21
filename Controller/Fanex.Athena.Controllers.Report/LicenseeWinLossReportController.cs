// -----------------------------------------------------------------------
// <copyright file="LicenseeWinLossReportController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Extension.Helper;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Product;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportLicenseeWinLoss)]
    public class LicenseeWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public LicenseeWinLossReportController(
            IReportSettingService reportSettingService
            )
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            if (IsFakeLicensee(SessionServiceInstance.LicenseeSession.LicenseeName))
            {
                return MapToFakeView();
            }

            return MapToView();
        }

        private static IDictionary<int, string> GetFakeBaseCurrencies(string baseCurrencySetting, string defaultBaseCurrency)
        {
            var baseCurrencyList = string.IsNullOrWhiteSpace(baseCurrencySetting)
                    ? SystemConstants.BaseCurrencyList
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

        private static DateTime GetSelectedDate(ReportSetting reportSetting)
        {
            return DateTimeHelper.GetMinDate(
                reportSetting.MaxDate,
                reportSetting.TimeZone.HasValue ? DateTime.UtcNow.AddHours(reportSetting.TimeZone.Value) : DateTime.Now);
        }

        private ActionResult MapToView()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportLicenseeWinLoss,
                licenseeSession.LicenseeName);
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
                .Key
            };

            var model = new LicenseeWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ProductAccess = productAccess,
                ReportSetting = reportSetting
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
                CurrencyList = userSession.CurrencyList,
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