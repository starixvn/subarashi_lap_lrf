namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.SessionState;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.Module.PlayerAdmin.Repository.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Service.Core.Common.Interfaces;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using ONEbook.UM.Filters;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    //[AuthorizeRestriction(AppMode.Parasitic)]
    //[FunctionAuthorization(PermissionKeys.PlayerAdmin)]
    public class PlayerBetLimitController : CultureBaseController
    {
        private readonly IPlayerBetLimitRepository _playerBetLimitRepository;

        public PlayerBetLimitController(
            ILanguageService languageService,
            ISessionService sessionService,
            IPlayerBetLimitRepository playerBetLimitRepository)
            : base(languageService, sessionService)
        {
            _playerBetLimitRepository = playerBetLimitRepository;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        [OutputCache(VaryByParam = "custId", Location = OutputCacheLocation.Server, Duration = 0)]
        public async Task<ViewResult> Index(int custId)
        {
            var productList = await GetProducts(SessionService.LicenseeSession.LicenseeName).ConfigureAwait(false);
            var viewModel = new PlayerBetLimitViewModel
            {
                CustId = custId,
                ProductList = productList,
                ProductId = productList.FirstOrDefault().Key
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerBetLimit/Index.cshtml", viewModel);
        }

        private async Task<IDictionary<int, string>> GetProducts(string siteName)
        {
            var products = await _playerBetLimitRepository.GetEnableBetLimitProducts(siteName).ConfigureAwait(false);

            return products.ToDictionary(x => x.ProductId, x => ProductHelper.GetProductName(x.ProductCode));
        }
    }
}
