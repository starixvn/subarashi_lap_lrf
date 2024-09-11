namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Excel.Customer.CustomerClass;
    using Extension.Helper;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;
    using Resources;
    using Service.Customer.Interfaces;
    using Web.ActionFilter;
    using Web.ResultExtension;

    public class RiskLevelController : CultureBaseController
    {
        private readonly ICustomerClassService _service;

        public RiskLevelController(ICustomerClassService service)
        {
            _service = service;
        }

        public async Task<ViewResult> Information(string customerClass, int currencyId, int custId)
        {
            var metaModel = BuildMetaModel(customerClass, currencyId, custId);
            var viewModel = await _service.GetRiskLevelPolicyByCustomerClass(metaModel);
            ViewBag.CustomerClass = customerClass;
            ViewBag.CurrencyId = currencyId.ToString();
            ViewBag.CustId = custId.ToString();

            return View("~/Views/Desktop/Customer/RiskLevel/Information.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(string customerClass, int currencyId, int custId)
        {
            var metaModel = BuildMetaModel(customerClass, currencyId, custId);
            var dataSource = await _service.GetRiskLevelPolicyByCustomerClass(metaModel);
            var templatePath = Server.MapPath(@"~/App_Data/Template/Customers/PlayerSegmentation/RiskLevelInformation.xls");
            var fileName = "RiskLevelInformation_" + DateTimeHelper.Now.ToString("MM-dd-yyyy");
            var reportTitle = ViewResources.RiskLevelInformation;

            var excel = CreateExcel(templatePath, reportTitle, dataSource);
            excel.Export();

            return new ExcelResult(excel.Workbook, fileName);
        }

        protected internal virtual RiskLevelInformationExcel CreateExcel(string templatePath, string reportTitle, RiskLevelModel dataSource)
        {
            return new RiskLevelInformationExcel(templatePath, reportTitle, dataSource);
        }

        private GetCustomerClassInformationMetaModel BuildMetaModel(string customerClass, int currencyId, int custId)
        {
            return new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language,
                CurrencyId = currencyId,
                CustomerClass = customerClass,
                CustId = custId,
                IsHideSaba = IsHideSaba,
                IsTest = !AppSettingInstance.Environment.Equals("PRO", StringComparison.OrdinalIgnoreCase)
            };
        }
    }
}