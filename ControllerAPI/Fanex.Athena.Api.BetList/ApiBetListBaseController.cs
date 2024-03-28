namespace Fanex.Athena.Api.BetList
{
    using System;
    using System.Threading.Tasks;
    using Base;
    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Model.BetList.MetaModel;
    using Model.Core.DTO.Configuration;
    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    public class ApiBetListBaseController : BaseApiController
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        public ApiBetListBaseController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService)
        {
            _authorizationService = authorizationService;
            BridgeClientService = betListApiClient;
            _balanceUpDataAccess = balanceUpDataAccess;
        }

        protected IBetListApiClient BridgeClientService { get; }

        protected BalanceUp GetBalanceUp()
        {
            return _balanceUpDataAccess.GetBalanceUp();
        }

        protected void CheckDataPermission(int custId, long transId)
        {
            if (!_authorizationService.HasPermissionOnData(
                SessionService.UserSession.CurrencyAgentList,
                custId,
                transId))
            {
                throw new UnauthorizedAccessException();
            }
        }

        protected internal virtual async Task<dynamic> GetBetListResult(
            BetListMetaModel metaModel,
            string uspKey,
            string apiPath = null)
        {
            CheckDataPermission(metaModel.CustId, metaModel.TransId);

            var balanceUp = GetBalanceUp();
            var userSession = SessionService.UserSession;
            var licenseeSession = SessionService.LicenseeSession;
            metaModel.PageIndex = 1;
            metaModel.PageSize = int.MaxValue - 1;
            metaModel.LicenseeId = LicenseeSession.LicenseeId;
            metaModel.BalanceUpDay = DateTime.SpecifyKind(balanceUp.BalanceUpDay.Date, DateTimeKind.Utc);
            metaModel.MoveBetsDay = DateTime.SpecifyKind(balanceUp.MoveBetsDay.Date, DateTimeKind.Utc);
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(CurrencyAgentListBySubsidiaryBusiness(metaModel), metaModel.CurrencyId);
            metaModel.HasPlayerCom = LicenseeSession.IsAllowedCustomerComm;
            metaModel.UspKey = uspKey;
            metaModel.IsShowIpvn = userSession.IsShowIpvn;
            metaModel.IsShowIp = userSession.IsShowIp;
            metaModel.SpecialPlatform = licenseeSession.SpecialPlatform;

            AutoBindMetaModelService.BindProductCodeList(metaModel, SessionService.LicenseeSession.OfferedSubProductList, ProductService);

            return await BridgeClientService.PostAsync(apiPath ?? "/BetList/GetBetList", metaModel, userSession.Language).ConfigureAwait(false);
        }

        protected internal virtual async Task<dynamic> GetPagingBetListResult(
            BetListMetaModel metaModel,
            string uspKey,
            int pageIndex,
            int pageSize,
            string apiPath = null)
        {
            CheckDataPermission(metaModel.CustId, metaModel.TransId);
            const int DefaultPageSize = 100;
            var balanceUp = GetBalanceUp();

            metaModel.IsServerPaging = true;
            metaModel.PageIndex = pageIndex < 1 ? 1 : pageIndex;
            metaModel.PageSize = pageSize < 1 ? DefaultPageSize : pageSize;
            metaModel.LicenseeId = LicenseeSession.LicenseeId;
            metaModel.BalanceUpDay = DateTime.SpecifyKind(balanceUp.BalanceUpDay.Date, DateTimeKind.Utc);
            metaModel.MoveBetsDay = DateTime.SpecifyKind(balanceUp.MoveBetsDay.Date, DateTimeKind.Utc);
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(CurrencyAgentListBySubsidiaryBusiness(metaModel), metaModel.CurrencyId);
            metaModel.HasPlayerCom = LicenseeSession.IsAllowedCustomerComm;
            metaModel.UspKey = uspKey;
            metaModel.IsShowIpvn = UserSession.IsShowIpvn;
            metaModel.IsShowIp = UserSession.IsShowIp;
            metaModel.SpecialPlatform = LicenseeSession.SpecialPlatform;

            AutoBindMetaModelService.BindProductCodeList(metaModel, SessionService.LicenseeSession.OfferedSubProductList, ProductService);

            return await BridgeClientService.PostAsync(apiPath ?? "/BetList/GetBetListPaging",
                metaModel,
                UserSession.Language
                ).ConfigureAwait(false);
        }
    }
}