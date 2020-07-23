using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;

namespace Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission
{
    public class BaseUpdateGroupViewModel
    {
        public BaseUpdateGroupViewModel(BasePlayerCommissionUpdateQuery query)
        {
            CustIdsStr = query.CustIds ?? string.Empty;
            CustNamesStr = query.CustNames ?? string.Empty;
            CustIds = CustIdsStr.Split(',');
            CustNames = CustNamesStr.Split(',');
            ProductPermissions = query.Permissions;
        }

        public string[] CustIds { get; set; }

        public string[] CustNames { get; set; }

        public string CustIdsStr { get; set; }

        public string CustNamesStr { get; set; }

        public IDictionary<string, bool> ProductPermissions { get; }
    }
}
