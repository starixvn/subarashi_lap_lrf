namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Excel.Customer.CustomerClass;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    public class RiskLevelController : CultureBaseController
    {
        private readonly ICustomerClassService _service;

        public RiskLevelController(ICustomerClassService service)
        {
            _service = service;
        }

        public async Task<ViewResult> Information(string customerClass, int currencyId)
        {
            var metaModel = BuildMetaModel(customerClass, currencyId);
            var viewModel = await _service.GetRiskLevelPolicyByCustomerClass(metaModel);
            ViewBag.CustomerClass = customerClass;
            ViewBag.CurrencyId = currencyId.ToString();

            return View("~/Views/Desktop/Customer/RiskLevel/Information.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(string customerClass, int currencyId)
        {
            var metaModel = BuildMetaModel(customerClass, currencyId);
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

        private GetCustomerClassInformationMetaModel BuildMetaModel(string customerClass, int currencyId)
        {
            return new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language,
                CurrencyId = currencyId,
                CustomerClass = customerClass,
                IsTest = !AppSettingInstance.Environment.Equals("PRO", StringComparison.OrdinalIgnoreCase)
            };
        }
    }
}