// --------------------------------------------------------------------------
// <copyright file="OddEvenDrawNoDrawTotalBetController.cs" company="">
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

    [FunctionAuthorization(PermissionKeys.TotalBetOddEven1x2DND)]
    public class OddEvenDrawNoDrawTotalBetController : TotalBetBaseController
    {
        private readonly IOddEvenDrawNoDrawDataAccess _oddEvenDrawNoDrawDataAccess;

        public OddEvenDrawNoDrawTotalBetController(
            IOddEvenDrawNoDrawDataAccess oddEvenDrawNoDrawDataAccess)
        {
            _oddEvenDrawNoDrawDataAccess = oddEvenDrawNoDrawDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new OddEvenDrawNoDrawMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(OddEvenDrawNoDrawMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        #region Utility

        private async Task<ActionResult> GetView(OddEvenDrawNoDrawMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var currencies = SessionServiceInstance.UserSession.CurrencyList;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
            var result = await _oddEvenDrawNoDrawDataAccess.GetOddEvenDrawNoDrawDataList(metaModel).ConfigureAwait(false);
            var model = new OddEvenDrawNoDrawViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = currencies,
                TotalData = result.TotalData
            };

            return View("~/Views/Desktop/TotalBets/OddEvenDrawNoDraw/Main.cshtml", model);
        }

        #endregion Utility
    }
}