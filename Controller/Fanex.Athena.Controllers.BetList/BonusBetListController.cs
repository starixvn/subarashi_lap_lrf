namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class BonusBetListController : BetListBaseController
    {
        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/BonusDetail/Main.cshtml", "Lrf_BetList_LicenseeBonus_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption { GrandTotalVisible = false, CustomerCommVisible = metaModel.HasPlayerCom };
            metaModel.HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };
            metaModel.Title = ViewResources.TransactionDetail;
            return await ProcessExportExcel(metaModel, "BonusTransactionDetail").ConfigureAwait(false);
        }
    }
}