namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Model.BetList.MetaModel;
    using Web.ActionFilter;

    [FunctionAuthorization(
        PermissionKeys.ReportLicenseeWinLoss,
        PermissionKeys.ReportWinLossByProduct)]
    [BetListAuthorization]
    public class LicenseeWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        [AutoBindMetaModel(IgnoreSharding = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
            => await Action(metaModel).ConfigureAwait(false);

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Live(BetListExcelMetaModel metaModel)
          => await Action(metaModel).ConfigureAwait(false);

        private Task<ActionResult> Action(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            return ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/LicenseeWl/Main.cshtml", "Shard_Lrf_BetList_LicenseeWL_Mem");
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
            var fileName = string.IsNullOrWhiteSpace(metaModel.ExcelFileName) ? "LicenseeWinLossBetList" : metaModel.ExcelFileName;

            return await ProcessExportExcel(metaModel, fileName).ConfigureAwait(false);
        }
    }
}