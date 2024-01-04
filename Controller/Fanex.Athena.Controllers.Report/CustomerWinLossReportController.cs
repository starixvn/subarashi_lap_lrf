namespace Fanex.Athena.Controllers.Report
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IAuthorizationService _authService;
        private readonly ICustomerClassService _customerClassService;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public CustomerWinLossReportController(
            IReportSettingService reportSettingService,
            IAuthorizationService authService,
            ICustomerClassService customerClassService,
            IBalanceUpDataAccess balanceUpDataAccess
            )
        {
            _reportSettingService = reportSettingService;
            _authService = authService;
            _customerClassService = customerClassService;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index(bool isHistory = true)
        {
            var ignoreSharding = string.IsNullOrEmpty(SessionServiceInstance.LicenseeSession.SiteDBServer);
            if (!isHistory && ignoreSharding)
            {
                isHistory = true;
            }

            return await GetView(isHistory, ignoreSharding);
        }

        private async Task<ActionResult> GetView(bool isHistory, bool ignoreSharding)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new CustomerWinLossMetaModel
            {
                IsExcludedTestData = true,
                FromDate = isHistory ? DateTimeHelper.CreateDateTime(DateTimeHelper.Today.Year, DateTimeHelper.Today.Month, 1)
                : DateTimeHelper.Today,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.CustomerWinLoss);

            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList);

            var model = new CustomerWinLossViewModel
            {
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = userSession.CurrencyList,
                Param = metaModel,
                IsHistory = isHistory,
                ProductAccess = productAccess,
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName),
                HasExtraPayoutPermission = _authService.HasPermissions(userSession, PermissionKeys.ReportExtraPayout),
                OddsGroups = licenseeSession.OfferedOddsGroupsList,
                RiskLevels = await _customerClassService.GetAllRiskLevel(),
                IgnoreSharding = ignoreSharding
            };

            AssignLimitDateRange(model, licenseeSession.LicenseeName);

            return View("~/Views/Desktop/Report/CustomerWinLoss/Main.cshtml", model);
        }

        private void AssignLimitDateRange(CustomerWinLossViewModel model, string licenseeNaem)
        {
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportCustomerWinLoss, licenseeNaem);
            reportSetting.MinDate = model.IsHistory ?
                AppSettingInstance.HistoryDate : _balanceUpDataAccess.GetBalanceUp().MoveBetsDay.AddDays(1);

            model.MinDate = reportSetting.MinDate;
            model.MaxDate = reportSetting.MaxDate;
        }
    }
}