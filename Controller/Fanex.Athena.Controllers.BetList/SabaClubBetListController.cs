namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.BetList.MetaModel;
    using Fanex.Athena.Resources;
    using Fanex.Athena.Web.ActionFilter;

    public class SabaClubBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/SBCDetail/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductSBC, metaModel.Date);

            return await ProcessExportExcel(metaModel, "SabaClubDetail").ConfigureAwait(false);
        }
    }
}