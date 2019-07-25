// -----------------------------------------------------------------------
// <copyright file="RunningMatchChoiceBetListController.cs" company="">
// Report controller
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Controllers.BetList
{
    using System.Threading.Tasks;
    #region Using

    using System.Web.Mvc;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Service.StatelessCore.Interfaces;
    using Fanex.Athena.Web.ActionFilter;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.Core.Users.Interfaces;

    using VendorAdapter.Interfaces;

    #endregion Using

    public class RunningMatchChoiceBetListController : BetListBaseController
    {
        public RunningMatchChoiceBetListController(
            ILanguageService languageService,
            ISessionService sessionService,
            IProductService productService,
            IBalanceUpDataAccess balanceUpDataAccess,
            ICacheRefAdapter cacheRefAdapter,
            IBetListApiClient betListApiClient, ILicenseeSettingService licenseeSettingService)
        : base(languageService, sessionService, productService, balanceUpDataAccess,
              cacheRefAdapter, betListApiClient, licenseeSettingService)
        { }

        [HttpGet]
        [ValidationWebRequest(IsValidCurrency = true)]
        public async Task<ActionResult> Index(BetListExcelMetaModel metaModel)
        {
            CreateDefaultMetaModel(metaModel);
            InitBaseCurrencyValue(metaModel);

            return await ProcessDefaultRequest(
                metaModel, 
                "~/Views/Desktop/BetList/NewForecastBetlist/Main.cshtml", 
                "Lrf_BetList_Forecast_SelByMatch").ConfigureAwait(false);
        }

        protected override async Task<ActionResult> ExportExcel(BetListExcelMetaModel metaModel)
        {
            metaModel.Title = $"(LEAGUENAME) - {CacheRefAdapter.GetBettype(metaModel.BetType)} - {GetViewInCurrency(metaModel)}";

            metaModel.ShowingOption = new BetListShowingOption
            {
                CustomerCommVisible = SessionService.LicenseeSession.IsAllowedCustomerComm,
            };
            metaModel.HiddenColumns = HiddenColumnIndexes;

            return await ProcessExportExcel(metaModel, "RunningBetList").ConfigureAwait(false);
        }
    }
}