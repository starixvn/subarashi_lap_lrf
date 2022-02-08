using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using Fanex.Athena.Web.ActionFilter;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportNewCashOutWinLoss)]
    public class NewCashOutWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IReportAPIClient _reportAPIClient;
        private readonly ISubsidiaryService _subsidiaryService;
        private const int TimeOut = 300;

        public NewCashOutWinLossReportController(
            IReportSettingService reportSettingService,
            IReportAPIClient reportAPIClient,
            ISubsidiaryService subsidiaryService)
        {
            _reportSettingService = reportSettingService;
            _reportAPIClient = reportAPIClient;
            _subsidiaryService = subsidiaryService;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var subsidiaryList = _subsidiaryService.GetSubsidiaryTree(userSession, licenseeSession.LicenseeName);
            var viewType = !subsidiaryList.Any() ? SubsidiaryViewType.NotManagement : (SubsidiaryViewType)userSession.SubsidiaryViewType;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportNewCashOutWinLoss,
                licenseeSession.LicenseeName);

            var param = new NewCashOutWinLossMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId
            };

            var model = new NewCashOutWinLossViewModel
            {
                Param = param,
                ReportSetting = reportSetting,
                CurrencyList = userSession.CurrencyList,
                ViewType = viewType,
                SubsidiaryList = subsidiaryList
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/NewCashOutWinLoss/Main.cshtml", model);
        }

        [HttpPost]
        public async Task<ActionResult> Index(NewCashOutWinLossMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            metaModel.AgentListXml = GetAgentList(userSession, licenseeSession.LicenseeName, metaModel);
            metaModel.UserCurrencyList = userSession.CurrencyList;

            if (metaModel.IsExportExcel)
            {
                var response = await _reportAPIClient.PostAsync("api/NewCashOutWinLoss/ExportExcel",
                 metaModel, userSession.Language, MediaType.MsgPack, TimeOut).ConfigureAwait(false);
                return File(response.Item1, response.Item2);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/NewCashOutWinLoss/GetData", metaModel, userSession.Language, TimeOut).ConfigureAwait(false));
        }

        private string GetAgentList(UserAuthInfo user, string licenseeName, NewCashOutWinLossMetaModel metaModel)
        {
            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();
            var currencyAgentList = _subsidiaryService.IsIgnoredSubsidiarySearch(metaModel.SubsidiarySearch, metaModel.SubsidiaryList, user) ?
                    user.CurrencyAgentList : _subsidiaryService.GetCurrencyAgentList(licenseeName, user.CurrencyAgentList, metaModel.SubsidiaryList);

            return AuthParameterHelper.GenerateAgentListXml(currencyAgentList, currencyList, metaModel.IsExcludedTestData);
        }
    }
}