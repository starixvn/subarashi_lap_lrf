// --------------------------------------------------------------------------
// <copyright file="OutStandingCompletedBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

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
    public class OutStandingCompletedBetListController : ApiBetListBaseController
    {
        private const string BetListCustomerOutstandingName = "BetList_CustomerOutstanding";

        public OutStandingCompletedBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpGet]
        [ValidationApiRequest(IsValidCurrency = true, IsValidProductCodeList = true, FunctionConfig = BetListCustomerOutstandingName)]
        public async Task<dynamic> Index(
            int page,
            int rows,
            [FromUri]BetListMetaModel metaModel)
        {
            return await GetPagingBetListResult(metaModel, "Lrf_BetList_CustomerList_Mem", page, rows).ConfigureAwait(false);
        }
    }
}