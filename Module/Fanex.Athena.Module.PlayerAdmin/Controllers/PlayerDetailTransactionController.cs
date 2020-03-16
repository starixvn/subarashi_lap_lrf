namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System;
    using System.Web.Mvc;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Web.ActionFilter;

    public class PlayerDetailTransactionController : CultureBaseController
    {
        private const int MaximumMonth = 3;

        public PlayerDetailTransactionController()
        {
        }

        [HttpGet]
        [ValidatePermissionOnData]
        public ViewResult Index(int custId, int currencyId)
        {
            var today = DateTime.Today;
            var viewModel = new PlayerStatementViewModel
            {
                CustId = custId,
                CurrencyId = currencyId,
                FromDate = new DateTime(today.Year, today.Month, 1),
                ToDate = today,
                MinDate = DateTime.Now.AddMonths(-3)
            };

            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerDetailTransaction/Index.cshtml", viewModel);
        }
    }
}