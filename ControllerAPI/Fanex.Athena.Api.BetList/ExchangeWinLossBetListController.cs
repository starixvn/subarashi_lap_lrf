namespace Fanex.Athena.Api.BetList
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;

    using Model.BetList.DTO;
    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportExchangeWinLoss)]
    public class ExchangeWinLossBetListController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        private readonly IAuthorizationService _authorizationService;

        public ExchangeWinLossBetListController(
            ILanguageService languageService,
            IBetListApiClient betListApiClient,
            IAuthorizationService authorizationService)

        : base(languageService)
        {
            _betListApiClient = betListApiClient;
            _authorizationService = authorizationService;
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<dynamic> Index(ExchangeBetListMetaModel metaModel)
        {
            if (!IsValidRequest(metaModel))
            {
                return new ExchangeBetListViewModel
                {
                    MainData = null
                };
            }

            var userSession = SessionService.UserSession;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId, metaModel.ExcludeTestData);

            return await _betListApiClient.PostAsync("/ExchangeWinLossBetList/GetData",
                metaModel, userSession.Language).ConfigureAwait(false);
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsIncludeKeanOcean = true)]
        public async Task<dynamic> Detail(ExchangeBetListDetailMetaModel metaModel)
        {
            if (!IsValidRequest(metaModel))
            {
                return new List<ExchangeTicketDetail>();
            }
            var userSession = SessionService.UserSession;

            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, metaModel.CurrencyId, metaModel.ExcludeTestData);

            return await _betListApiClient.PostAsync("/ExchangeWinLossBetList/Detail",
                metaModel, userSession.Language).ConfigureAwait(false);
        }

        private bool IsValidRequest(BaseExchangeBetListMetaModel metaModel)
        {
            return _authorizationService.HasPermissionOnData(SessionService.UserSession.CurrencyAgentList, metaModel.CustId, 0);
        }
    }
}