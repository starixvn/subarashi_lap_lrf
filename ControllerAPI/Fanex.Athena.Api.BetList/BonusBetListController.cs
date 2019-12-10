namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Api.Base.Attributes;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    public class BonusBetListController : ApiBetListBaseController
    {
        public BonusBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpPost]
        [ValidationApiRequest]
        public Task<dynamic> Detail(BetListMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_LicenseeBonus_Detail";
            return GetBetListResult(metaModel, UspKey);
        }
    }
}