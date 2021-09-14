namespace Fanex.Athena.Controllers.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel.Common;
    using Fanex.Athena.Model.Report.MetaModel;
    using Fanex.Athena.Model.Report.ViewModel;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DTO.Common;
    using Model.Core.DTO.Configuration;

    [FunctionAuthorization(PermissionKeys.ReportSabaVirtualSportsWinLoss)]
    public class SabaVirtualSportsWinLossReportController : ReportBaseController
    {
        private readonly ISportTypeDataAccess _sportTypeDataAccess;
        private readonly ILeagueDataAccess _leagueDataAccess;
        private readonly IReportSettingService _reportSettingService;
        private readonly IPortalApiService _portalApiService;

        private readonly List<int> _sportList = new List<int> { (int)SportType.Soccer, (int)SportType.BasketBall, (int)SportType.Cricket };

        public SabaVirtualSportsWinLossReportController(
            ISportTypeDataAccess sportTypeDataAccess,
            ILeagueDataAccess leagueDataAccess,
            IReportSettingService reportSettingService,
            IPortalApiService portalApiService
            )
        {
            _sportTypeDataAccess = sportTypeDataAccess;
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
            var date = DateTime.Today;
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

            var sports = (await this._sportTypeDataAccess.GetSportsAndProducts(licenseeSession.LicenseeId, userSession.Language, Product.SB).ConfigureAwait(true))
                    .Where(x => x.ParentId >= 0 && _sportList.Contains(x.ID));

            var model = new SabaVirtualSportsWinLossViewModel
            {
                Param = param,
                CurrencyList = userSession.CurrencyList,
                IsAllowedCustomerCommission = licenseeSession.IsAllowedCustomerComm,
                ReportSetting = reportSetting,
                Sports = sports.ToDictionary(x => x.ID, y => y.Name),
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
            var specialLeagues = await _portalApiService.GetSpecialLeaguesAsync(SessionServiceInstance.LicenseeSession.LicenseeName);
            var leagues = (await _leagueDataAccess.GetSabaVirtualSportLeaguesBySport(metaModel, specialLeagues).ConfigureAwait(false))
                            .Select(x => new { Key = x.LeagueId, Value = x.LeagueName });
            return Json(leagues);
        }
    }
}