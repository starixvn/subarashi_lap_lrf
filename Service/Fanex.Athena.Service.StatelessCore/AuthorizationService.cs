// -----------------------------------------------------------------------
// <copyright file="AuthorizationService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;

    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class AuthorizationService : IAuthorizationService
    {
        private readonly IAthorizationDataAccess _authorizationDataAccess;

        public AuthorizationService(IAthorizationDataAccess authorizationDataAccess
           )
        {
            _authorizationDataAccess = authorizationDataAccess;
        }
        public bool HasPermissions(OneAuthPermission[] userPortalFunctionList, params string[] permissionKeys)
        {
            return userPortalFunctionList.Any(i => permissionKeys.Contains(i.FunctionKey,
                StringComparer.InvariantCultureIgnoreCase)
            || (i.SubFunctionKeys != null && i.SubFunctionKeys.Intersect(permissionKeys).Any()));
        }

        public bool HasPermissions(IEnumerable<Function> userFunctionList, params string[] permissionKeys)
        {
            return userFunctionList.Any(x => permissionKeys.Contains(x.FunctionKey, StringComparer.InvariantCultureIgnoreCase));
        }

        public bool IsAllowedEditCommission(UserAuthInfo userAuthInfo)
        {
            return userAuthInfo.ApplicationMode == AppMode.Parasitic ? userAuthInfo.PortalFunctionList != null && userAuthInfo.PortalFunctionList.Any(i => i.FunctionKey
                   == PermissionKeys.CustomerInfoCommissionGroupList ||
                   (i.SubFunctionKeys != null && i.SubFunctionKeys.Contains(PermissionKeys.CustomerInfoCommissionGroupList)))
                   : userAuthInfo.FunctionList != null && userAuthInfo.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoCommissionGroupList);
        }

        public bool IsAllowedSpecialBA(UserAuthInfo userAuthInfo)
        {
            return userAuthInfo.ApplicationMode == AppMode.Parasitic ? userAuthInfo.PortalFunctionList != null && (userAuthInfo.PortalFunctionList.Any(i => i.FunctionKey
                   == PermissionKeys.CustomerInfoSpecialBA || (i.SubFunctionKeys != null && i.SubFunctionKeys.Contains(PermissionKeys.CustomerInfoSpecialBA))))
                   : userAuthInfo.FunctionList != null && userAuthInfo.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoSpecialBA);
        }

        public bool HasPermissionOnData(IDictionary<int, int[]> currencyAgents, int custId, long transId)
        {
            if (custId == 0 && transId == 0)
            {
                return true;
            }

            var item = _authorizationDataAccess.IsCustomerBelonging(custId, transId);

            return currencyAgents.Any(i => i.Key == item.Item1 && i.Value.Contains(item.Item2));
        }
        public bool HasPermissionOnData(OneAuthCurrency[] currencyAgents, int custId, long transId)
        {
            if (custId == 0 && transId == 0)
            {
                return true;
            }

            var item = _authorizationDataAccess.IsCustomerBelonging(custId, transId);

            return currencyAgents.Any(i => i.CurrencyId == item.Item1 && i.AgentId.Contains(item.Item2));
        }

    }
}