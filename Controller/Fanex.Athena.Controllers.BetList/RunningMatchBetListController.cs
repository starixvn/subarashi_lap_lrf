namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    #endregion Using

    public class RunningMatchBetListController : BetListBaseController
    {
        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(
                metaModel,
                "~/Views/Desktop/BetList/RunningBetListOfMatch/Main.cshtml",
                "Lrf_BetList_SelRunningByBettypeMatch").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.HiddenColumns = HiddenColumnIndexes;
            metaModel.Title = $"(LEAGUENAME) - {CacheRefAdapter.GetBettype(metaModel.BetType)} - {GetViewInCurrency(metaModel)}";
            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };

            return await ProcessExportExcel(metaModel, "RunningBetList").ConfigureAwait(false);
        }
    }
}
