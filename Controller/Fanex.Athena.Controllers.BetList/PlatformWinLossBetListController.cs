// -----------------------------------------------------------------------
// <copyright file="PlatformWinLossBetListController.cs" company="">
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
    using Model.Core.DataDomain;

    using Resources;

    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportPlatformWinLoss)]
    public class PlatformWinLossBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/PlatformWinLoss/Main.cshtml", "Lrf_BetList_PlatformWinLoss_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var curencyId = metaModel.IsConvert ? metaModel.BaseCurrencyId : metaModel.CurrencyId;
            var viewinCurrency = GetViewInCurrency(curencyId, metaModel.CurrencyName);
            var platformText = PlatformType.GetPlatformName(metaModel.PlatformType);

            metaModel.Title = ViewResources.Customer + " " + ViewResources.BetList
                + string.Format(
                " - {0} --> {1} - {2}{3} - {4} - {5}",
                metaModel.FromDate.ToString(FormatKey.ShortDateFormat),
                metaModel.ToDate.ToString(FormatKey.ShortDateFormat),
                metaModel.ExternalId,
                metaModel.IsFakeLicensee ? string.Empty : $"({metaModel.SystemId})",
                ViewResources.Platform + ": " + platformText,
                viewinCurrency);

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "PlatformWinLossBetList").ConfigureAwait(false);
        }
    }
}