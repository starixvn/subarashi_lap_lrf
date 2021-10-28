using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Report.MetaModel;
using Fanex.Athena.Model.Report.ViewModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;
using Fanex.Athena.Web.ActionFilter;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.Report
{
    [FunctionAuthorization(PermissionKeys.ReportLeagueWinLoss)]
    public class LeagueWinLossReportController : ReportBaseController
    {
        private readonly IReportSettingService _reportSettingService;
        private readonly IReportAPIClient _reportAPIClient;
        private const int TimeOut = 300;

        public LeagueWinLossReportController(IReportSettingService reportSettingService, IReportAPIClient reportAPIClient)
        {
            _reportSettingService = reportSettingService;
            _reportAPIClient = reportAPIClient;
        }

        public ActionResult Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportLeagueWinLoss,
                licenseeSession.LicenseeName);
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
               licenseeSession.LicenseeId,
               userSession.Language,
               FunctionNames.LeagueWinLoss);

            var param = new LeagueWinLossMetaModel
            {
                LicenseeId = licenseeSession.LicenseeId,
                ProductOptions = ToProductOptions(productAccess.ProductList)
            };

            var model = new LeagueWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                StatusList = GetStatusList()
            };
            ViewBag.DefaultSelectedBaseCurrency = userSession.DefaultBaseCurrency;

            return View("~/Views/Desktop/Report/LeagueWinLoss/Main.cshtml", model);
        }

        [HttpPost]
        public async Task<ActionResult> Index(LeagueWinLossMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = GetAgentList(metaModel, userSession);

            if (metaModel.IsExportExcel)
            {
                metaModel.UserCurrencyList = userSession.CurrencyList;
                var response = await _reportAPIClient.PostAsync("api/LeagueWinLoss/ExportExcel",
                 metaModel, userSession.Language, MediaType.MsgPack).ConfigureAwait(false);
                return File(response.Item1, response.Item2);
            }

            return JsonString(await _reportAPIClient.PostStringAsync("api/LeagueWinLoss/GetMainData", metaModel, userSession.Language, TimeOut).ConfigureAwait(false));
        }

        [HttpPost]
        public async Task<ActionResult> CurrencyData(LeagueWinLossMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = GetAgentList(metaModel, userSession);

            return JsonString(await _reportAPIClient.PostStringAsync("api/LeagueWinLoss/GetCurrencyData", metaModel, userSession.Language).ConfigureAwait(false));
        }

        private static string GetAgentList(LeagueWinLossMetaModel metaModel, UserAuthInfo userSession)
        {
            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();

            return AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyList);
        }

        private static IEnumerable<CheckedItem> GetStatusList()
        {
            return new List<CheckedItem>
            {
                new CheckedItem { ID = StatusTypes.Won, Name = ViewResources.Won, Checked = true },
                new CheckedItem { ID = StatusTypes.Lose, Name = ViewResources.Lose, Checked = true },
                new CheckedItem { ID = StatusTypes.Draw, Name = ViewResources.Draw, Checked = true }
            };
        }
    }
}