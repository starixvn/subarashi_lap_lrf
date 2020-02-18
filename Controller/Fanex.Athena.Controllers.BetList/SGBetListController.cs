namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Web.ActionFilter;
    using Model.BetList.MetaModel;
    using Resources;

    public class SGBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/SGDetail/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductSG, metaModel.Date);

            return await ProcessExportExcel(metaModel, "SGDetail").ConfigureAwait(false);
        }
    }
}