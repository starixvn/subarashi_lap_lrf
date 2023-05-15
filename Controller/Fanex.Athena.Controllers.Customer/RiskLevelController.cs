namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Excel.Customer.CustomerClass;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    public class RiskLevelController : CultureBaseController
    {
        private readonly ICustomerClassService _service;
        private readonly IPortalApiService _portalApiService;

        public RiskLevelController(ICustomerClassService service, IPortalApiService portalApiService)
        {
            _service = service;
            _portalApiService = portalApiService;
        }

        public async Task<ViewResult> Information(string customerClass)
        {
            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };

            var viewModel = await _service.GetRiskLevelPolicyByCustomerClass(metaModel, customerClass);
            ViewBag.CustomerClass = customerClass;

            return View("~/Views/Desktop/Customer/RiskLevel/Information.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(string customerClass)
        {
            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };

            var dataSource = await _service.GetRiskLevelPolicyByCustomerClass(metaModel, customerClass);
            var templatePath = Server.MapPath(@"~/App_Data/Template/Customers/PlayerSegmentation/RiskLevelInformation.xls");
            var fileName = "RiskLevelInformation_" + DateTime.Now.ToString("MM-dd-yyyy");
            var reportTitle = ViewResources.RiskLevelInformation;

            var excel = new RiskLevelInformationExcel(templatePath, reportTitle, dataSource);
            excel.Export();

            return new ExcelResult(excel.Workbook, fileName);
        }
    }
}