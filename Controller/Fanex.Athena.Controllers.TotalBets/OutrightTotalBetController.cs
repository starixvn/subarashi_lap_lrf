// --------------------------------------------------------------------------
// <copyright file="OutrightTotalBetController.cs" company="">
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

    using System.Threading.Tasks;
    using System.Web.Mvc;

    [FunctionAuthorization(PermissionKeys.TotalBetOutright)]
    public class OutrightTotalBetController : TotalBetBaseController
    {
        private readonly IOutrightDataAccess _outrightDataAccess;

        public OutrightTotalBetController(
            IOutrightDataAccess outrightDataAccess)
        {
            _outrightDataAccess = outrightDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new OutrightMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(OutrightMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(OutrightMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
            var dataList = await _outrightDataAccess.GetOutrightDataList(metaModel).ConfigureAwait(false);
            var model = new OutrightViewModel
            {
                Param = metaModel,
                MainData = dataList,
                CurrencyList = userSession.CurrencyList
            };

            return View("~/Views/Desktop/TotalBets/Outright/Main.cshtml", model);
        }
    }
}