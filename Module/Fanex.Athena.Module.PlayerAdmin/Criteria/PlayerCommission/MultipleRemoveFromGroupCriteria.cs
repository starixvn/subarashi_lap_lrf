using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission
{
    public class MultipleRemoveFromGroupCriteria : BasePlayerCommissionUpdateCriteria
    {
        public MultipleRemoveFromGroupCriteria(MultipleRemoveFromGroupQuery query) : base(query)
        {
            IsRemovePlayerComm = query.IsRemovePlayerComm;
        }

        public bool IsRemovePlayerComm { get; set; }

        public override string GetSPName() => "Lrf_CustomerRemoveGroupComm";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);
            db.SetParameterValue("IsRemovePlayercomm", IsRemovePlayerComm);
        }
    }
}
