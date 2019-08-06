namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Utility;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [AuthorizeRestriction(AppMode.Parasitic)]
    [FunctionAuthorization(PermissionKeys.PlayerAdminBetList)]
    public class PlayerBetlistController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public PlayerBetlistController(
            ILanguageService languageService,
            ISessionService sessionService,
            IBetListApiClient betListApiClient)
            : base(languageService, sessionService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        public ViewResult Running(int custid, int currencyId)
        {
            var currencyList = SessionService.UserSession.CurrencyList;

            var viewModel = new PlayerRunningBetListViewModel
            {
                CustId = custid,
                Currency = currencyList.FirstOrDefault(x => x.Key == currencyId).Value
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
                userSession.Language).ConfigureAwait(false);

            return File(stream, "application/vnd.ms-excel");
        }
    }
}