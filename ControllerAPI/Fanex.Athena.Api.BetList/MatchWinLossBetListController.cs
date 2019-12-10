// --------------------------------------------------------------------------
// <copyright file="MatchWinLossBetListController.cs" company="">
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
    using Service.Core.Utility.Interfaces;
    using Service.StatelessCore.Interfaces;

    #endregion Using

    [ApiFunctionAuthorization(PermissionKeys.ReportMatchWinLoss)]
    public class MatchWinLossBetListController : ApiBetListBaseController
    {
        private readonly ICurrencyValidation _currencyValidation;

        public MatchWinLossBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess,
             ICurrencyValidation currencyValidation
            )
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
            _currencyValidation = currencyValidation;
        }

        [HttpGet]
        [ValidationApiRequest(ObjectName = "metaModel", IsValidCurrency = true)]
        public async Task<dynamic> MatchBetType(
            int page,
            int rows,
            [FromUri]BetListMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_MatchWL_Bettype";

            return await GetPagingBetListResult(metaModel, UspKey, page, rows).ConfigureAwait(false);
        }

        /// <summary>
        /// Get match win lost outright bet list.
        /// </summary>
        /// <param name="metaModel">Meta model object.</param>
        /// <returns>Bet list data for match win loss outright.</returns>
        [HttpPost]
        [ValidationApiRequest(IsValidCurrency = true)]
        public async Task<dynamic> Outright(BetListMetaModel metaModel)
        {
            metaModel.IsServerPaging = true;

            const string UspKey = "Lrf_BetList_MatchWL_Outright";
            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }

        [HttpGet]
#pragma warning disable S107 // Methods should not have too many parameters
        public async Task<dynamic> MixParlay(
            int page,
            int rows,
            int currencyId,
            string baseCurrency,
            int betType,
            DateTime fromDate,
            DateTime toDate,
            string productCodeList,
            string sortBy = null,
            string sortOrder = null)
#pragma warning restore S107 // Methods should not have too many parameters
        {
            if (_currencyValidation.IsValidBaseCurrency(baseCurrency)
                && _currencyValidation.IsValidCurrency(currencyId))
            {
                const string UspKey = "Lrf_BetList_MatchWL_Parlay";
                var metaModel = new BetListMetaModel
                {
                    LicenseeId = SessionService.LicenseeSession.LicenseeId,
                    UserId = SessionService.UserSession.UserId,
                    CurrencyId = currencyId,
                    BetType = betType,
                    BaseCurrency = baseCurrency ?? string.Empty,
                    FromDate = fromDate.Date,
                    ToDate = toDate.Date,
                    SortBy = sortBy,
                    SortOrder = sortOrder,
                    ProductCodeList = productCodeList
                };

                return await GetPagingBetListResult(metaModel, UspKey, page, rows).ConfigureAwait(false);
            }

            return null;
        }
    }
}