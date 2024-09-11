using Fanex.Athena.Api.Base;
using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Model.Auth.DataDomain;
using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fanex.Athena.Api.BetList
{
    [ApiFunctionAuthorization(PermissionKeys.BettingTicketCenter)]
    public class ExchangeBetlistController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        public ExchangeBetlistController(ILanguageService languageService, IBetListApiClient betListApiClient) : base(languageService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpPost]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> GetRunningTickets(ExchangeRunningTicketMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            return await _betListApiClient.PostAsync("/ExchangeWinLossBetList/GetRunningTickets",
                metaModel, userSession.Language);
        }

        [HttpPost]
        [ApiAutoBindMetaModel(BindAgent = true)]
        public async Task<dynamic> ExportRunningTickets(ExchangeRunningTicketMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            return await _betListApiClient.PostAsync("/ExchangeWinLossBetList/ExportRunningTickets",
                metaModel, userSession.Language);
        }
    }
}
