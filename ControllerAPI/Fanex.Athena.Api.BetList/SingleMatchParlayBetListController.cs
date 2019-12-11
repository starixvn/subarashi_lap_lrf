namespace Fanex.Athena.Api.BetList
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.BetList.MetaModel;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class SingleMatchParlayBetListController : ApiBetListBaseController
    {
        public SingleMatchParlayBetListController(
             ILanguageService languageService,
             IAuthorizationService authorizationService,
             IBetListApiClient betListApiClient,
             IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpGet]
        public async Task<HttpResponseMessage> Detail(long transId, int custId, string status)
        {
            CheckDataPermission(custId, transId);

            var metaModel = new SingleMatchParlayDetailMetaModel
            {
                CustId = custId,
                TransId = transId,
                Status = status
            };

            return await BridgeClientService.PostAsync(
                "/SingleMatchParlayBetList/Detail",
                metaModel,
                SessionService.UserSession.Language).ConfigureAwait(false);
        }
    }
}
