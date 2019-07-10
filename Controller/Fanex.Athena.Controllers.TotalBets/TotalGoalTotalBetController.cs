// --------------------------------------------------------------------------
// <copyright file="TotalGoalTotalBetController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.TotalBets
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using DataAccess.TotalBet.Interfaces;
    using Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Model.Core.DataDomain;
    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.TotalBetTotalGoal)]
    public class TotalGoalTotalBetController : TotalBetBaseController
    {
        private readonly ITotalGoalDataAccess _totalGoalDataAccess;

        public TotalGoalTotalBetController(
            ILanguageService languageService,
            ISessionService sessionService,
            IAppSettings appSetting,
            ITotalGoalDataAccess totalGoalDataAccess)
        : base(languageService, sessionService, appSetting)
        {
            _totalGoalDataAccess = totalGoalDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new TotalGoalMetaModel
            {
                LicenseeId = SessionService.LicenseeSession.LicenseeId,
                BaseCurrency = SessionService.UserSession.DefaultBaseCurrency

            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(TotalGoalMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionService.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        #region Utility

        private async Task<ActionResult> GetView(TotalGoalMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
            var result = await _totalGoalDataAccess.GetTotalGoalDataList(metaModel).ConfigureAwait(false);
            var model = new TotalGoalViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = userSession.CurrencyList,
                TotalData = result.TotalData
            };

            return View("~/Views/Desktop/TotalBets/TotalGoal/Main.cshtml", model);

        }

        #endregion Utility
    }
}