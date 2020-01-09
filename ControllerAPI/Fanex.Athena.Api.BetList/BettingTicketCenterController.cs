namespace Fanex.Athena.Api.BetList
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class BettingTicketCenterController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        public BettingTicketCenterController(
            ILanguageService langService,
            IBetListApiClient betListApiClient)
            : base(langService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcSingleCustomer)]
        [ValidationApiRequest]
        public async Task<dynamic> GetBySingleCustomer(SingleCustomersBetListMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcRefNo)]
        [ValidationApiRequest]
        public async Task<dynamic> GetByRefno(RefNoBetListMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRefno",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcRunning)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        public async Task<dynamic> GetByRunning(BaseBettingTicketMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyList);
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;

            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRunning",
                metaModel,
                userSession.Language
                ).ConfigureAwait(false);
        }
    }
}