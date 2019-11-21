// -----------------------------------------------------------------------
// <copyright file="ColossusBetBetListController.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.UI;

    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportColossusBetsWinLoss)]
    public class ColossusBetBetListController : BetListBaseController
    {
        [HttpGet]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        [ValidationWebRequest]
        public async Task<ActionResult> Detail(ColossusBetDetailMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            metaModel.UserId = userSession.UserId;

            var viewModel = await BetListApiClient.PostAsync<ColossusBetDetailViewModel>("/ColossusBetBetList/Detail",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);

            return this.View("~/Views/Desktop/BetList/ColossusBetDetail/Main.cshtml", viewModel);
        }
    }
}