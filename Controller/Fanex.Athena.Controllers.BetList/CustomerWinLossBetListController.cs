namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Model.BetList.MetaModel;
    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportCustomerWinLoss)]
    public class CustomerWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn };

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
            return ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/CustomerWl/Main.cshtml", "Shard_Lrf_BetList_CustomerWL_Mem");
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.Title = GetCustomerBetListTitle(metaModel, GetViewInCurrency(metaModel));
            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "CustomerWinLossBetList").ConfigureAwait(false);
        }
    }
}
