// -----------------------------------------------------------------------
// <copyright file="ReportController.CustomerTurnover.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using DataAccess.Core.Common.Interfaces;

    using Fanex.Athena.Excel.Base.Entities;
    using Fanex.Athena.Excel.Report;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    using Model.Core.DTO.Common;
    using Model.Core.ResultModel;
    using Model.Report.DTO;

    using Newtonsoft.Json;

    using Resources;

    using Service.Report.Interfaces;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Hosting;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ReportCustomerTurnover)]
    public class CustomerTurnoverReportController : ReportBaseController
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;

        private readonly ICustomerTurnoverService _customerTurnoverService;

        public CustomerTurnoverReportController(
            ISportTypeDataAccess sportTypeDataAccess,
            ICustomerTurnoverService customerTurnoverService)
        {
            _sportTypeDataAccess = sportTypeDataAccess;
            _customerTurnoverService = customerTurnoverService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var model = new CustomerTurnoverViewModel
            {
                Param = new CustomerTurnoverMetaModel { LicenseeId = licenseeSession.LicenseeId },
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                IsAllowSLT = licenseeSession.OfferedSubProductList.IsPresent(_ => _ == Product.SLT)
            };

            return View("~/Views/Desktop/Report/CustomerTurnover/Main.cshtml", model);
        }

        [HttpGet]
        [AjaxRequest]
        public async Task<ActionResult> GetSportsAndProducts()
        {
            var listItem = new List<SportProductItem>();
            var parlayProduct = new SportProductItem
            {
                Checked = true,
                ID = ProductTypes.Parlay,
                Name = ViewResources.Parlay,
                ParentId = ProductTypes.Sportsbook
            };
            listItem.Add(parlayProduct);

            var productCode = ProductServiceInstance.GetAllowedSubProductCodeList(
               SessionServiceInstance.LicenseeSession.OfferedSubProductList,
               $"{Product.SB},{Product.NG},{Product.VS},{Product.VS2},{Product.VS3}");

            var data = await _sportTypeDataAccess.GetSportsAndProducts(
                SessionServiceInstance.LicenseeSession.LicenseeId,
                SessionServiceInstance.UserSession.Language,
                productCode)
                .ConfigureAwait(false);
            listItem.AddRange(data);

            return Json(listItem, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(false)]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> Excel(string excelParam)
        {
            if (string.IsNullOrEmpty(excelParam))
            {
                return null;
            }
            var metaModel = JsonConvert.DeserializeObject<CustomerTurnoverMetaModel>(excelParam);
            if (!metaModel.IsValid)
            {
                return null;
            }

            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList
                , metaModel.CurrencyId);
            const string FileName = "CustomerTurnover";
            metaModel.IsExportExcel = true;

            var templatePath = HostingEnvironment.MapPath(@"~/App_Data/Template/CustomerReports/CustomerTurnover.xls");
            var formatDateTime = metaModel.ReportBy == 1 ? "MM/dd/yyyy" : "MM/yyyy";

            var showingOption = new ShowingOption
            {
                CustomerCommVisible = licenseeSession.IsAllowedCustomerComm
            };
            var currencyName = userSession.CurrencyList
                .Where(i => i.Key == metaModel.CurrencyId).Select(i => i.Value).SingleOrDefault();

            var result = await _customerTurnoverService.GetDataList(metaModel, userSession.CurrencyList, userSession.Language).ConfigureAwait(false);

            var reportTitle = GenerateReportTitle(metaModel, currencyName);
            var excel = CreateExcel(templatePath, formatDateTime, showingOption, result, reportTitle);
            excel.Export();
            return new ExcelResult(excel.Workbook, FileName);
        }

        protected internal virtual CustomerTurnoverExcel CreateExcel(
            string templatePath,
            string formatDateTime,
            ShowingOption showingOption,
            ReportResultModel<CustTurnover> result,
            string reportTitle)
        {
            return new CustomerTurnoverExcel(templatePath, showingOption, result.DataList, result.TotalData, formatDateTime, reportTitle);
        }

        private static string GenerateReportTitle(CustomerTurnoverMetaModel metaModel, string currencyName)
        {
            var usernameExcelTitle = string.IsNullOrEmpty(metaModel.Username) ?
                            string.Empty
                            : "- " + ViewResources.Username + ": " + metaModel.Username;
            var reportTitle = string.Format(
                "{0}, {1} --> {2} - {3}: {4} - {5}: {6} {7}",
                                            ViewResources.Customer + " " + ViewResources.Turnover,
                                            metaModel.FromDate.ToString("MM/dd/yyyy"),
                                            metaModel.ToDate.ToString("MM/dd/yyyy"),
                                            ViewResources.Currency,
                                            currencyName,
                                            ViewResources.MinimumOdds,
                                            metaModel.Odds,
                                            usernameExcelTitle);
            return reportTitle;
        }
    }
}