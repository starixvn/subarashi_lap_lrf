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
        private readonly ICustomerClassService _customerClassService;

        public CustomerWinLossReportController(
            IReportSettingService reportSettingService,
            IAuthorizationService authService,
            ICustomerClassService customerClassService
            )
        {
            _reportSettingService = reportSettingService;
            _authService = authService;
            _customerClassService = customerClassService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            return await GetView(false);
        }

        [HttpGet]
        public async Task<ActionResult> History()
        {
            return await GetView(true);
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
                HasExtraPayoutPermission = _authService.HasPermissions(userSession, PermissionKeys.ReportExtraPayout),
                OddsGroups = licenseeSession.OfferedOddsGroupsList,
                CustomerClassList = await _customerClassService.GetAllCustomerClassId(),
            };

            return View("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml", model);
        }
    }
}