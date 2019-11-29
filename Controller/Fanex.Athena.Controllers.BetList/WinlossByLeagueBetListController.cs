// -----------------------------------------------------------------------
// <copyright file="WinlossByLeagueBetListController.cs" company="Nexdev">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Web.ActionFilter;

    [FunctionAuthorization(PermissionKeys.ReportWinLossByLeague)]
    public class WinlossByLeagueBetListController : BetListBaseController
    {
        private static readonly int[] HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(WinLossByLeagueBetListMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/WinlossByLeague/Main.cshtml", "Lrf_BetList_WinlostByLeague_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            var curencyId = metaModel.IsConvert ? metaModel.BaseCurrencyId : metaModel.CurrencyId;
            var viewinCurrency = GetViewInCurrency(curencyId, metaModel.CurrencyName);
            metaModel.Title = string.Format(
                "{0} - {1} → {2} - {3}{4} - {5}",
                ViewResources.CustomerBetList,
                metaModel.FromDate.ToString(FormatKey.ShortDateFormat),
                metaModel.ToDate.ToString(FormatKey.ShortDateFormat),
                metaModel.ExternalId,
                metaModel.IsFakeLicensee ? string.Empty : $"({metaModel.SystemId})",
                viewinCurrency);
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumns;
            return await ProcessExportExcel(metaModel, "WinLossByLeagueBetList", "/BetList/ExportExcelWinlossByLeague").ConfigureAwait(false);
        }
    }
}