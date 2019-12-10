// --------------------------------------------------------------------------
// <copyright file="RunningMatchBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using DataAccess.Core.Configuration.Interfaces;

    using Fanex.Athena.Api.Base.Attributes;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    public class RunningMatchBetListController : ApiBetListBaseController
    {
        public RunningMatchBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        public async Task<dynamic> Index(BetListMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_SelRunningByBettypeMatch";
            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }
    }
}