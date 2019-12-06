// --------------------------------------------------------------------------
// <copyright file="DailyStatementBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base.Attributes;

    using DataAccess.Core.Configuration.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class DailyStatementBetListController : ApiBetListBaseController
    {
        public DailyStatementBetListController(
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
            const string UspKey = "Lrf_BetList_SelByDayAll_Mem";
            const string UspKeyOld = "Lrf_BetList_SelByDayAll_Mem_Old";

            var balanceUp = GetBalanceUp();
            var uspKey = metaModel.FromDate < balanceUp.BalanceUpDay ? UspKeyOld : UspKey;

            metaModel.ToDate = metaModel.ToDate.Date.AddDays(1).AddMinutes(-1);

            const int RunningTicketTransType = 3;
            HttpResponseMessage response = await GetBetListResult(metaModel, uspKey).ConfigureAwait(false);

            var result = await response.Content.ReadAsAsync<dynamic>().ConfigureAwait(false);

            return new
            {
                result.Main,
                result.Total,
                result.LeagueName,
                IsShowTotal = metaModel.TransType != RunningTicketTransType
            };
        }
    }
}