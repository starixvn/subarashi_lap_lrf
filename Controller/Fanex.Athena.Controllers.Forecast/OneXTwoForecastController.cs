// --------------------------------------------------------------------------
// <copyright file="OneXTwoForecastController.cs" company="">
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

    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.ForecastOneXTwo)]
    public class OneXTwoForecastController : ForecastBaseController
    {
        private readonly ILeagueDataAccess _leagueDataAccess;

        private readonly IForecastOneXTwoDataAccess _forecastOneXTwoDataAccess;

        public OneXTwoForecastController(
            ILeagueDataAccess leagueDataAccess,
            IForecastOneXTwoDataAccess forecastOneXTwoDataAccess)
        {
            _leagueDataAccess = leagueDataAccess;
            _forecastOneXTwoDataAccess = forecastOneXTwoDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var metaModel = new ForecastOneXTwoMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await ProcessAction(metaModel).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<ActionResult> Index(ForecastOneXTwoMetaModel metaModel)
        {
            return await ProcessAction(metaModel).ConfigureAwait(false);
        }

        public async Task<ActionResult> Popup(ForecastOneXTwoMetaModel metaModel)
        {
            metaModel.IsPopUp = true;
            return await ProcessAction(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> ProcessAction(ForecastOneXTwoMetaModel metaModel)
        {
            if (metaModel.LicenseeId <= 0)
            {
                metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            }

            var model = await GetViewModel(metaModel).ConfigureAwait(false);

            return View("~/Views/Desktop/Forecast/Forecast1X2/Main.cshtml", model);
        }

        private async Task<ForecastOneXTwoViewModel> GetViewModel(ForecastOneXTwoMetaModel metaModel)
        {
            var model = new ForecastOneXTwoViewModel();
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);

            var leagueList = await _leagueDataAccess.GetRunningLeagues(metaModel.AgentListXml, metaModel.BetTypeString);
            var currentLeagueId = metaModel.LeagueId;

            if (metaModel.MatchId != 0)
            {
                var forecastOneXTwoByMatch = await _forecastOneXTwoDataAccess.GetForecastOneXTwoByMatch(metaModel);
                model.MainData = forecastOneXTwoByMatch;
            }
            else
            {
                metaModel.LeagueId = GetLeagueId(currentLeagueId, leagueList);

                var forecastcOneXTwoByLeague = await _forecastOneXTwoDataAccess.GetForecastOneXTwoByLeague(metaModel);
                model.MainData = forecastcOneXTwoByLeague;
            }

            model.Param = metaModel;
            model.LeagueList = leagueList;
            model.CurrencyList = userSession.CurrencyList;

            return model;
        }
    }
}