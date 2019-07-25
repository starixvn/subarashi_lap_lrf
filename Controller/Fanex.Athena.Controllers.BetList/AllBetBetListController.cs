// -----------------------------------------------------------------------
// <copyright file="AllBetBetListController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    using System.Web.Mvc;
    using DataAccess.Core.Configuration.Interfaces;
    using Extension.Utility;
    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;
    using Model.BetList.MetaModel;
    using Resources;
    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;
    using Service.Core.Utility.Interfaces;
    using VendorAdapter.Interfaces;

    public class AllBetBetListController : BetListBaseController
    {
        public AllBetBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient,
             ILicenseeSettingService licenseeSettingService

            )
        : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        {
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/AGCasinoDetail/Main.cshtml", "Lrf_BetList_LC_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption
            {
                GrandTotalVisible = false,
                CustomerCommVisible = SessionService.LicenseeSession.IsAllowedCustomerComm
            };

            metaModel.HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn, LicenseeWLColumn };
            metaModel.Title = GetBetListDetailTitle(ViewResources.ProductAB, metaModel.Date);

            return await ProcessExportExcel(metaModel, "AllBetDetail").ConfigureAwait(false);
        }
    }
}