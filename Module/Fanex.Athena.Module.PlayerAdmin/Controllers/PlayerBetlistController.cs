namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    //[AuthorizeRestriction(AppMode.Parasitic)]
    //[FunctionAuthorization("")]
    public class PlayerBetlistController : CultureBaseController
    {
        private readonly IPlayerInfoRepository _playerInfoRepository;

        private readonly IBetListApiClient _betListApiClient;

        public PlayerBetlistController(
            ILanguageService languageService,
            ISessionService sessionService,
            IPlayerInfoRepository playerInfoRepository,
            IBetListApiClient betListApiClient)
            : base(languageService, sessionService)
        {
            _playerInfoRepository = playerInfoRepository;
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        public async Task<ViewResult> Running(int custid)
        {
            var currencyList = SessionService.UserSession.CurrencyList;
            var playerInfo = await _playerInfoRepository.GetPlayerInfoAsync(custid).ConfigureAwait(false);

            var viewModel = new PlayerRunningBetListViewModel
            {
                CustId = playerInfo.CustId,
                Currency = currencyList.FirstOrDefault(x => x.Key == playerInfo.CurrencyId).Value
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBetList/Running.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<dynamic> GetRunningBetList(PlayerRunningBetListMetalModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.CurrencyList = userSession.CurrencyList;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);

            return await _betListApiClient.PostAsync<dynamic>(
                "/PlayerAdminBetList/GetBetList",
                metaModel,
                userSession.Language).ConfigureAwait(false);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData(isObject: true)]
        public async Task<FileStreamResult> ExportRunningBetList(PlayerRunningBetListMetalModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.CurrencyList = userSession.CurrencyList;
            metaModel.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);

            var stream = await _betListApiClient.PostAsyncStream("/PlayerAdminBetList/Export",
                metaModel,
                SessionService.UserSession.Language).ConfigureAwait(false);

            return File(stream, "application/vnd.ms-excel", "PlayerAdministratorBetList.xls");
        }
    }
}
