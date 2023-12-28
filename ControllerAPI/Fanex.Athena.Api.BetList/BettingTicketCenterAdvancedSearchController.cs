namespace Fanex.Athena.Api.BetList
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;

    using Extension.Utility;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core;
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

        public BettingTicketCenterAdvancedSearchController(
            ILanguageService langService,
            IAppSettings appSettings,
            IBetListApiClient betListApiClient,
            ISportService sportService)
            : base(langService)
        {
            _appSettings = appSettings;
            _betListApiClient = betListApiClient;
            _sportService = sportService;
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.BtcAdvancedSearch)]
        [ValidationApiRequest(IsValidCurrencyList = true)]
        [ApiAutoBindMetaModel(BindAgent = true, ApplySubsidiaryBusiness = true, BindShowingBetFromIP = true, BindProductCodeList = true)]
        public async Task<dynamic> GetData(AdvancedSearchBetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var isHideSaba = SabaHelper.IsHideSaba(licenseeSession.SpecialPlatform);
            var sabaSport = _sportService.GetSabaSport(metaModel.SportId, isHideSaba);
            if (sabaSport != null)
            {
                metaModel.LeagueGroupIds = string.Join(",", sabaSport.LeagueGroupIds);
                metaModel.SportId = sabaSport.SportTypeId;
            }

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
            metaModel.SpecialPlatform = licenseeSession.SpecialPlatform;
            var timeOutInSecond = int.Parse(_appSettings.GetValue("BetListApiOutInSecond"));
            return await _betListApiClient.PostAsync("/BettingTicketCenterAdvancedSearch/GetData",
                metaModel, SessionService.UserSession.Language, timeOutInSecond).ConfigureAwait(false);
        }
    }
}