// -----------------------------------------------------------------------
// <copyright file="AGCasinoBetListController.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Http;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Api.Base.Attributes;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    #endregion Using

    public class AGCasinoBetListController : ApiBetListBaseController
    {
        public AGCasinoBetListController(
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