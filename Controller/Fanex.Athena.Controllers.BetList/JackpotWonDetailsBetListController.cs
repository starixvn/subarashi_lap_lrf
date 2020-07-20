namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class JackpotWonDetailsBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Details(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/JackpotWonDetail/Main.cshtml", "Lrf_BetList_Jackpot_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;

            metaModel.Title = $"{ViewResources.ProductPP} - {ViewResources.JackpotWonDetails} - { metaModel.Date.ToString("MM/dd/yyyy")}";

            return await ProcessExportExcel(metaModel, "PP_JackpotWonDetails").ConfigureAwait(false);
        }
    }
}