namespace Fanex.Athena.Controllers.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers.Customer.Helpers;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Excel.Customer.CustomerClass;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    public class SabaVirtualSettingController : CultureBaseController
    {
        private readonly ISabaVirtualSettingService _service;

        private bool IsHideSaba => SabaHelper.IsHideSaba(SessionServiceInstance.LicenseeSession.SpecialPlatform);

        public SabaVirtualSettingController(ISabaVirtualSettingService service)
        {
            _service = service;
        }

        public async Task<ViewResult> Index()
        {
            var metaModel = new SabaVirtuaSettingInformationMetaModel
            {
                LevelList = string.Join(",", SabaVirtualSettingHelper.GenerateDangerLevelList().Select(_ => _.Key)),
                Language = SessionServiceInstance.UserSession.Language,
                IsHideSaba = IsHideSaba,
            };

            var viewModel = await _service.GetSabaVirtualSetting(metaModel);
            ViewBag.IsHideSaba = IsHideSaba;
            return View("~/Views/Desktop/Customer/SabaVirtualSetting/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<PartialViewResult> GetSabaVirtualSettingInformation(IEnumerable<string> levelIds = null)
        {
            var metaModel = new SabaVirtuaSettingInformationMetaModel
            {
                LevelList = string.Join(",", levelIds),
                Language = SessionServiceInstance.UserSession.Language,
                IsHideSaba = IsHideSaba,
            };

            var viewModel = await _service.GetSabaVirtualSetting(metaModel);

            return PartialView("~/Views/Desktop/Customer/SabaVirtualSetting/SabaVirtualSettingInformationTable.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(IEnumerable<string> levelIds = null)
        {
            var metaModel = new SabaVirtuaSettingInformationMetaModel
            {
                LevelList = string.Join(",", levelIds),
                Language = SessionServiceInstance.UserSession.Language,
                IsHideSaba = IsHideSaba,
            };

            var dataSource = await _service.GetSabaVirtualSetting(metaModel);

            if (dataSource.Any())
            {
                var templatePath = Server.MapPath(@"~/App_Data/Template/Customers/PlayerSegmentation/SabaVirtualSettingInformation.xls");
                var fileName = (IsHideSaba ? "VirtualSettingInformation_" : "SabaVirtualSettingInformation_") + DateTimeHelper.Now.ToString("MM-dd-yyyy");
                var reportTitle = IsHideSaba ? ViewResources.SabaVirtualSettingInformation_HideSaba : ViewResources.SabaVirtualSettingInformation;

                var excel = new SabaVirtualSettingInformationExcel(templatePath, reportTitle, dataSource);
                excel.Export();

                return new ExcelResult(excel.Workbook, fileName);
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel", "Empty.xls");
        }
    }
}