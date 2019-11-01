// -----------------------------------------------------------------------
// <copyright file="AuthorizationService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using Fanex.Athena.DataAccess.Core.Users.Interfaces;
    using Fanex.Athena.Extension.Utility.Interfaces;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Auth.DataDomain;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    public class AuthorizationService : IAuthorizationService
    {
        private const int OneHourInSecond = 3600;

        private readonly IAthorizationDataAccess _authorizationDataAccess;

        private readonly ICustomMemoryCacheService _cache;

        public AuthorizationService(IAthorizationDataAccess authorizationDataAccess, ICustomMemoryCacheService cache)
        {
            _authorizationDataAccess = authorizationDataAccess;
            _cache = cache;
        }

        public bool HasPermissions(UserAuthInfo userAuthInfo, params string[] permissionKeys)
        {
            if (userAuthInfo.ApplicationMode == AppMode.Parasitic)
            {
                if (userAuthInfo.IsSuperAdmin)
                {
                    return true;
                }

                return userAuthInfo.PortalFunctionList.Any(i => permissionKeys.Contains(i.FunctionKey,
                    StringComparer.InvariantCultureIgnoreCase)
                || (i.SubFunctionKeys != null && i.SubFunctionKeys.Intersect(permissionKeys).Any()));
            }

            return userAuthInfo.FunctionList.Any(x => permissionKeys.Contains(x.FunctionKey, StringComparer.InvariantCultureIgnoreCase));
        }
        public bool IsAllowedEditCommission(UserAuthInfo userAuthInfo)
        {
            if (userAuthInfo.ApplicationMode == AppMode.Parasitic)
            {
                if (userAuthInfo.IsSuperAdmin)
                {
                    return true;
                }
                return userAuthInfo.PortalFunctionList != null && userAuthInfo.PortalFunctionList.Any(i => i.FunctionKey
                      == PermissionKeys.CustomerInfoCommissionGroupList ||
                      (i.SubFunctionKeys != null && i.SubFunctionKeys.Contains(PermissionKeys.CustomerInfoCommissionGroupList)));

            }
            return userAuthInfo.FunctionList != null && userAuthInfo.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoCommissionGroupList);
        }

        public bool IsAllowedSpecialBA(UserAuthInfo userAuthInfo)
        {
            if (userAuthInfo.ApplicationMode == AppMode.Parasitic)
            {
                if (userAuthInfo.IsSuperAdmin)
                {
                    return true;
                }
                return userAuthInfo.PortalFunctionList != null && (userAuthInfo.PortalFunctionList.Any(i => i.FunctionKey
                     == PermissionKeys.CustomerInfoSpecialBA
                     || (i.SubFunctionKeys != null && i.SubFunctionKeys.Contains(PermissionKeys.CustomerInfoSpecialBA))));

            }
            return userAuthInfo.FunctionList != null && userAuthInfo.FunctionList.Any(x => x.FunctionKey == PermissionKeys.CustomerInfoSpecialBA);
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

        public bool CheckCustomerBelongsTo(IDictionary<int, int[]> currencyAgents, int custId, int currencyId = 0)
        {
            var item = _authorizationDataAccess.IsCustomerBelonging(custId, 0);

            return currencyAgents.Any(i => i.Key == item.Item1 && i.Value.Contains(item.Item2) && (currencyId == 0 || item.Item1 == currencyId));
        }

        public bool HasPermissionOnData(IEnumerable<OneAuthCurrency> currencyAgents, int custId, long transId)
        {
            if (custId == 0 && transId == 0)
            {
                return true;
            }

            var item = _authorizationDataAccess.IsCustomerBelonging(custId, transId);

            return currencyAgents.Any(i => i.CurrencyId == item.Item1 && i.AgentId.Contains(item.Item2));
        }

        public bool CheckProductBelongsTo(string licenseeName, int productId, int[] limitedProductIds = null)
        {
            if (limitedProductIds != null && !limitedProductIds.Contains(productId))
            {
                return false;
            }

            var cacheKey = $"Lrf_CheckBelonging_ValidateProduct_{licenseeName}_{productId}";

            if (_cache.Contains(cacheKey))
            {
                return _cache.Get<bool>(cacheKey);
            }

            var isValidProduct = _authorizationDataAccess.IsProductBelonging(productId, licenseeName);
            _cache.Set(cacheKey, isValidProduct, OneHourInSecond);

            return isValidProduct;
        }
    }
}