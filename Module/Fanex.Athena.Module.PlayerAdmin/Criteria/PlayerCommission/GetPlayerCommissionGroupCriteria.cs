using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission
{
    public class GetPlayerCommissionGroupCriteria
    {
        public GetPlayerCommissionGroupCriteria(SingleMoveGroupQuery query)
        {
            CustId = query.CustId;
            Permissions = query.Permissions;
        }

        public int CustId { get; set; }

        public IDictionary<string, bool> Permissions { get; set; }

        public string GetSPName() => "Lrf_LicenseeCustCommSel";

        public void SetParameterValues(IObjectDb db)
        {
            db.SetParameterValue("CustId", CustId);
        }
    }
}
