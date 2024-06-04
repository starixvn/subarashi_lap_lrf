namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Model.BetList.MetaModel;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportGodOfFortuneWinLoss)]
    [BetListAuthorization]
    public class GodOfFortuneWinLossBetListController : BetListBaseController

    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            AssignSpecialPlatformValue(metaModel);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/GodOfFortuneWl/Main.cshtml", "Lrf_BetList_GodOfFortuneWL_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var curencyId = metaModel.IsConvert ? metaModel.BaseCurrencyId : metaModel.CurrencyId;
            metaModel.Title = GetCustomerBetListTitle(metaModel, GetViewInCurrency(curencyId, metaModel.CurrencyName));

            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumns;
            var fileName = string.IsNullOrWhiteSpace(metaModel.ExcelFileName) ? "GodOfFortuneWinLossBetList" : metaModel.ExcelFileName;

            return await ProcessExportExcel(metaModel, fileName).ConfigureAwait(false);
        }
    }
}