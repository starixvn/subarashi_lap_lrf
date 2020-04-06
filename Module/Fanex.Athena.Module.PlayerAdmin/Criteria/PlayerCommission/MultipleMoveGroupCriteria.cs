using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission
{
    public class MultipleMoveGroupCriteria : BasePlayerCommissionUpdateCriteria
    {
        public MultipleMoveGroupCriteria(MultipleMoveGroupQuery query) : base(query)
        {
            GroupCommId = query.GroupCommId;
        }

        public string GroupCommId { get; set; }

        public override string GetSPName() => "Lrf_CustomerMoveGroupComm";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);

            var permissions = CommissionGroupHelper.MapHardcodedNameFromDB(Permissions, isUpdate: true);
            foreach (var p in permissions)
            {
                db.SetParameterValue("IsUpdate" + p.Value, Permissions[p.Key]);
            }

            db.SetParameterValue("GroupCommId", GroupCommId);
        }
    }
}
