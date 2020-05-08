using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Athena.Web.ActionFilter;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Fanex.Athena.Controllers.BetList
{
    public class SexyGamingBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/SexyGaming/Main.cshtml", "Lrf_BetList_LC_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductSXG, metaModel.Date);

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "SexyGamingDetail").ConfigureAwait(false);
        }
    }
}
