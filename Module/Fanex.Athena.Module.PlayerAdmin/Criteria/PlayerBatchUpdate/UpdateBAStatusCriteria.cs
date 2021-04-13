using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class UpdateBAStatusCriteria : BasePlayerBatchUpdateCriteria
    {
        public UpdateBAStatusCriteria(UpdateBAStatusQuery query, string custId) : base(query, custId)
        {
            BAStatusId = query.BAStatusId;
        }

        public string BAStatusId { get; set; }

        public override string GetSPName() => "Lrf_CustomerUpdMemberBAStatus";

        public override void SetParameterValues(IObjectDb db)
        {
            base.SetParameterValues(db);
            db.SetParameterValue("LicenseeName", SiteName);
            db.SetParameterValue("ModifyBy", UserId);
            db.SetParameterValue("IsBA", BAStatusId == "1");
            db.SetParameterValue("OddsGroup", null);
        }
    }
}
