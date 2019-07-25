namespace Fanex.Athena.Controllers.BetList
{
    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Resources;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using System.Threading.Tasks;
    using System.Web.Mvc;

    using VendorAdapter.Interfaces;

    public class BonusBetListController : BetListBaseController
    {
        public BonusBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient, ILicenseeSettingService licenseeSettingService)
     : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        {
        }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Detail(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            return await ProcessDefaultRequest(metaModel, "~/Views/Desktop/BetList/BonusDetail/Main.cshtml", "Lrf_BetList_LicenseeBonus_Detail").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.ShowingOption = new BetListShowingOption { GrandTotalVisible = false, CustomerCommVisible = metaModel.HasPlayerCom };
            metaModel.HiddenColumns = new[] { ExternalIdColumn, SystemIdColumn, BetEffectiveColumn };
            metaModel.Title = ViewResources.TransactionDetail;
            return await ProcessExportExcel(metaModel, "BonusTransactionDetail").ConfigureAwait(false);
        }
    }
}