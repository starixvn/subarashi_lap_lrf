// ForecastController.NewHandicapOverUnder.cs--------------------------------
// <copyright file="NewHandicapOverUnderForecastController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Forecast
{
    using DataAccess.Core.Common.Interfaces;
    using DataAccess.Forecast.Interfaces;

    using Fanex.Athena.Extension.Helpers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Logging;

    using Model.Forecast.DTO.NewForecastHdpOu;
    using Model.Forecast.MetaModel;
    using Model.Forecast.ViewModel;

    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using VendorAdapter.Interfaces;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ForecastHandicapOverUnderLive)]
    public class NewHandicapOverUnderForecastController : ForecastBaseController
    {
        private readonly ILogger _logger;

        private readonly ICacheRefAdapter _cacheRefAdapter;

        private readonly IMatchService _matchService;

        private readonly ILeagueDataAccess _leagueDataAccess;

        private readonly INewForecastDataAccess _forecastDataAccess;

        public NewHandicapOverUnderForecastController(
            INewForecastDataAccess forecastDataAccess,
            ILogger logger,
            ICacheRefAdapter cacheRefAdapter,
            IMatchService matchService,
            ILeagueDataAccess leagueDataAccess
            )
        {
            _logger = logger;
            _cacheRefAdapter = cacheRefAdapter;
            _matchService = matchService;
            _forecastDataAccess = forecastDataAccess;
            _leagueDataAccess = leagueDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index(int leagueId = 0, int matchId = 0, int currencyId = 0, string baseCurrency = null)
        {
            var licenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            if (AppSettingInstance.LicenseeOfferNewForecast.Contains(licenseeId))
            {
                var metaModel = new NewForecastHandicapOverUnderMetaModel
                {
                    LicenseeId = licenseeId,
                    UserId = SessionServiceInstance.UserSession.UserId,
                    MatchId = matchId,
                    CurrencyId = currencyId,
                    LeagueId = leagueId,
                    BaseCurrency = string.IsNullOrEmpty(baseCurrency) ? SessionServiceInstance.UserSession.DefaultBaseCurrency
                    : baseCurrency
                };

                var viewModel = await GetViewModel(metaModel);
                return View("~/Views/Desktop/Forecast/NewForecastHdpOu/Main.cshtml", viewModel);
            }
            else
            {
                return RedirectToAction("ForecastHandicapOverUnder");
            }
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest]
        public async Task<ActionResult> Index(NewForecastHandicapOverUnderMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            metaModel.UserId = SessionServiceInstance.UserSession.UserId;

            var viewModel = await GetViewModel(metaModel);
            return View("~/Views/Desktop/Forecast/NewForecastHdpOu/Main.cshtml", viewModel);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        public async Task<ViewResult> GetMatchListByLeague(int leagueId)
        {
            var matchList = (await _matchService.GetForecastMatchListByLeagueAsync(leagueId)).OrderBy(x => x.MatchName).ToList();
            return View("~/Views/Desktop/Forecast/NewForecastHdpOu/MatchOptionList.cshtml", matchList);
        }

        [SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes", Justification = "Reviewed.")]
        private async Task<NewForecastHdpOuViewModel> GetViewModel(NewForecastHandicapOverUnderMetaModel metaModel)
        {
            IList<Match> matchList = new List<Match>();
            IList<League> leagueList = new List<League>();
            var headerInfo = new NewForecastHdpOuMatchInfo();
            var userSession = SessionServiceInstance.UserSession;
            var model = new NewForecastHdpOuViewModel
            {
                Param = metaModel,
                LeagueList = leagueList,
                MatchList = matchList,
                HeaderInfo = headerInfo,
                MainData = new NewForecastHdpOuData(),
                CurrencyList = userSession.CurrencyList
            };
            try
            {
                metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                    metaModel.CurrencyId);

                if (!Request.IsAjaxRequest())
                {
                    await AssignDataForNonAjaxRequest(metaModel, model);
                }

                metaModel.HomeTeamName = _cacheRefAdapter.GetTeamName(metaModel.HomeTeamId) + (metaModel.IsNeutral ? " (n)" : string.Empty);
                metaModel.AwayTeamName = _cacheRefAdapter.GetTeamName(metaModel.AwayTeamId);
                model.MainData = metaModel.IsValid ?
                    await _forecastDataAccess.GetNewForecastData(metaModel, headerInfo) :
                    new NewForecastHdpOuData();
                model.HeaderInfo = headerInfo;
            }
            catch (Exception exception)
            {
                _logger.Error(LogMessageHelper.GenerateMessage(exception));
            }

            return model;
        }

        private async Task AssignDataForNonAjaxRequest(NewForecastHandicapOverUnderMetaModel metaModel, NewForecastHdpOuViewModel model)
        {
            model.LeagueList = await _leagueDataAccess.GetRunningLeagues(metaModel.AgentListXml, metaModel.BetTypeString);
            if (model.LeagueList.Any())
            {
                metaModel.LeagueId = GetLeagueId(metaModel.LeagueId, model.LeagueList);
                if (metaModel.LeagueId > 0)
                {
                    await AssignMatchData(metaModel, model);
                }
            }

            model.Param = metaModel;
        }

        private async Task AssignMatchData(NewForecastHandicapOverUnderMetaModel metaModel, NewForecastHdpOuViewModel model)
        {
            model.MatchList = (await _matchService.GetForecastMatchListByLeagueAsync(metaModel.LeagueId)).OrderBy(x => x.MatchName).ToList();

            if (model.MatchList.Count > 0)
            {
                /*get current match or first match*/
                var match = model.MatchList.SingleOrDefault(l => l.MatchId == metaModel.MatchId);
                if (match == null)
                {
                    match = model.MatchList.FirstOrDefault();
                }

                if (match != null)
                {
                    metaModel.MatchId = match.MatchId;
                    metaModel.HomeTeamId = match.HomeId;
                    metaModel.AwayTeamId = match.AwayId;
                    metaModel.IsNeutral = match.IsNeutral;
                }
                else
                {
                    metaModel.MatchId = -1;
                }
            }
        }
    }
}