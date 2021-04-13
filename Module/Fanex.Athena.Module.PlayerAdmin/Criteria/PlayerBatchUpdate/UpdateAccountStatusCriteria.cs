using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class UpdateAccountStatusCriteria : BasePlayerBatchUpdateCriteria
    {
        public UpdateAccountStatusCriteria(UpdateAccountStatusQuery query, string custId) : base(query, custId)
        {
            StatusId = query.StatusId;
        }

        public string StatusId { get; set; }

        public override string GetSPName() => "Lrf_CustomerMoveGroupComm";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);
            db.SetParameterValue("StatusId", StatusId);
        }
    }
}
