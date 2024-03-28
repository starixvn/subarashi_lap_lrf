// -----------------------------------------------------------------------
// <copyright file="PendingFundsBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using System.Threading.Tasks;
    using System.Web.Mvc;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Model.BetList.MetaModel;
    using Resources;
    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportCustomerPendingFunds)]
    public class PendingFundsBetListController : BetListBaseController
    {
        private const int ExpandedYears = 1;

        private static readonly int[] HiddenColList =
            new[] { ExternalIdColumn, SystemIdColumn, WinLostColumn, BetEffectiveColumn, LicenseeWLColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            AssignSpecialPlatformValue(metaModel);

            metaModel.FromDate = DateTimeHelper.Today.AddYears(-ExpandedYears);
            metaModel.ToDate = DateTimeHelper.Today.AddYears(ExpandedYears);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/PendingFunds/Main.cshtml", "Shard_Lrf_BetList_SelRunningByDate_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new ShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };

            metaModel.Title = "Running " + ViewResources.BetList
                + string.Format(
                " - {0}{1} - {2}",
                metaModel.ExternalId,
                metaModel.IsFakeLicensee ? string.Empty : $"({metaModel.SystemId})",
                GetViewInCurrency(metaModel));
            metaModel.HiddenColumns = HiddenColList;
            metaModel.SpecialPlatform = SessionServiceInstance.LicenseeSession.SpecialPlatform;

            return await ProcessExportExcel(metaModel, "CustomerPendingFundsBetList").ConfigureAwait(false);
        }
    }
}