namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class CashOutBetListController : BetListBaseController
    {
        [HttpGet]
        [ValidationWebRequest]
        public async Task<ActionResult> Detail(CashOutBetListDetailMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            metaModel.HasPlayerComm = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm;

            var viewModel = await BetListApiClient.PostAsync<CashOutBetListDetailViewModel>("/CashOutBetList/Detail", metaModel, userSession.Language).ConfigureAwait(false);

            return this.View("~/Views/Desktop/BetList/CashOutDetail/Main.cshtml", viewModel);
        }
    }
}