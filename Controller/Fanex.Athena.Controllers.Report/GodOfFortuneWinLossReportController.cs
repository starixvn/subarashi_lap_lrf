namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportGodOfFortuneWinLoss)]
    public class GodOfFortuneWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IReportAPIClient _reportAPIClient;

        public GodOfFortuneWinLossReportController(IReportSettingService reportSettingService, IReportAPIClient reportAPIClient)
        {
            _reportSettingService = reportSettingService;
            _reportAPIClient = reportAPIClient;
        }

        [HttpGet]
        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss,
                licenseeSession.LicenseeName);
            var date = DateTime.Today;

            var param = new GodOfFortuneWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                IsConvertAll = true,
                DrawFilter = DrawFilterType.Normal,
                ReportBy = ReportByType.Daily,
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key,
            };

            var model = new GodOfFortuneWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting
            };

            return View("~/Views/Desktop/Report/GodOfFortuneWinLoss/Main.cshtml", model);
        }

        [HttpPost]
        public Task<dynamic> Index(
            GodOfFortuneWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int custId = 0,
            int dCurrencyId = 0,
            string currencyName = null)
        {
            return ProcessRequest(metaModel, fdate, tdate, level, dCurrencyId, custId, currencyName);
        }

        private async Task<dynamic> ProcessRequest(
            GodOfFortuneWinLossMetaModel metaModel,
            DateTime? fdate,
            DateTime? tdate,
            int level = 0,
            int dCurrencyId = 0,
            int custId = 0,
            string currencyName = null)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.DrillDownLevel = level;
            metaModel.DrillDownFromDate = fdate ?? metaModel.DrillDownFromDate;
            metaModel.DrillDownToDate = tdate ?? metaModel.DrillDownToDate;

            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            metaModel.DrillDownCurrencyName = currencyName;
            metaModel.DrillDownCustomerId = custId;
            metaModel.UserCurrencyList = userSession.CurrencyList;

            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                level == 0 ? currencyList : new[] { dCurrencyId }, metaModel.IsExcludedTestData);

            if (metaModel.IsExportExcel)
            {
                const string FileName = "GodOfFortuneWinLoss.xls";

                var response = await _reportAPIClient.PostAsync("api/GodOfFortuneWinLoss/ExportExcel", metaModel,
                    userSession.Language, MediaType.MsgPack).ConfigureAwait(false);

                return File(response.Item1, "application/octet-stream", FileName);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/GodOfFortuneWinLoss/Index", metaModel, userSession.Language).ConfigureAwait(false));
        }

        protected internal virtual bool IsValidParams(GodOfFortuneWinLossMetaModel metaModel)
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;

            var setting = _reportSettingService.GetSetting(PermissionKeys.ReportGodOfFortuneWinLoss,
                licenseeSession.LicenseeName);

            if (setting == null)
            {
                return true;
            }

            var fromDate = metaModel.DrillDownLevel == 0 ? metaModel.FromDate : metaModel.DrillDownFromDate;
            var toDate = metaModel.DrillDownLevel == 0 ? metaModel.ToDate : metaModel.DrillDownToDate;
            return DateTimeHelper.IsBetween(fromDate, setting.MinDate, setting.MaxDate) &&
                DateTimeHelper.IsBetween(toDate, setting.MinDate, setting.MaxDate);
        }
    }
}