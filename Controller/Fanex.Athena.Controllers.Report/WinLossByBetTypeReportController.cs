// -----------------------------------------------------------------------
// <copyright file="ReportController.WinLossByBetType.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using DataAccess.Core.Configuration.Interfaces;
    using DataAccess.Report.Interfaces;

    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Report.DTO;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    using Model.Core.DTO.Common;

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportWinLossByBetType)]
    public class WinLossByBetTypeReportController : ReportBaseController
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly IWinLossByBetTypeDataAccess _winLossByBetTypeDataAccess;

        public WinLossByBetTypeReportController(
            IBalanceUpDataAccess balanceUpDataAccess,
            IWinLossByBetTypeDataAccess winLossByBetTypeDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
            _winLossByBetTypeDataAccess = winLossByBetTypeDataAccess;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var metaModel = new WinLossByBetTypeMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                UserId = userSession.UserId,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var model = new WinLossByBetTypeViewModel
            {
                BalanceUpDay = _balanceUpDataAccess.GetBalanceUp().BalanceUpDay,
                ShowEmptyContent = true,
                Param = metaModel,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = ProductServiceInstance.GetProductAccess(licenseeSession.LicenseeId, userSession.Language),
            };

            ViewBag.IsShowCustComm = licenseeSession.IsAllowedCustomerComm;

            return View("~/Views/Desktop/Report/WinLossByBetType/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Index(WinLossByBetTypeMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;

            var reportData = await _winLossByBetTypeDataAccess.GetDataList(metaModel);

            reportData.Sort(metaModel.SortColumn, metaModel.SortDirection.Equals("ASC", StringComparison.OrdinalIgnoreCase));
            var productAccess = ProductServiceInstance.GetProductAccess(licenseeSession.LicenseeId, userSession.Language);
            var total = GetTotal(reportData);
            var model = new WinLossByBetTypeViewModel
            {
                BalanceUpDay = _balanceUpDataAccess.GetBalanceUp().BalanceUpDay,
                Param = metaModel,
                MainResult = reportData,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = userSession.CurrencyList,
                ProductAccess = productAccess,
                ColumnCount = GetColumnCount(productAccess, licenseeSession.IsAllowedCustomerComm),
                Total = total
            };

            ViewBag.IsShowCustComm = licenseeSession.IsAllowedCustomerComm;

            return metaModel.IsExportExcel ?
                Excel(model) :
                View("~/Views/Desktop/Report/WinLossByBetType/Main.cshtml", model);
        }

        private static WinLossByBetType GetTotal(IEnumerable<WinLossByBetType> dataList)
        {
            return new WinLossByBetType
            {
                Turnover = dataList.Sum(item => item.Turnover),
                CustomerWinLoss = dataList.Sum(item => item.CustomerWinLoss),
                CustomerComm = dataList.Sum(item => item.CustomerComm),
                BACommission = dataList.Sum(item => item.BACommission),
                AmtDueToBA = dataList.Sum(item => item.AmtDueToBA),
                LicenseeWL = dataList.Sum(i => i.LicenseeWL),
            };
        }

        private static int GetColumnCount(ProductAccess productAccess, bool isAllowedCustomerComm)
        {
            const int AdditionColumns = 2;
            var columnCount = 6;

            if (productAccess.IsAllowBA)
            {
                columnCount += AdditionColumns;
            }

            if (isAllowedCustomerComm)
            {
                columnCount += AdditionColumns;
            }

            return columnCount;
        }

        private ActionResult Excel(WinLossByBetTypeViewModel viewModel)
        {
            const string FileName = nameof(WinLossByBetType);

            var templatePath = HostingEnvironment.MapPath("~/App_Data/Template/Reports/WinLossByBetType.xls");

            var currencyConvert = new ConvertingOption
            {
                IsConvert = viewModel.Param.IsConvert,
                BaseCurrency = viewModel.Param.BaseCurrency,
                CurrencyName = viewModel.Param.CurrencyName
            };

            var productAccess = ProductServiceInstance.GetProductAccess(SessionServiceInstance.LicenseeSession.LicenseeId, SessionServiceInstance.UserSession.Language);

            var showingOption = new ShowingOption
            {
                BAVisible = productAccess.IsAllowBA,
                NGVisible = productAccess.IsAllowNG,
                SBVisible = productAccess.IsAllowSB,
                VSVisible = productAccess.IsAllowVS,
                CustomerCommVisible = this.SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };

            var excel = CreateExcel(templatePath, viewModel, currencyConvert, showingOption);

            excel.Export();

            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual WinLossByBetTypeExcel CreateExcel(
            string templatePath,
            WinLossByBetTypeViewModel viewModel,
            ConvertingOption currencyConvert,
            ShowingOption showingOption)
        {
            return new WinLossByBetTypeExcel(templatePath, currencyConvert, showingOption, viewModel);
        }
    }
}