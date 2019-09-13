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
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.TotalBet.MetaModel;
    using Model.TotalBet.ViewModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    [FunctionAuthorization(PermissionKeys.TotalBetMoneyLine)]
    public class MoneyLineTotalBetController : TotalBetBaseController
    {
        private readonly IMoneyLineDataAccess _moneyLineDataAccess;

        public MoneyLineTotalBetController(
            ILanguageService languageService,
            ISessionService sessionService,
            IMoneyLineDataAccess moneyLineDataAccess)
        : base(languageService, sessionService)
        {
            _moneyLineDataAccess = moneyLineDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new MoneyLineMetaModel
            {
                LicenseeId = SessionService.LicenseeSession.LicenseeId,
                BaseCurrency = SessionService.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(MoneyLineMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionService.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(MoneyLineMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var currencies = userSession.CurrencyList;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
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