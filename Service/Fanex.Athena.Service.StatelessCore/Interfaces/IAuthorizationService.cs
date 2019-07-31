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
        bool HasPermissions(IEnumerable<Function> userFunctionList, params string[] permissionKeys);
        bool HasPermissions(OneAuthPermission[] userPortalFunctionList, params string[] permissionKeys);

        bool HasPermissionOnData(int licenseeId, int custId, long transId);

        bool IsAllowedEditCommission(UserAuthInfo userAuthInfo);

        bool IsAllowedSpecialBA(UserAuthInfo userAuthInfo);
    }
}