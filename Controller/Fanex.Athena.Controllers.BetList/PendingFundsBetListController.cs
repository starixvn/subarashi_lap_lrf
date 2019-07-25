// -----------------------------------------------------------------------
// <copyright file="PendingFundsBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    #region Using

    using System;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.MetaModel;

    using Resources;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using VendorAdapter.Interfaces;

    using Web.ActionFilter;

    #endregion Using

    [FunctionAuthorization(PermissionKeys.ReportCustomerPendingFunds)]
    public class PendingFundsBetListController : BetListBaseController
    {
        private const int ExpandedYears = 10;

        private static readonly int[] HiddenColList =
            new[] { ExternalIdColumn, SystemIdColumn, WinLostColumn, BetEffectiveColumn, LicenseeWLColumn };

        public PendingFundsBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient, ILicenseeSettingService licenseeSettingService
)
       : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        {
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);
            metaModel.FromDate = DateTime.Today.AddYears(-ExpandedYears);
            metaModel.ToDate = DateTime.Today.AddYears(ExpandedYears);

            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/PendingFunds/Main.cshtml", "Lrf_BetList_SelRunningByDate_Mem").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionService.LicenseeSession.IsAllowedCustomerComm,
            };

            metaModel.Title = "Running " + ViewResources.BetList
                + string.Format(
                " - {0}{1} - {2}",
                metaModel.ExternalId,
                metaModel.IsFakeLicensee ? string.Empty : $"({metaModel.SystemId})",
                GetViewInCurrency(metaModel));
            metaModel.HiddenColumns = HiddenColList;
            return await ProcessExportExcel(metaModel, "CustomerPendingFundsBetList").ConfigureAwait(false);
        }
    }
}