// --------------------------------------------------------------------------
// <copyright file="MoneyLineTotalBetController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Controllers.TotalBets
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using DataAccess.TotalBet.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;

    [FunctionAuthorization(PermissionKeys.TotalBetMoneyLine)]
    public class MoneyLineTotalBetController : TotalBetBaseController
    {
        private readonly IMoneyLineDataAccess _moneyLineDataAccess;
        private readonly IAuthorizationService _authService;

        public MoneyLineTotalBetController(
            IMoneyLineDataAccess moneyLineDataAccess,
            IAuthorizationService authService)
        {
            _moneyLineDataAccess = moneyLineDataAccess;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new MoneyLineMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(MoneyLineMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(MoneyLineMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var currencies = userSession.CurrencyList;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId);
            metaModel.UserId = userSession.UserId;
            metaModel.HasMonitoringPermission = _authService.HasPermissions(userSession, PermissionKeys.MatchMonitoringSetting);

            var result = await _moneyLineDataAccess.GetMoneyLineDataList(metaModel).ConfigureAwait(false);

            var model = new MoneyLineViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = currencies,
                TotalData = result.TotalData
            };
            return View("~/Views/Desktop/TotalBets/MoneyLine/Main.cshtml", model);
        }
    }
}