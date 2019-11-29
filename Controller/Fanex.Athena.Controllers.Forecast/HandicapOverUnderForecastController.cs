// --------------------------------------------------------------------------
// <copyright file="HandicapOverUnderForecastController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Forecast
{
    using DataAccess.Core.Common.Interfaces;
    using DataAccess.Forecast.Interfaces;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.Forecast.MetaModel;
    using Model.Forecast.ViewModel;

    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ForecastHandicapOverUnderLive)]
    public class HandicapOverUnderForecastController : ForecastBaseController
    {
        private readonly ILeagueDataAccess _leagueDataAaccess;

        private readonly IForecastDataAccess _forecastDataAccess;

        public HandicapOverUnderForecastController(
            ILeagueDataAccess leagueDataAccess,
            IForecastDataAccess forecastDataAccess)
        {
            _leagueDataAaccess = leagueDataAccess;
            _forecastDataAccess = forecastDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var liceseeSession = SessionServiceInstance.LicenseeSession;
            var userSession = SessionServiceInstance.UserSession;
            if (AppSettingInstance.LicenseeOfferNewForecast.Contains(liceseeSession.LicenseeId))
            {
                return this.RedirectToAction("Index", "NewHandicapOverUnderForecast");
            }

            var metaModel = new ForecastHandicapOverUnderMetaModel
            {
                LicenseeId = liceseeSession.LicenseeId,
                UserId = userSession.UserId,
                BaseCurrency = userSession.DefaultBaseCurrency
            };

            var model = await GetViewModel(metaModel).ConfigureAwait(false);

            return View("~/Views/Desktop/Forecast/ForecastHDPOU/Main.cshtml", model);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<ActionResult> Index(ForecastHandicapOverUnderMetaModel metaModel)
        {
            var model = await GetViewModel(metaModel).ConfigureAwait(false);

            return View("~/Views/Desktop/Forecast/ForecastHDPOU/Main.cshtml", model);
        }

        private async Task<ForecastHdpOuViewModel> GetViewModel(ForecastHandicapOverUnderMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId);
            var leagueList = await _leagueDataAaccess.GetRunningLeagues(metaModel.AgentListXml, metaModel.BetTypeString);
            var currentLeagueId = metaModel.LeagueId;
            metaModel.LeagueId = GetLeagueId(currentLeagueId, leagueList);
            var forecastHdpOuByLeague = await _forecastDataAccess.GetForecastHandicapOverUnder(metaModel);

            return new ForecastHdpOuViewModel
            {
                Param = metaModel,
                MainData = forecastHdpOuByLeague,
                LeagueList = leagueList,
                CurrencyList = userSession.CurrencyList
            };
        }
    }
}