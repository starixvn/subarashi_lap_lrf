namespace Fanex.Athena.Api.BetList
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;

    using Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Model.BetList.MetaModel;
    using Resources;
    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
    public class BettingTicketCenterAdvancedSearchController : BaseApiController
    {
        private const int ServerBusyErrorCode = 1002;

        private readonly IAppSettings _appSettings;

        private readonly IBetListApiClient _betListApiClient;

        public BettingTicketCenterAdvancedSearchController(
            ILanguageService langService,
            IAppSettings appSettings,
            IBetListApiClient betListApiClient)
            : base(langService)
        {
            _appSettings = appSettings;
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetData(AdvancedSearchBetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            if (metaModel.IsExport &&
                _appSettings.IsDisableExportLargeBetList
                && _appSettings.LicenseesWithLargeData.Contains(licenseeSession.LicenseeName))
            {
                return new
                {
                    ErrorCode = ServerBusyErrorCode,
                    ErrorMsg = ViewResources.ServerBusyMessage
                };
            }

            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            var timeOutInSecond = int.Parse(_appSettings.GetValue("BetListApiOutInSecond"));
            return await _betListApiClient.PostAsync("/BettingTicketCenterAdvancedSearch/GetData",
                metaModel, SessionService.UserSession.Language, timeOutInSecond).ConfigureAwait(false);
        }
    }
}