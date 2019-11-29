// --------------------------------------------------------------------------
// <copyright file="FirstGoalLastGoalTotalBetController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.TotalBets
{
    using DataAccess.TotalBet.Interfaces;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;

    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.TotalBetFirstGoalLastGoal)]
    public class FirstGoalLastGoalTotalBetController : TotalBetBaseController
    {
        private readonly IFirstGoalLastGoalDataAccess _firstGoalLastGoalDataAccess;

        public FirstGoalLastGoalTotalBetController(
            IFirstGoalLastGoalDataAccess firstGoalLastGoalDataAccess)
        {
            _firstGoalLastGoalDataAccess = firstGoalLastGoalDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new FirstGoalLastGoalMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(FirstGoalLastGoalMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(FirstGoalLastGoalMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList
                , metaModel.CurrencyId);
            var result = await _firstGoalLastGoalDataAccess.GetFirstGoalLastGoalDataList(metaModel).ConfigureAwait(false);

            var model = new FirstGoalLastGoalViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = userSession.CurrencyList,
                TotalData = result.TotalData
            };

            return View("~/Views/Desktop/TotalBets/FirstGoalLastGoal/Main.cshtml", model);
        }
    }
}