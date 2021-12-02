using System.Globalization;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Resources;
using Fanex.Athena.Web.ActionFilter;

namespace Fanex.Athena.Controllers.BetList
{
    public class RNGBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/RNGDetail/Main.cshtml", "Lrf_BetList_RNG_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var productName = ViewResources.ResourceManager.GetString(metaModel.ProductCode);
            var engCulture = new CultureInfo("en-US");

            metaModel.Title = GetBetListDetailTitle(productName, metaModel.Date);
            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = HiddenColumns;

            return await ProcessExportExcel(metaModel, $"{ViewResources.ResourceManager.GetString(metaModel.ProductCode, engCulture).Replace(" ", "")}Detail").ConfigureAwait(false);
        }
    }
}