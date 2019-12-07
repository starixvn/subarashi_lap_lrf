namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Linq;
    using System.Net;
    using System.Net.Http;
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
            IBetListApiClient betListApiClient)
        {
            _betListApiClient = betListApiClient;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        public ViewResult Running(int custId, int currencyId)
        {
            var currencyList = SessionServiceInstance.UserSession.CurrencyList;

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
        [AutoBindMetaModel(BindAgent = true)]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<dynamic> GetRunningBetList(PlayerRunningBetListMetalModel metaModel)
        {
            return metaModel.IsExport
                ? await ExportRunningBetListDataAsync(metaModel).ConfigureAwait(false)
                : await GetRunningBetListDataAsync(metaModel).ConfigureAwait(false);
        }

        public async Task<dynamic> GetRunningBetListDataAsync(PlayerRunningBetListMetalModel metaModel)
        {
            return JsonString(await _betListApiClient.PostStringAsync(
                    "/PlayerAdminBetList/GetBetList",
                    metaModel,
                    SessionServiceInstance.UserSession.Language).ConfigureAwait(false));
        }

        public async Task<ActionResult> ExportRunningBetListDataAsync(PlayerRunningBetListMetalModel metaModel)
        {
            var httpResponse = await _betListApiClient.PostAsync("/PlayerAdminBetList/Export",
                metaModel,
                SessionServiceInstance.UserSession.Language).ConfigureAwait(false);

            if (httpResponse.StatusCode == HttpStatusCode.NoContent)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NoContent);
            }

            return File(await httpResponse.Content.ReadAsStreamAsync(), "application/octet-stream");
        }
    }
}