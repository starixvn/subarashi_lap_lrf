// -----------------------------------------------------------------------
// <copyright file="NoteController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.Report
{
    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Model.Report.ViewModel.Note;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using ONEbook.UM.Filters;

    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.ReadOnly)]
    [CheckUMFilter]
    public class NoteController : CultureBaseController
    {
        private readonly IBalanceUpDataAccess _balanceUpDataAccess;

        private readonly IProductService _productService;

        public NoteController(
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess)
        {
            _balanceUpDataAccess = balanceUpDataAccess;
            _productService = productService;
        }

        [ChildActionOnly]
        public ActionResult Index(string viewName)
        {
            var balanceUp = this._balanceUpDataAccess.GetBalanceUp();
            var licenseeId = this.SessionServiceInstance.LicenseeSession.LicenseeId;
            var productList = this._productService.GetProductList(licenseeId, SessionServiceInstance.UserSession.Language);
            var model = new NoteViewModel
            {
                MoveBetsDate = balanceUp.MoveBetsDay,
                ProductList = productList
            };

            var viewPath = $"~/Views/Note/{viewName}.cshtml";
            return View(viewPath, model);
        }
    }
}