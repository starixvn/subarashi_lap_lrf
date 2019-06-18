namespace Fanex.Athena.Api.BetList
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Core.Helper;
    using Model.BetList.MetaModel;
    using Model.Core.DataDomain;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Core.Utility.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class BettingTicketCenterController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        public BettingTicketCenterController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            IBetListApiClient betListApiClient)
            : base(sessionService, productService, langService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ValidationApiRequest]
        public async Task<dynamic> GetBySingleCustomer(SingleCustomersBetListMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.UserCurrencyList = userSession.CurrencyList;
            metaModel.AgentListXml = SessionService.GenerateAgentListXml();

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ValidationApiRequest]
        public async Task<dynamic> GetByRefno(RefNoBetListMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = SessionService.GenerateAgentListXml();
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.UserCurrencyList = userSession.CurrencyList;

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRefno",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        public async Task<dynamic> GetByRunning(BaseBettingTicketMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();

            metaModel.AgentListXml = SessionService.GenerateAgentListXml(currencyList);
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.UserCurrencyList = userSession.CurrencyList;

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRunning",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }
    }
}