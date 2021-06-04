using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class UpdateOddsGroupCriteria : BasePlayerBatchUpdateCriteria
    {
        public UpdateOddsGroupCriteria(UpdateOddsGroupQuery query, string custId) : base(query, custId)
        {
            OddsGroupId = query.OddsGroupId;
        }

        public string OddsGroupId { get; set; }

        public override string GetSPName() => "Lrf_CustomerUpdUgroup";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);
            db.SetParameterValue("UserId", UserId);
            db.SetParameterValue("OddsGroup", OddsGroupId);
        }
    }
}
