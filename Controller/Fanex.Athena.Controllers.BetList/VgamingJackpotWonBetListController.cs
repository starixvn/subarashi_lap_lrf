namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Web.ActionFilter;
    using Model.BetList.MetaModel;
    using Resources;

    public class VGamingJackpotWonBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/VGamingJackpotWonDetail/Main.cshtml", "Lrf_BetList_Jackpot_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;

            metaModel.Title = $"{ViewResources.ProductVGA} - {ViewResources.JackpotWonDetails}";

            return await ProcessExportExcel(metaModel, "VGaming_JackpotWonDetails").ConfigureAwait(false);
        }
    }
}