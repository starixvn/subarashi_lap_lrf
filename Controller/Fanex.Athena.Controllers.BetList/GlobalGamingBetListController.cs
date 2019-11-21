namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class GlobalGamingBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/GlobalGamingDetail/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption { CustomerCommVisible = metaModel.HasPlayerCom };
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductFW, metaModel.Date);

            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "GlobalGamingDetail").ConfigureAwait(false);
        }
    }
}