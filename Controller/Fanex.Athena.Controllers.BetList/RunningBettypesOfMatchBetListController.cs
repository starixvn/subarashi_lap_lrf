// -----------------------------------------------------------------------
// <copyright file="RunningBettypesOfMatchBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;

    using Fanex.Athena.Web.ActionFilter;
    using Fanex.Common;

    using Model.BetList.MetaModel;

    #endregion Using

    public class RunningBettypesOfMatchBetListController : BetListBaseController
    {
        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(
                metaModel,
                "~/Views/Desktop/BetList/RunningBettypesOfMatchBetList/Main.cshtml",
                "Lrf_BetList_SelRunningByMultipleBettypeMatch").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var bettype = metaModel.BetType == 0 && !string.IsNullOrWhiteSpace(metaModel.MultipleBettype)
                ? Converter.ToInt(metaModel.MultipleBettype.Split(',')[0])
                : metaModel.BetType;

            metaModel.Title = $"(LEAGUENAME) - {CacheRefAdapter.GetBettype(bettype)} - {GetViewInCurrency(metaModel)}";
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumnIndexes;
            return await ProcessExportExcel(metaModel, "RunningBetList").ConfigureAwait(false);
        }
    }
}