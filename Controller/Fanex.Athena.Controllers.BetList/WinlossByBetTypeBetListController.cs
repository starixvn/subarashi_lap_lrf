namespace Fanex.Athena.Controllers.BetList
{
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Core.DataDomain;

    using Model.BetList.MetaModel;

    using Resources;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using Web.ActionFilter;

    /// <summary>
    ///     TODO: Update summary.
    /// </summary>
    [FunctionAuthorization(PermissionKeys.ReportWinLossByBetType)]
    public class WinlossByBetTypeBetListController : BetListBaseController
    {
        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/WinlossByBetType/Main.cshtml", "Lrf_BetList_SelWinLossByBetType").ConfigureAwait(false);
        }

        protected override bool IsValidExportExcel(BetListMetaModel model)
        {
            return model.CurrencyId != BaseCurrencyType.All &&
                model.FromDate.Date == model.ToDate.Date;
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.PageIndex = 1;
            metaModel.PageSize = int.MaxValue - 1;

            // determine currency viewed in
            var curencyId = metaModel.IsConvert ? metaModel.BaseCurrencyId : metaModel.CurrencyId;
            var viewinCurrency = GetViewInCurrency(curencyId, metaModel.CurrencyName);
            metaModel.Title = string.Format(
                "{0} - {1} - {2} → {3} - {4}",
                ViewResources.BetList,
                CacheRefAdapter.GetBettype(metaModel.BetType),
                metaModel.FromDate.ToString(FormatKey.ShortDateFormat),
                metaModel.ToDate.ToString(FormatKey.ShortDateFormat),
                viewinCurrency);
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionServiceInstance.LicenseeSession.IsAllowedCustomerComm
            };
            metaModel.HiddenColumns = new[] { BetEffectiveColumn };
            return await ProcessExportExcel(metaModel, "WinLossByBetTypeBetList").ConfigureAwait(false);
        }
    }
}