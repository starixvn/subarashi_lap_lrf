// --------------------------------------------------------------------------
// <copyright file="RunningMatchChoiceBetListController.cs" company="">
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

    public class RunningMatchChoiceBetListController : ApiBetListBaseController
    {
        public RunningMatchChoiceBetListController(
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
            return await GetBetListResult(metaModel, "Lrf_BetList_Forecast_SelByMatch").ConfigureAwait(false);
        }
    }
}