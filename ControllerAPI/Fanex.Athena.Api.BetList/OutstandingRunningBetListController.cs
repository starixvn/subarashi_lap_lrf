namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    #endregion Using

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class OutstandingRunningBetListController : ApiBetListBaseController
    {
        private const string BetListCustomerOutstandingRunningName = "BetList_CustomerOutstandingRunning";

        public OutstandingRunningBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true, IsValidProductCodeList = true, FunctionConfig = BetListCustomerOutstandingRunningName)]
        public async Task<dynamic> Index(BetListExcelMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_SelRunningByDate_Mem";
            metaModel.ToDate = metaModel.ToDate.Date.AddDays(1).AddMinutes(-1);
            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }
    }
}