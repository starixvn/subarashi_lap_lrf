// --------------------------------------------------------------------------
// <copyright file="PendingFundsBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    #region Using

    using System;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    #endregion Using

    [ApiFunctionAuthorization(PermissionKeys.ReportCustomerPendingFunds)]
    public class PendingFundsBetListController : ApiBetListBaseController
    {
        public PendingFundsBetListController(
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
            const string UspKey = "Lrf_BetList_SelRunningByDate_Mem";

            metaModel.FromDate = DateTime.Today.AddYears(-1);
            metaModel.ToDate = DateTime.Today.AddYears(1);

            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }
    }
}