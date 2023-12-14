namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.UI.WebControls;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;

    [FunctionAuthorization(PermissionKeys.ReportSabaVirtualSportsWinLoss)]
    public class SabaVirtualSportsWinLossReportController : ReportBaseController
    {
        private readonly ISportService _sportService;
        private readonly ILeagueDataAccess _leagueDataAccess;
        private readonly IReportSettingService _reportSettingService;
        private readonly IPortalApiService _portalApiService;

        private readonly IEnumerable<(int Id, int SportId, string Name, IEnumerable<int> SabaSportIds)> _sportList = new List<(int, int, string, IEnumerable<int>)>
        {
            (1, (int)SportType.Soccer, ViewResources.Soccer, new[] { (int)SportType.SabaSoccer, (int)SportType.SabaFutsal }),
            (-1, (int)SportType.Soccer, ViewResources.SoccerPinGoal, new[] { (int)SportType.SabaSoccerPingoal }),
            (2, (int)SportType.BasketBall, ViewResources.Basketball, new[] { (int)SportType.SabaBasketball }),
            (-2, (int)SportType.BasketBall, ViewResources.BasketballPinGoal, new[] { (int)SportType.SabaBasketballPinGoal }),
            (50, (int)SportType.Cricket, ViewResources.Cricket , new[] { (int)SportType.SabaCricket }),
            (-43, (int)SportType.Esports, ViewResources.ESportsPinGoal, new[] { (int)SportType.SabaESportsPinGoal }),
            (5, (int)SportType.Tennis, ViewResources.Tennis , new[] { (int)SportType.SabaTennis }),
        };

        public SabaVirtualSportsWinLossReportController(
            ISportService sportService,
            ILeagueDataAccess leagueDataAccess,
            IReportSettingService reportSettingService,
            IPortalApiService portalApiService
            )
        {
            _sportService = sportService;
            _leagueDataAccess = leagueDataAccess;
            _reportSettingService = reportSettingService;
            _portalApiService = portalApiService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            var reportSetting = _reportSettingService.GetSetting(PermissionKeys.ReportSabaVirtualSportsWinLoss,
                licenseeSession.LicenseeName);
            var date = DateTimeHelper.Today;
            var productAccess = ProductServiceInstance.GetSingleWalletProductAccess(
               licenseeSession.LicenseeId,
               userSession.Language,
               FunctionNames.SabaVirtualSportsWinLoss);

            var param = new SabaVirtualSportsWinLossMetaModel
            {
                FromDate = date,
                ToDate = date,
                LicenseeId = licenseeSession.LicenseeId,
                IsExcludedTestData = true,
                DrawFilter = DrawFilterType.Normal,
                ReportBy = ReportByType.Daily,
                ProductOptions = ToProductOptions(productAccess.ProductList),
                BaseCurrency = userSession.DefaultBaseCurrency,
                CurrencyId = SystemConstants.BaseCurrencyList
                .FirstOrDefault(x => x.Value.Equals(userSession.DefaultBaseCurrency, StringComparison.OrdinalIgnoreCase))
                .Key,
            };

            var sports = await _sportService.GetSportsAndProducts(licenseeSession.LicenseeId, userSession.Language, Product.SB).ConfigureAwait(true);

            var model = new SabaVirtualSportsWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                Sports = _sportList.Where(x => sports.Any(_ => _.ID == x.SportId && _.ParentId >= 0)).ToDictionary(x => x.Id, y => y.Name),
                Leagues = new Dictionary<int, string>()
            };
            return View("~/Views/Desktop/Report/SabaVirtualSportsWinLoss/Main.cshtml", model);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [AutoBindMetaModel(BindAgent = true, BindUserId = true)]
        public async Task<ActionResult> GetLeaguesBySport(LeagueMetaModel metaModel)
        {
            var sabaSports = _sportService.GetSabaSports();
            var sabaSportIds = _sportList.SelectMany(_ => _.SabaSportIds);

            if (metaModel.SportId != 0)
            {
                sabaSportIds = _sportList.FirstOrDefault(_ => _.Id == metaModel.SportId).SabaSportIds;
                metaModel.SportId = _sportList.FirstOrDefault(_ => _.Id == metaModel.SportId).SportId;
            }

            var leagueGroupIds = sabaSports.Where(_ => sabaSportIds.Contains(_.Id)).SelectMany(_ => _.LeagueGroupIds).ToList();

            var specialLeagues = await _portalApiService.GetSpecialLeaguesAsync(SessionServiceInstance.LicenseeSession.LicenseeName);
            var leagues = (await _leagueDataAccess.GetLeaguesBySport(metaModel, specialLeagues).ConfigureAwait(false))
                .Where(x => leagueGroupIds.Contains(x.LeagueGroupId)).ToList();

            if (leagues.Any())
            {
                leagues.Insert(0, new League
                {
                    LeagueId = 0,
                    LeagueName = ViewResources.All
                });
            }

            return Json(leagues.Select(x => new { Key = x.LeagueId, Value = x.LeagueName }));
        }
    }
}