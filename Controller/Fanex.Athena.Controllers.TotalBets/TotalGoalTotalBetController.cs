// --------------------------------------------------------------------------
// <copyright file="TotalGoalTotalBetController.cs" company="">
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

    [FunctionAuthorization(PermissionKeys.TotalBetTotalGoal)]
    public class TotalGoalTotalBetController : TotalBetBaseController
    {
        private readonly ITotalGoalDataAccess _totalGoalDataAccess;

        public TotalGoalTotalBetController(
            ITotalGoalDataAccess totalGoalDataAccess)
        {
            _totalGoalDataAccess = totalGoalDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new TotalGoalMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(TotalGoalMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        #region Utility

        private async Task<ActionResult> GetView(TotalGoalMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
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