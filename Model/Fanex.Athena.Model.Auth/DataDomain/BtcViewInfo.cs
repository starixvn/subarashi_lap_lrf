using System.Collections.Generic;

namespace Fanex.Athena.Model.Auth.DataDomain
{
    public static class BtcViewInfo
    {
        public static readonly IEnumerable<string> TabList = new List<string>
        {
            PermissionKeys.BtcAdvancedSearch,
            PermissionKeys.BtcSingleCustomer,
            PermissionKeys.BtcRefNo,
            PermissionKeys.BtcRunning
        };
    }
}