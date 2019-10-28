// -----------------------------------------------------------------------
// <copyright file="SystemParlayBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;
    using Model.BetList.ViewModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using VendorAdapter.Interfaces;

    #endregion Using

    public class SystemParlayBetListController : BetListBaseController
    {
#pragma warning disable S107 // Methods should not have too many parameters

        public SystemParlayBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient, ILicenseeSettingService licenseeSettingService)
#pragma warning restore S107 // Methods should not have too many parameters

        : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        {
        }

        [HttpGet]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Detail(SystemParlayDetailMetaModel metaModel)
        {
            var userSession = SessionService.UserSession;
            metaModel.IsAllowedCustomerComm = SessionService.LicenseeSession.IsAllowedCustomerComm;

            var data = await BetListApiClient.PostAsyncString("/SystemParlayBetList/Detail", metaModel, userSession.Language).ConfigureAwait(false);

            var viewModel = new SystemParlayDetailViewModel
            {
                DetailText = data
            };

            return View("~/Views/Desktop/BetList/SystemParlayDetail/Main.cshtml", viewModel);
        }
    }
}