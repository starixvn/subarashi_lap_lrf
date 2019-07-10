// -----------------------------------------------------------------------
// <copyright file="IAuthorizationService.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Auth;

    public interface IAuthorizationService
    {
        bool HasPermissions(IEnumerable<int> userFunctionList, params string[] permissionKeys);

        bool HasPermissions(IEnumerable<string> userFunctionList, params string[] permissionKeys);

        bool HasPermissionOnData(int licenseeId, int custId, long transId);
        bool IsAllowedEditCommission(UserAuthInfo userAuthInfo);

        bool IsAllowedSpecialBA(UserAuthInfo userAuthInfo);

    }
}