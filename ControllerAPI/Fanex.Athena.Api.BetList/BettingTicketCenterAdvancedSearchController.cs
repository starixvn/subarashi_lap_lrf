namespace Fanex.Athena.Api.BetList
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;

    using Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.Customer.Interfaces;
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

        private readonly ISportService _sportService;

        private readonly ICustomerClassService _customerClassService;

        public BettingTicketCenterAdvancedSearchController(
            ILanguageService langService,
            IAppSettings appSettings,
            IBetListApiClient betListApiClient,
            ISportService sportService,
            ICustomerClassService customerClassService)
            : base(langService)
        {
            _appSettings = appSettings;
            _betListApiClient = betListApiClient;
            _sportService = sportService;
            _customerClassService = customerClassService;
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetData(AdvancedSearchBetListMetaModel metaModel)
        {
            if (metaModel.IsExport &&
                _appSettings.IsDisableExportLargeBetList
                && _appSettings.LicenseesWithLargeData.Contains(SessionService.LicenseeSession.LicenseeName))
            {
                return new
                {
                    ErrorCode = ServerBusyErrorCode,
                    ErrorMsg = ViewResources.ServerBusyMessage
                };
            }

            UpdateMetaModel(metaModel);

            var timeOutInSecond = int.Parse(_appSettings.GetValue("BetListApiOutInSecond"));
            return await _betListApiClient.PostAsync("/BettingTicketCenterAdvancedSearch/GetData",
                metaModel, SessionService.UserSession.Language, timeOutInSecond).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetExportStatus(AdvancedSearchBetListMetaModel metaModel)
        {
            if (_appSettings.IsDisableExportLargeBetList
                && _appSettings.LicenseesWithLargeData.Contains(SessionService.LicenseeSession.LicenseeName))
            {
                return new
                {
                    ErrorCode = ServerBusyErrorCode,
                    ErrorMsg = ViewResources.ServerBusyMessage
                };
            }

            UpdateMetaModel(metaModel);

            var timeOutInSecond = int.Parse(_appSettings.GetValue("BetListApiOutInSecond"));
            return await _betListApiClient.PostAsync("/BettingTicketCenterAdvancedSearch/GetExportStatus",
                metaModel, SessionService.UserSession.Language, timeOutInSecond).ConfigureAwait(false);
        }

        public async void UpdateMetaModel(AdvancedSearchBetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var sabaSport = _sportService.GetSabaSport(metaModel.SportId, IsHideSaba);
            if (sabaSport != null)
            {
                metaModel.LeagueGroupIds = string.Join(",", sabaSport.LeagueGroupIds);
                metaModel.SportId = sabaSport.SportTypeId;
            }

            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.SpecialPlatform = licenseeSession.SpecialPlatform;
            metaModel.FullCustomerClass = string.Join(",", await _customerClassService.GetAllCustomerClassId());
            metaModel.LicenseeName = licenseeSession.LicenseeName;
        }
    }
}