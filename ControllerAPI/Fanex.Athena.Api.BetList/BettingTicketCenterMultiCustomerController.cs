namespace Fanex.Athena.Api.BetList
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Base;
    using Base.Attributes;
    using Extension.Utility;
    using Fanex.Athena.Model.Core.Helper;
    using Model.BetList.MetaModel;
    using Model.Core.DataDomain;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Core.Utility.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class BettingTicketCenterMultiCustomerController : BaseApiController
    {
        private const int ServerBusyErrorCode = 1002;

        private readonly IAppSettings _appSettings;

        private readonly IBetListApiClient _betListApiClient;

        public BettingTicketCenterMultiCustomerController(
            ISessionService sessionService,
            IProductService productService,
            ILanguageService langService,
            IAppSettings appSettings,
            IBetListApiClient betListApiClient)
            : base(sessionService, productService, langService)
        {
            _appSettings = appSettings;
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ValidationApiRequest]
        public async Task<dynamic> GetData(MultipleCustomersBetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            if (metaModel.IsExport &&
                _appSettings.IsDisableExportLargeBetList
                && _appSettings.LicenseesWithLargeData.Contains(licenseeSession.LicenseeId))
            {
                return new
                {
                    ErrorCode = ServerBusyErrorCode,
                    ErrorMsg = ViewResources.ServerBusyMessage
                };
            }

            var userSession = SessionService.UserSession;

            var userCurrencyList = userSession.CurrencyList;
            var currencyList = metaModel.CurrencyIdList?.Split(',').Select(x => int.Parse(x)).ToArray();
            if (!MetaModelValidationHelper.IsValidCurrencyIdList(currencyList, userCurrencyList))
            {
                return BadRequest(ViewResources.InvalidRequestMsg);
            }

            metaModel.AgentListXml = SessionService.GenerateAgentListXml(currencyList);
            metaModel.HasPlayerCom = SessionService.LicenseeSession.IsAllowedCustomerComm;
            metaModel.UserCurrencyList = userCurrencyList;

            var timeout = _appSettings.LicenseesWithLargeData.Contains(licenseeSession.LicenseeId) ? 
                _appSettings.BetListApiClientTimeOutMinutes :
                0;
            return await _betListApiClient.PostAsync("/BettingTicketCenterMultiCustomer/GetData",
                metaModel, userSession.Language, timeout).ConfigureAwait(false);
        }
    }
}