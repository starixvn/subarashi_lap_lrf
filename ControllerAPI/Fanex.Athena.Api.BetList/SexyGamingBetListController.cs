using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.BetList.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System.Threading.Tasks;
using System.Web.Http;

namespace Fanex.Athena.Api.BetList
{
    public class SexyGamingBetListController : ApiBetListBaseController
    {
        public SexyGamingBetListController(
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
            const string UspKey = "Lrf_BetList_LC_Detail";
            return GetBetListResult(metaModel, UspKey);
        }
    }
}
