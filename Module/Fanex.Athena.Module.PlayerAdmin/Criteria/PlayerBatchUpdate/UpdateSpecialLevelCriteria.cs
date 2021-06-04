using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class UpdateSpecialLevelCriteria : BasePlayerBatchUpdateCriteria
    {
        public UpdateSpecialLevelCriteria(UpdateSpecialLevelQuery query, string custId) : base(query, custId)
        {
            SpecialLevelId = query.SpecialLevelId;
        }

        public string SpecialLevelId { get; set; }

        public override string GetSPName() => "Lrf_CustomerUpdSpecialLevel";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);
            db.SetParameterValue("UserId", UserId);
            db.SetParameterValue("SpecialLevel", SpecialLevelId);
        }
    }
}
