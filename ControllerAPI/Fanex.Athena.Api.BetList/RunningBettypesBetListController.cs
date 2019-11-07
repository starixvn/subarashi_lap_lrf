// --------------------------------------------------------------------------
// <copyright file="RunningBettypesBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Threading.Tasks;

    #region Using

    using System.Web.Http;

    using Base.Attributes;

    using Model.Core.DataDomain;

    using DataAccess.Core.Configuration.Interfaces;

    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;
    using Service.StatelessCore.Interfaces;
    using Fanex.Athena.Model.Auth.DataDomain;

    #endregion Using

    /// <summary>
    /// RunningBetList contains bet list:
    /// Mix Parlay              - bet type: 9
    /// Clean Sheet             - bet type: 13
    /// Double Chance           - bet type: 24
    /// B/O/N team to score     - bet type: 26
    /// To win to nil           - bet type: 27
    /// 3-Way Handicap          - bet type: 28.
    /// </summary>
    public class RunningBettypesBetListController : ApiBetListBaseController
    {
        private const string DoubleChangeBettypes = "24,151,186,431,410";

        private const string BONTeamToScoreBettypes = "26,145,146,433,170,188,427";

        private readonly int[] _parlayBettypes = new[] { (int)BetType.CombinationMixParlay, (int)BetType.SingleMatchParlay };

        public RunningBettypesBetListController(
            ILanguageService languageService,
            IAuthorizationService authorizationService,
            IBetListApiClient betListApiClient,
            IBalanceUpDataAccess balanceUpDataAccess)
        : base(languageService, authorizationService, betListApiClient, balanceUpDataAccess)
        {
        }

        [HttpPost]
        [ValidationApiRequest]
        [ApiFunctionAuthorization(PermissionKeys.TotalBetMixParlay)]
        public async Task<dynamic> MixParlay(BetListMetaModel metaModel)
        {
            metaModel.MultipleBettype = string.Join(",", _parlayBettypes);
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.TotalBetDoubleChance)]
        [ValidationApiRequest]
        public async Task<dynamic> DoubleChange(BetListMetaModel metaModel)
        {
            metaModel.MultipleBettype = DoubleChangeBettypes;
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        [HttpPost]
        [ApiFunctionAuthorization(PermissionKeys.TotalBetBONTeamToScore)]
        [ValidationApiRequest(IsValidCurrency = true)]
        public async Task<dynamic> BONTeamToScore(BetListMetaModel metaModel)
        {
            metaModel.MultipleBettype = BONTeamToScoreBettypes;
            return await ProcessRequest(metaModel).ConfigureAwait(false);
        }

        private async Task<dynamic> ProcessRequest(BetListMetaModel metaModel)
        {
            const string UspKey = "Lrf_BetList_SelRunningByBettypeList";
            return await GetBetListResult(metaModel, UspKey).ConfigureAwait(false);
        }
    }
}