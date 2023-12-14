// -----------------------------------------------------------------------
// <copyright file="ReportController.Turnover.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;
    using Resources;
    using Service.Report.Interfaces;

    [FunctionAuthorization(PermissionKeys.ReportTurnover)]
    public class TurnoverReportController : ReportBaseController
    {
        private readonly ITurnoverService _turnoverService;
        private readonly IAuthorizationService _authorizationService;

        public TurnoverReportController(
            ITurnoverService turnoverService,
            IAuthorizationService authorizationService
)
        {
            _turnoverService = turnoverService;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new TurnoverMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                UserId = userSession.UserId,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeSession.LicenseeId,
                userSession.Language,
                FunctionNames.Turnover);
            metaModel.ProductOptions = ToProductOptions(productAccess.ProductList.Where(a => !a.ProductCode.Equals(Product.BA)));

            var model = new TurnoverViewModel
            {
                Param = metaModel,
                ProductAccess = productAccess,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                IsEnableSingleWallet = licenseeSession.IsEnableSingleWallet,
                CurrencyList = GetCurrenciesForTurnoverReport(),
                IsAllowedCasinoTransfer = AppSettingInstance.LicenseeAllowCasinoTransfer.Contains(licenseeSession.LicenseeId),
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName),
                IsHidePlayerWL = !SessionServiceInstance.UserSession.IsSuperAdmin
                    && _authorizationService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.HidePlayerWL_WL_Comm_Total)
            };

            return View("~/Views/Desktop/Report/Turnover/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true, BindProductOptions = true)]
        public async Task<ActionResult> Excel(TurnoverMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

            var placeholderUsername = IsFakeLicensee(licenseeSession.LicenseeName) ? ViewResources.ExternalId : ViewResources.ExternalIdOrSystemId;
            metaModel.Username = string.IsNullOrWhiteSpace(metaModel.Username) ||
                metaModel.Username.Trim() == placeholderUsername ? null : metaModel.Username;

            var dataList = await _turnoverService.GetDataList(metaModel);

            var model = new TurnoverViewModel
            {
                DataList = dataList,
                TotalData = _turnoverService.SumTotalData(dataList),
                Param = metaModel,
                ProductAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                    licenseeSession.LicenseeId,
                    userSession.Language,
                    FunctionNames.Turnover),
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                IsEnableSingleWallet = licenseeSession.IsEnableSingleWallet,
                CurrencyList = GetCurrenciesForTurnoverReport(),
                IsAllowedCasinoTransfer = licenseeSession.LicenseeId == 1,
                IsHidePlayerWL = !SessionServiceInstance.UserSession.IsSuperAdmin
                    && _authorizationService.HasPermissions(SessionServiceInstance.UserSession, PermissionKeys.HidePlayerWL_WL_Comm_Total)
            };

            return ExportExcel(model);
        }

        private ActionResult ExportExcel(TurnoverViewModel viewModel)
        {
            const string FileName = "Turnover";

            var templatePath = HostingEnvironment.MapPath("~/App_Data/Template/Reports/Turnover.xls");

            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;

            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
                licenseeId,
                SessionServiceInstance.UserSession.Language,
                FunctionNames.Turnover);

            var showingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
                BAVisible = productAccess.IsAllowBA
            };

            var isShowCasinoTransfer = AppSettingInstance.LicenseeAllowCasinoTransfer.Contains(licenseeId);
            var excel = CreateExcel(templatePath, viewModel, showingOption, isShowCasinoTransfer);

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual TurnoverExcel CreateExcel(
            string templatePath,
            TurnoverViewModel viewModel,
            ShowingOption showingOption,
            bool isShowCasinoTransfer)
        {
            viewModel.Param.BaseCurrency = string.IsNullOrEmpty(viewModel.Param.BaseCurrency) ?
                viewModel.Param.CurrencyName : viewModel.Param.BaseCurrency;
            return new TurnoverExcel(templatePath, showingOption, viewModel) { IsShowCasinoTransfer = isShowCasinoTransfer };
        }

        private IDictionary<int, string> GetCurrenciesForTurnoverReport()
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            return currencyList;
        }
    }
}