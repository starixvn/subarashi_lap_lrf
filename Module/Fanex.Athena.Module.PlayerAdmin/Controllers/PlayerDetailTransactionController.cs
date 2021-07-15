namespace Fanex.Athena.Module.PlayerAdmin.Controllers
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using System.Web.UI;
    using Fanex.Athena.Controllers;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Module.PlayerAdmin.Excel;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;
    using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
    using Fanex.Athena.Module.PlayerAdmin.ViewModels;
    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Athena.Web.ResultExtension;

    public class PlayerDetailTransactionController : CultureBaseController
    {
        private readonly IPlayerDetailTransactionService _playerDetailTransactionService;
        private readonly IPlayerDetailTransactionExcel _excelService;

        public PlayerDetailTransactionController(
            IPlayerDetailTransactionService playerDetailTransactionService,
            IPlayerDetailTransactionExcel excelService)
        {
            _playerDetailTransactionService = playerDetailTransactionService;
            _excelService = excelService;
        }

        [HttpGet]
        [ValidatePermissionOnData]
        [FunctionAuthorization(PermissionKeys.PlayerDetailTransaction)]
        public ViewResult Index(int custId, int currencyId)
        {
            var viewModel = new PlayerDetailTransactionReportViewModel 
            { 
                CustId = custId,
                CurrencyId = currencyId,
                IsEnableSingleWallet = SessionServiceInstance.LicenseeSession.IsEnableSingleWallet
            };
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

        [HttpGet]
        [ValidatePermissionOnData]
        [FunctionAuthorization(PermissionKeys.PlayerDetailTransaction)]
        public async Task<ActionResult> ExportDetailTransactionReport(PlayerDetailTransactionsMetaModel criteria)
        {
            var isEnableSingleWallet = SessionServiceInstance.LicenseeSession.IsEnableSingleWallet;
            criteria.PageSize = null;
            criteria.PageIndex = null;
            var data = await _playerDetailTransactionService.GetDetailTransactionReport(criteria);
            data.IsEnableSingleWallet = isEnableSingleWallet;

            var templatePath = Server.MapPath(@"~/App_Data/Template/PlayerAdmin/DetailTransaction.xls");
            _excelService.SetData(templatePath, data);
            _excelService.Export();

            return new ExcelResult(_excelService.Workbook, "DetailTransaction");
        }
    }
}
