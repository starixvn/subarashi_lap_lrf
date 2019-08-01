// -----------------------------------------------------------------------
// <copyright file="BetSettingBaseService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.BetSettings
{
    using System.Collections.Generic;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Model.Core.DTO.Common;

    public class BetSettingBaseService
    {
        private readonly IAuthorizationService _authorizationService;

        public BetSettingBaseService(IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        protected static IResultInfo ErrorResult(string message)
        {
            return new ResultInfo
            {
                Code = 1,
                Message = message
            };
        }

        protected bool HasPermissionOnData(IDictionary<int, int[]> currencyAgents, int custId)
        {
            return _authorizationService.HasPermissionOnData(currencyAgents, custId, 0);
        }
    }
}