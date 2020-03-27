namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Web.ActionFilter;

    public class PlayerDetailTransactionController : CultureBaseController
    {
        private readonly IPlayerDetailTransactionService _playerDetailTransactionService;

        public PlayerDetailTransactionController(IPlayerDetailTransactionService playerDetailTransactionService)
        {
            _playerDetailTransactionService = playerDetailTransactionService;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        [FunctionAuthorization(PermissionKeys.PlayerDetailTransaction)]
        public ViewResult Index(int custId, int currencyId)
        {
            var viewModel = new PlayerDetailTransactionReportViewModel { CustId = custId, CurrencyId = currencyId };
            return View("~/Views/Desktop/Module/PlayerAdmin/PlayerDetailTransaction/Index.cshtml", viewModel);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerDetailTransaction)]
        [ValidatePermissionOnData(isObject: true)]
        [ValidationWebRequest]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<JsonResult> GetDetailTransactionReport(PlayerDetailTransactionsMetaModel criteria)
        {
            var data = await _playerDetailTransactionService.GetDetailTransactionReport(criteria);
            return Json(data);
        }

        [HttpPost]
        [AjaxRequest]
        [CustomValidateAntiForgery]
        [FunctionAuthorization(PermissionKeys.PlayerDetailTransaction)]
        [ValidatePermissionOnData(isObject: true)]
        [ValidationWebRequest]
        [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None, VaryByParam = "*")]
        public async Task<JsonResult> ExportDetailTransactionReport(PlayerDetailTransactionsMetaModel criteria)
        {
            criteria.PageSize = null;
            criteria.PageIndex = null;
            var data = await _playerDetailTransactionService.GetDetailTransactionReport(criteria);
            return Json(data);
        }
    }
}
