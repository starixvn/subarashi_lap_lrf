namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IAuthorizationService _authService;
        private readonly IPlayerSegmentationService _playerService;

        public CustomerWinLossReportController(
            IReportSettingService reportSettingService,
            IAuthorizationService authService,
            IPlayerSegmentationService playerService
            )
        {
            _reportSettingService = reportSettingService;
            _authService = authService;
            _playerService = playerService;
        }

        [HttpGet]
        public Task<ActionResult> Index()
        {
            return GetView(false);
        }

        [HttpGet]
        public Task<ActionResult> History()
        {
            return GetView(true);
        }

        private async Task<ActionResult> GetView(bool isHistory)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new CustomerWinLossMetaModel
            {
                IsExcludedTestData = true,
                FromDate = isHistory ? new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1)
                : DateTime.Today,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
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
                MaxDate = reportSetting.MaxDate,
                HasExtraPayoutPermission = _authService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.ReportExtraPayout),
                OddsGroups = LicenseeSettingServiceInstance.GetOddGroups(licenseeSession.LicenseeName),
                CustomerClassList = await _playerService.GetCustomerClass(),
            };

            return View("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml", model);
        }
    }
}