using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Resources;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.BetList
{
    public class HabaneroBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/Habanero/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductHB, metaModel.Date);

            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "HabaneroDetail").ConfigureAwait(false);
        }
    }
}