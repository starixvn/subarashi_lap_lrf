// --------------------------------------------------------------------------
// <copyright file="HandicapOverUnderTotalBetController.cs" company="">
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

    [FunctionAuthorization(PermissionKeys.TotalBetHandicapOverUnderLive)]
    public class HandicapOverUnderTotalBetController : TotalBetBaseController
    {
        private readonly IHandicapOverUnderDataAccess _handicapOverUnderDataAccess;

        public HandicapOverUnderTotalBetController(
            IHandicapOverUnderDataAccess handicapOverUnderDataAccess)
        {
            _handicapOverUnderDataAccess = handicapOverUnderDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new HandicapOverUnderMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(HandicapOverUnderMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(HandicapOverUnderMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var licenseeSession = SessionServiceInstance.LicenseeSession;
            var currencies = userSession.CurrencyList;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
            var result = await _handicapOverUnderDataAccess.GetHandicapOverUnderDataList(metaModel).ConfigureAwait(false);

            var model = new HandicapOverUnderViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = currencies,
                TotalData = result.TotalData
            };

            ViewBag.LicenseeView = AppSettingInstance.LicenseeOfferNewForecast.Contains(licenseeSession.LicenseeId) ?
                "ContentDataBodog.cshtml" :
                "ContentData.cshtml";

            return View("~/Views/Desktop/TotalBets/HandicapOverUnder/Main.cshtml", model);
        }
    }
}