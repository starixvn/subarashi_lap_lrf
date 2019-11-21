// -----------------------------------------------------------------------
// <copyright file="LicenseeWinLossBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Model.Auth.DataDomain;

    using Model.BetList.MetaModel;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(
        PermissionKeys.ReportLicenseeWinLoss,
        PermissionKeys.ReportWinLossByProduct,
        PermissionKeys.ReportColossusBetsWinLoss)]
    [BetListAuthorization]
    public class LicenseeWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/LicenseeWl/Main.cshtml", "Lrf_BetList_SelWinloss_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var curencyId = metaModel.IsConvert ? metaModel.BaseCurrencyId : metaModel.CurrencyId;
            metaModel.Title = GetCustomerBetListTitle(metaModel, GetViewInCurrency(curencyId, metaModel.CurrencyName));

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumns;
            var fileName = string.IsNullOrWhiteSpace(metaModel.ExcelFileName) ? "LicenseeWinLossBetList" : metaModel.ExcelFileName;

            return await ProcessExportExcel(metaModel, fileName).ConfigureAwait(false);
        }
    }
}