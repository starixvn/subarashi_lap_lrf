namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    [AuthorizeRestriction(AppMode.Parasitic)]
    [FunctionAuthorization(PermissionKeys.PlayerAdminBetList)]
    public class PlayerBetListController : CultureBaseController
    {
        private readonly IBetListApiClient _betListApiClient;

        public PlayerBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IBetListApiClient betListApiClient)
            : base(languageService, sessionService)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        [OutputCache(VaryByParam = "custId", Location = OutputCacheLocation.Server, Duration = 0)]
        public ViewResult Running(int custId, int currencyId)
        {
            var currencyList = SessionService.UserSession.CurrencyList;

            var viewModel = new PlayerRunningBetListViewModel
            {
                CustId = custId,
                Currency = currencyList.FirstOrDefault(x => x.Key == currencyId).Value
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBetList/Running.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData(isObject: true)]
        [AutoBindMetaModel(BindAgent = true, BindCurrencyList = true)]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<dynamic> GetRunningBetList(PlayerRunningBetListMetalModel metaModel)
        {
            return await _betListApiClient.PostAsync<dynamic>(
                "/PlayerAdminBetList/GetBetList",
                metaModel,
                SessionService.UserSession.Language).ConfigureAwait(false);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [ValidatePermissionOnData(isObject: true)]
        [AutoBindMetaModel(BindAgent = true, BindCurrencyList = true)]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<FileStreamResult> ExportRunningBetList(PlayerRunningBetListMetalModel metaModel)
        {
            var stream = await _betListApiClient.PostAsyncStream("/PlayerAdminBetList/Export",
                metaModel,
                SessionService.UserSession.Language).ConfigureAwait(false);

            return File(stream, "application/vnd.ms-excel");
        }
    }
}