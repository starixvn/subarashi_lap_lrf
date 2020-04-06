using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission
{
    public class GetAllCommGroupsCriteria
    {
        public GetAllCommGroupsCriteria(BasePlayerCommissionUpdateQuery query)
        {
            LicenseeId = query.LicenseeId;
            Permissions = query.Permissions;
        }

        public int LicenseeId { get; set; }

        public IDictionary<string, bool> Permissions { get; set; }

        public string GetSPName() => "Lrf_LicenseeGroupCommSel";

        public void SetParameterValues(IObjectDb db)
        {
            db.SetParameterValue("LicenseeID", LicenseeId);
        }
    }
}
