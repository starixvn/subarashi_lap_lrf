namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

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
        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetBySingleCustomer(SingleCustomersBetListMetaModel metaModel)
        {
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetBySingleCustomer",
                metaModel,
                SessionService.UserSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcRefNo)]
        [ValidationApiRequest]
        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetByRefno(RefNoBetListMetaModel metaModel)
        {
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRefno",
                metaModel,
                SessionService.UserSession.Language
                ).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcRunning)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetByRunning(BaseBettingTicketMetaModel metaModel)
        {
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            return await _betListApiClient.PostAsync("/BettingTicketCenter/GetByRunning",
                metaModel,
                SessionService.UserSession.Language
                ).ConfigureAwait(false);
        }
    }
}