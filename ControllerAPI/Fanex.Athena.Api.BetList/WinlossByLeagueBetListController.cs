// --------------------------------------------------------------------------
// <copyright file="WinlossByLeagueBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.ReportWinLossByLeague)]
    public class WinlossByLeagueBetListController : ApiBetListBaseController
    {
        public WinlossByLeagueBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        public async Task<dynamic> Index(WinLossByLeagueBetListMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_WinlostByLeague_Mem";
            return await GetBetListResult(metaModel, UspKey, "/BetList/GetWinLossByLeagueData").ConfigureAwait(false);
        }
    }
}