namespace Fanex.Athena.Controllers.BetList
{
    using System.Globalization;
    using System.Threading.Tasks;

    #region Using

    using System.Web.Mvc;

    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.Helper;
    using Fanex.Athena.VendorAdapter.Interfaces;
    using Model.BetList.MetaModel;

    using Resources;

    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportMatchWinLoss)]
    public class MatchWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { BetEffectiveColumn };
        private static readonly CultureInfo EnglishCulture = new CultureInfo("en-US");
        private const string KickOfTimeFormat = "{0:MM/dd/yyyy hh:mm:ss tt}";

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> BetTypeWinLoss(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, "Lrf_BetList_MatchWL", "~/Views/Desktop/BetList/MatchWl/BetTypeWinLoss.cshtml");
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> MatchBetType(BetListExcelMetaModel metaModel)
        {
            metaModel.MatchName = GetMatchName(metaModel);
            return ProcessRequest(metaModel, null, "~/Views/Desktop/BetList/MatchWl/MatchBetType.cshtml");
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> MixParlay(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, "Lrf_BetList_MatchWL", "~/Views/Desktop/BetList/MatchWl/MixParlay.cshtml");
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public Task<ActionResult> Outright(BetListExcelMetaModel metaModel)
        {
            return ProcessRequest(metaModel, "Lrf_BetList_MatchWL", "~/Views/Desktop/BetList/MatchWl/Outright.cshtml");
        }

        private async Task<ActionResult> ProcessRequest(BetListExcelMetaModel metaModel, string uspKey, string viewPath)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            AssignSpecialPlatformValue(metaModel);

            metaModel.IsServerPaging = true;
            uspKey = metaModel.FromDate < metaModel.BalanceUpDay ? "Lrf_BetList_MatchWL_Old" : uspKey;

            return await ProcessDefaultRequest(metaModel, viewPath, uspKey).ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.PageIndex = 1;
            metaModel.PageSize = PageSizeExcel;

            if (string.IsNullOrEmpty(metaModel.UspKey))
            {
                metaModel.UspKey = metaModel.FromDate < metaModel.BalanceUpDay ? "Lrf_BetList_MatchWL_Old" : "Lrf_BetList_MatchWL";
            }

            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };

            var matchName = GetMatchName(metaModel);
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

        protected string GetMatchName(BetListExcelMetaModel metaModel)
        {
            if (metaModel.ProductCodeList == Product.NG)
            {
                var prefix = metaModel.SportType == (int)SportType.NumberGameHappy5 ? ViewResources.No + "." : ViewResources.NumberGameNo;
                return prefix + " " + metaModel.MatchCode + " - ";
            }

            if (SportHelper.IsVSSportTypes(metaModel.SportType))
            {
                return string.Format(EnglishCulture, KickOfTimeFormat, metaModel.KickOffTime) + " - ";
            }

            if (SportHelper.IsVirtualBetRadarSports(metaModel.SportType))
            {
                var id = !string.IsNullOrEmpty(metaModel.Distance) ? $" - ID {metaModel.Distance}" : string.Empty;
                return $"{ViewResources.Event} {metaModel.VendorMatchId}{id} - ";
            }

            return metaModel.HomeId > 0 && metaModel.AwayId > 0
                ? CacheRefAdapter.GetTeamName(metaModel.HomeId, metaModel.SportType) + " vs " + CacheRefAdapter.GetTeamName(metaModel.AwayId, metaModel.SportType) + " - "
                : string.Empty;
        }
    }
}