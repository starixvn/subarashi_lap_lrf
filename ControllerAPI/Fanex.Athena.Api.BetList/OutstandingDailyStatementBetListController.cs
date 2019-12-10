// --------------------------------------------------------------------------
// <copyright file="OutstandingDailyStatementBetListController.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.BetList
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Base;
    using Base.Attributes;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.BetList.DTO;
    using Model.BetList.MetaModel;

    using Service.Core.Common.Interfaces;

    [ApiFunctionAuthorization(PermissionKeys.CustomerInfoCustomerList)]
    public class OutstandingDailyStatementBetListController : BaseApiController
    {
        private readonly IBetListApiClient _betListApiClient;

        private readonly IAuthorizationService _authorizationService;

        public OutstandingDailyStatementBetListController(
            ILanguageService languageService,
            IBetListApiClient betListApiClient,
            IAuthorizationService authorizationService)
        : base(languageService)
        {
            _betListApiClient = betListApiClient;
            _authorizationService = authorizationService;
        }

        [HttpPost]
        [ValidationApiRequest]
        public async Task<dynamic> Index(BetListMetaModel metaModel)
        {
            var licenseeSession = SessionService.LicenseeSession;
            var userSession = SessionService.UserSession;
            metaModel.UserId = userSession.UserId;
            metaModel.LicenseeId = licenseeSession.LicenseeId;
            metaModel.ToDate = metaModel.ToDate.Date.AddDays(1).AddMinutes(-1);
            metaModel.HasPlayerCom = licenseeSession.IsAllowedCustomerComm;
            if (_authorizationService.HasPermissionOnData(userSession.CurrencyAgentList, metaModel.CustId, metaModel.TransId))
            {
                return await _betListApiClient.PostAsync("/OutstandingDailyStatementBetList/GetData",
                    metaModel, userSession.Language).ConfigureAwait(false);
            }

            return new List<DailyStatement>();
        }
    }
}