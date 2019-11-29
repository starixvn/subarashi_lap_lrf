// --------------------------------------------------------------------------
// <copyright file="HalfTimeFullTimeTotalBetController.cs" company="">
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

    [FunctionAuthorization(PermissionKeys.TotalBetHalfTimeFullTime)]
    public class HalfTimeFullTimeTotalBetController : TotalBetBaseController
    {
        private readonly IHalfTimeFullTimeDataAccess _halfTimeFullTimeDataAccess;

        public HalfTimeFullTimeTotalBetController(
            IHalfTimeFullTimeDataAccess halfTimeFullTimeDataAccess)
        {
            _halfTimeFullTimeDataAccess = halfTimeFullTimeDataAccess;
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var param = new HalfTimeFullTimeMetaModel
            {
                LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId,
                BaseCurrency = SessionServiceInstance.UserSession.DefaultBaseCurrency
            };

            return await this.GetView(param).ConfigureAwait(false);
        }

        [HttpPost]
        [CustomValidateAntiForgery]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(HalfTimeFullTimeMetaModel metaModel)
        {
            metaModel.LicenseeId = SessionServiceInstance.LicenseeSession.LicenseeId;
            return await this.GetView(metaModel).ConfigureAwait(false);
        }

        private async Task<ActionResult> GetView(HalfTimeFullTimeMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList,
                metaModel.CurrencyId);
            var result = await _halfTimeFullTimeDataAccess.GetHalfTimeFullTimeDataList(metaModel).ConfigureAwait(false);
            var totalData = result.TotalData;
            var model = new HalfTimeFullTimeViewModel
            {
                Param = metaModel,
                MainData = result.DataList.ToList(),
                CurrencyList = userSession.CurrencyList,
                TotalRunningStake = totalData.HomeHome + totalData.HomeDraw + totalData.HomeAway + totalData.DrawHome +
                                    totalData.DrawDraw + totalData.DrawAway + totalData.AwayHome + totalData.AwayAway
            };
            return View("~/Views/Desktop/TotalBets/HalfTimeFullTime/Main.cshtml", model);
        }
    }
}