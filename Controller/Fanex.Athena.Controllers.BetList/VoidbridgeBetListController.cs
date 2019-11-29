namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class VoidbridgeBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/VoidbridgeDetail/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductVB, metaModel.Date);

            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "MacauGamesDetail").ConfigureAwait(false);
        }
    }
}