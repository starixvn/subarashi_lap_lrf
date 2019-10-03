// --------------------------------------------------------------------------
// <copyright file="LogController.LoginLog.cs" company="">
// Copyright (c) . All rights reserved.
// </copyright>
// --------------------------------------------------------------------------

namespace Fanex.Athena.Api.CustomerLog
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web.Http;

    using Fanex.Athena.Service.StatelessCore.Utility;

    public partial class LogController
    {
        [HttpGet]
        public async Task<dynamic> LoginLog(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return new { rows = new List<string>() };
            }

            var licenseeId = SessionService.LicenseeSession.LicenseeId;
            var userSession = SessionService.UserSession;
            var agentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList);
            var dataList = await _logInLogDataAccess.GetDataList(licenseeId, username.Trim(), agentListXml).ConfigureAwait(false);

            return new
            {
                rows = dataList
            };
        }
    }
}