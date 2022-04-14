namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;
    using System.Linq;
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
            metaModel.IsShowIpvn = SessionServiceInstance.UserSession.IsShowIpvn && SessionServiceInstance.UserSession.IsShowIp;
            metaModel.IsShowIp = SessionServiceInstance.UserSession.IsShowIp;

            var viewModel = await BetListApiClient.PostAsync<CashOutBetListDetailViewModel>("/CashOutBetList/Detail", metaModel, userSession.Language).ConfigureAwait(false);

            return this.View("~/Views/Desktop/BetList/CashOutDetail/Main.cshtml", viewModel);
        }

        [HttpGet]
        [ValidationWebRequest]
        public async Task<ActionResult> NewDetail(NewCashOutBetListDetailMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            metaModel.CurrencyId = userSession.CurrencyList.FirstOrDefault(_ => _.Value == metaModel.Currency).Key;

            var viewModel = await BetListApiClient.PostAsync<NewCashOutBetListDetailViewModel>("/CashOutBetList/History", metaModel, userSession.Language).ConfigureAwait(false);

            return this.View("~/Views/Desktop/BetList/NewCashOutDetail/Main.cshtml", viewModel);
        }
    }
}