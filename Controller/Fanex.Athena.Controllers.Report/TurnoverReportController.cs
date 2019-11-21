// -----------------------------------------------------------------------
// <copyright file="ReportController.Turnover.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    using Resources;

    using Service.Report.Interfaces;

    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportTurnover)]
    public class TurnoverReportController : ReportBaseController
    {
        private readonly ITurnoverService _turnoverService;

        public TurnoverReportController(
            ITurnoverService turnoverService
)
        {
            _turnoverService = turnoverService;
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
                CurrencyList = GetCurrenciesForTurnoverReport(licenseeSession.LicenseeId),
                IsAllowedCasinoTransfer = AppSettingInstance.LicenseeAllowCasinoTransfer.Contains(licenseeSession.LicenseeId),
                IsFakeLicensee = IsFakeLicensee(licenseeSession.LicenseeName)
            };

            return View("~/Views/Desktop/Report/Turnover/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
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
                CurrencyList = GetCurrenciesForTurnoverReport(licenseeSession.LicenseeId),
                IsAllowedCasinoTransfer = licenseeSession.LicenseeId == 1
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
                CustomerCommVisible = this.SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
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
            return new TurnoverExcel(templatePath, showingOption, viewModel) { IsShowCasinoTransfer = isShowCasinoTransfer };
        }

        private IDictionary<int, string> GetCurrenciesForTurnoverReport(int licenseeId)
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;
            KeanOceanBusinessHelper.AddHKDCurrencyForTurnOverReport(currencyList, licenseeId);
            return currencyList;
        }
    }
}