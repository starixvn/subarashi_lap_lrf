// -----------------------------------------------------------------------
// <copyright file="MatchWinLossBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;

    using Fanex.Athena.Model.Auth.DataDomain;

    using Model.BetList.MetaModel;

    using Resources;

    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportMatchWinLoss)]
    public class MatchWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> MatchBetType(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, null, "~/Views/Desktop/BetList/MatchWl/MatchBetType.cshtml");
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> MixParlay(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, "Lrf_BetList_MatchWL_Parlay", "~/Views/Desktop/BetList/MatchWl/MixParlay.cshtml");
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> Outright(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, "Lrf_BetList_MatchWL_Outright", "~/Views/Desktop/BetList/MatchWl/Outright.cshtml");
        }

        private async Task<ActionResult> ProcessRequest(BetListExcelMetaModel metaModel, string uspKey, string viewPath)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            metaModel.IsServerPaging = true;

            return await ProcessDefaultRequest(metaModel, viewPath, uspKey).ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.PageIndex = 1;
            metaModel.PageSize = PageSizeExcel;

            if (string.IsNullOrEmpty(metaModel.UspKey))
            {
                metaModel.UspKey = "Lrf_BetList_MatchWL_Bettype";
            }

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };

            var matchName = metaModel.HomeId > 0 && metaModel.AwayId > 0
                  ? CacheRefAdapter.GetTeamName(metaModel.HomeId) + " vs " + CacheRefAdapter.GetTeamName(metaModel.AwayId) + " - "
                  : string.Empty;
            var currencyTitle = GetViewInCurrency(metaModel);

            metaModel.Title = ViewResources.BetList
                + string.Format(
                " - {0}{1} - {2}",
                matchName + (metaModel.BetType > 0 ? CacheRefAdapter.GetBettype(metaModel.BetType) + " - " : string.Empty),
                metaModel.FromDate.ToShortDateString(),
                currencyTitle);
            metaModel.HiddenColumns = HiddenColumns;

            return await ProcessExportExcel(metaModel, "MatchWinLossBetList").ConfigureAwait(false);
        }
    }
}