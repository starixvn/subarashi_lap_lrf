namespace Fanex.Athena.Api.BetList
{
    using Base;
    using Base.Attributes;
    using Extension.Utility;
    using Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore;
    using Model.BetList.MetaModel;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Customer.Interfaces;
    using Service.StatelessCore.Interfaces;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
    public class BettingTicketCenterAdvancedSearchController : BaseApiController
    {
        private const int ServerBusyErrorCode = 1002;

        private readonly IAppSettings _appSettings;

        private readonly IBetListApiClient _betListApiClient;

        private readonly ICustomerClassService _customerClassService;

        private readonly ISportService _sportService;

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
            if (metaModel.IsExport && IsAllowExportLargeBetList())
            {
                return ServerBusy();
            }

            await UpdateMetaModel(metaModel);

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
            if (IsAllowExportLargeBetList())
            {
                return ServerBusy();
            }

            await UpdateMetaModel(metaModel);

            var timeOutInSecond = int.Parse(_appSettings.GetValue("BetListApiOutInSecond"));
            return await _betListApiClient.PostAsync("/BettingTicketCenterAdvancedSearch/GetExportStatus",
                metaModel, SessionService.UserSession.Language, timeOutInSecond).ConfigureAwait(false);
        }

        private object ServerBusy() => new
        {
            ErrorCode = ServerBusyErrorCode,
            ErrorMsg = ViewResources.ServerBusyMessage
        };

        private bool IsAllowExportLargeBetList() => _appSettings.IsDisableExportLargeBetList
                                                    && _appSettings.LicenseesWithLargeData.Contains(SessionService.LicenseeSession.LicenseeName);

        private async Task UpdateMetaModel(AdvancedSearchBetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;

            metaModel.SportListXML = BettingTicketCenterSportService.BuildSportTypeXML(metaModel.SportIds);
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.SpecialPlatform = licenseeSession.SpecialPlatform;
            metaModel.FullCustomerClass = string.Join(",", await _customerClassService.GetAllCustomerClassId());
            metaModel.LicenseeName = licenseeSession.LicenseeName;
        }
    }
}