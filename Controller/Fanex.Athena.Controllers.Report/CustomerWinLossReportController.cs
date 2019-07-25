// <copyright file="ReportController.CustomerWinloss.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Web.Mvc;

    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;

        public CustomerWinLossReportController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IReportSettingService reportSettingService, ILicenseeSettingService licenseeSettingService
            )
            : base(languageService, sessionService, productService, licenseeSettingService)
        {
            _reportSettingService = reportSettingService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return GetView(false);
        }

        [HttpGet]
        public ActionResult History()
        {
            return GetView(true);
        }

        private ActionResult GetView(bool isHistory)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            var metaModel = new CustomerWinLossMetaModel
            {
                IsExcludedTestData = true,
                FromDate = isHistory ? new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)
                : DateTime.Today,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductService.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CustomerWinLoss);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, licenseeSession.LicenseeName);

            var model = new CustomerWinLossViewModel
            {
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = userSession.CurrencyList,
                Param = metaModel,
                IsHistory = isHistory,
                ProductAccess = productAccess,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName),
                MinDate = reportSetting.MinDate,
                MaxDate = reportSetting.MaxDate
            };

            return View("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml", model);
        }
    }
}