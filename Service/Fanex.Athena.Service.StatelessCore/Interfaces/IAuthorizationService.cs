// -----------------------------------------------------------------------
// <copyright file="IAuthorizationService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;

    using Fanex.Athena.Model.Auth;

    public interface IAuthorizationService
    {
        bool HasPermissions(UserAuthInfo userAuthInfo, params string[] permissionKeys);

        bool HasPermissionOnData(IDictionary<int, int[]> currencyAgents, int custId, long transId);

        bool HasPermissionOnData(IEnumerable<OneAuthCurrency> currencyAgents, int custId, long transId);

        bool IsAllowedEditCommission(UserAuthInfo userAuthInfo);

        bool IsAllowedSpecialBA(UserAuthInfo userAuthInfo);

        bool CheckCustomerBelongsTo(IDictionary<int, int[]> currencyAgents, int custId, int currencyId = 0);

        bool CheckProductBelongsTo(string licenseeName, int productId, int[] limitedProductIds = null);
    }
}