// --------------------------------------------------------------------------
// <copyright file="CorrectScoreBetListController.cs" company="">
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

    [ApiFunctionAuthorization(PermissionKeys.TotalBetCorrectScore)]
    public class CorrectScoreBetListController : ApiBetListBaseController
    {
        public CorrectScoreBetListController(
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
            const string UspKey = "Lrf_TotalBets_Sel430";

            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }
    }
}