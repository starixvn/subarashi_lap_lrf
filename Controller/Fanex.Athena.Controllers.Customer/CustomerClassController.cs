namespace Fanex.Athena.Controllers.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Excel.Base;
    using Fanex.Athena.Excel.Base.Helpers;
    using Fanex.Athena.Excel.Customer.CustomerClass;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.Enum;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    public class CustomerClassController : CultureBaseController
    {
        private readonly ICustomerClassService _service;
        private readonly IPortalApiService _portalApiService;

        public CustomerClassController(ICustomerClassService service, IPortalApiService portalApiService)
        {
            _service = service;
            _portalApiService = portalApiService;
        }

        public async Task<ViewResult> CustomerClassInformation(byte tabKey = 1)
        {
            ViewBag.TabKey = tabKey;

            var viewModel = await GetModelForTabAsync(tabKey);
            ViewBag.CustomerClass = viewModel.Select(m => Convert.ToInt32(m.Id));

            return View("~/Views/Desktop/Customer/CustomerClass/CustomerClassInformation.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<PartialViewResult> GetCustomerSettingPolicy(byte tabKey = 1, IEnumerable<string> customerClassIds = null)
        {
            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };

            var viewModel = await (tabKey == (byte)CustomerClassTabType.SettingPolicy ? _service.GetSettingPolicy(metaModel) : _service.GetSpreadSettingPolicy(metaModel));
            var model = viewModel;
            if (customerClassIds != null && customerClassIds.Any())
            {
                model = viewModel.Where(i => customerClassIds.Any(id => string.Equals(id, i.Id)));
            }

            var viewName = tabKey == 1
                ? "~/Views/Desktop/Customer/CustomerClass/SettingPolicyTab.cshtml"
                : "~/Views/Desktop/Customer/CustomerClass/SpreadSettingPolicyTab.cshtml";

            return PartialView(viewName, model);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<ActionResult> ExportExcel(byte tabKey = 1, IEnumerable<string> customerClassIds = null)
        {
            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };
            var dataSource = await (tabKey == (byte)CustomerClassTabType.SettingPolicy ? _service.GetSettingPolicy(metaModel) : _service.GetSpreadSettingPolicy(metaModel));

            if (customerClassIds != null && customerClassIds.Any())
            {
                dataSource = dataSource.Where(i => customerClassIds.Any(id => string.Equals(id, i.Id)));
            }

            if (dataSource.Any())
            {
                var templatePath = tabKey == 1
                    ? Server.MapPath(@"~/App_Data/Template/Customers/PlayerSegmentation/CustomerClassSettingPolicy.xls")
                    : Server.MapPath(@"~/App_Data/Template/Customers/PlayerSegmentation/CustomerClassSpreadSettingPolicy.xls");
                var fileName = tabKey == 1
                    ? "CustomerClassSettingPolicy_" + DateTime.Now.ToString("MM-dd-yyyy")
                    : "CustomerClassSpreadSettingPolicy_" + DateTime.Now.ToString("MM-dd-yyyy");
                var reportTitle = tabKey == 1
                    ? ViewResources.CustomerClassSettingPolicy
                    : ViewResources.CustomerClassSpreadSettingPolicy;

                var excel = GetExcelExporter(tabKey, templatePath, reportTitle, dataSource);
                excel.Export();

                return new ExcelResult(excel.Workbook, fileName);
            }

            return File(ExcelHelper.ExportEmptyFile(), "application/vnd.ms-excel", "Empty.xls");
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        public async Task<JsonResult> GetLimitLeagues(GetLimitLeaguesMetaModel metaModel)
        {
            var result = new List<LeagueGroup>();

            foreach (var leagueGroup in metaModel.LeagueGroups)
            {
                var limitLeagues = await _portalApiService.GetLimitLeaguesAsync(
                SessionServiceInstance.LicenseeSession.LicenseeName,
                metaModel.SportType, leagueGroup.LeagueGroupId,
                SessionServiceInstance.UserSession.Language);

                result.Add(new LeagueGroup
                {
                    LeagueGroupId = leagueGroup.LeagueGroupId,
                    LeagueGroupName = leagueGroup.LeagueGroupName,
                    LimitLeagues = limitLeagues,
                });
            }

            return Json(result);
        }

        private static ReportBase GetExcelExporter(byte tabKey, string templatePath, string reportTitle, IEnumerable<CustomerClassModel> source)
        {
            if (tabKey == 1)
            {
                return new CustomerClassSettingPolicyExcel(templatePath, reportTitle, source);
            }
            else
            {
                return new CustomerClassSpreadSettingPolicyExcel(templatePath, reportTitle, source);
            }
        }

        private async Task<IEnumerable<CustomerClassModel>> GetModelForTabAsync(byte tabKey)
        {
            var metaModel = new GetCustomerClassInformationMetaModel
            {
                SiteName = SessionServiceInstance.LicenseeSession.LicenseeName,
                CurrencyList = SessionServiceInstance.UserSession.CurrencyList,
                Language = SessionServiceInstance.UserSession.Language
            };
            switch (tabKey)
            {
                case (byte)CustomerClassTabType.SettingPolicy:
                    return await _service.GetSettingPolicy(metaModel);

                case (byte)CustomerClassTabType.SpreadSettingPolicy:
                    return await _service.GetSpreadSettingPolicy(metaModel);

                case (byte)CustomerClassTabType.AllCustomerClass:
                    {
                        var result = await _service.GetAllCustomerClass(metaModel.Language);
                        return result.GroupBy(_ => _.Id).Select(_ => new CustomerClassModel(_.Key)
                        {
                            Category = String.Join(", ", _.Select(c => c.Category))
                        });
                    }
                default:
                    return await _service.GetSettingPolicy(metaModel);
            }
        }
    }
}