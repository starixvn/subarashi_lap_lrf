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

        [HttpGet]
        [ValidationWebRequest]
        [AutoBindMetaModel(BindAgent = true)]
        public async Task<ActionResult> Detail(SystemParlayDetailMetaModel metaModel)
        {
            var userSession = SessionServiceInstance.UserSession;
            var data = await BetListApiClient.PostAsyncString("/SystemParlayBetList/Detail", metaModel, userSession.Language).ConfigureAwait(false);

            var viewModel = new SystemParlayDetailViewModel
            {
                DetailText = data
            };

            return View("~/Views/Desktop/BetList/SystemParlayDetail/Main.cshtml", viewModel);
        }
    }
}