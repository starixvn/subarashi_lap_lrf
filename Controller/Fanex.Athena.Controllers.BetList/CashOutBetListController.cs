namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using VendorAdapter.Interfaces;

    public class CashOutBetListController : BetListBaseController
    {
#pragma warning disable S107 // Methods should not have too many parameters

        public CashOutBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient, ILicenseeSettingService licenseeSettingService)
#pragma warning restore S107 // Methods should not have too many parameters
      : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        {
        }

        [HttpGet]
        [ValidationWebRequest]
        public async Task<ActionResult> Detail(CashOutBetListDetailMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            metaModel.HasPlayerComm = SessionService.LicenseeSession.IsAllowedCustomerComm;

            var viewModel = await BetListApiClient.PostAsync<CashOutBetListDetailViewModel>("/CashOutBetList/Detail", metaModel, userSession.Language).ConfigureAwait(false);

            return this.View("~/Views/Desktop/BetList/CashOutDetail/Main.cshtml", viewModel);
        }
    }
}