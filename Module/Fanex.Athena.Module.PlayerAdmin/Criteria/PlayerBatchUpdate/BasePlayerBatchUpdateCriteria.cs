using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate
{
    public class BasePlayerBatchUpdateCriteria
    {
        public BasePlayerBatchUpdateCriteria(BasePlayerBatchUpdateQuery query, string custId)
        {
            LicenseeId = query.LicenseeId;
            SiteName = query.SiteName;
            CustId = custId;
            UserId = query.UserId;
            IP = query.IP;
            Language = query.Language;
        }

        public int LicenseeId { get; set; }

        public string SiteName { get; set; }

        public string CustId { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public string Language { get; set; }

        public virtual string GetSPName() => string.Empty;

        public virtual void SetParameterValues(IObjectDb db)
        {
            db.SetParameterValue("CustId", CustId);
            db.SetParameterValue("Ip", IP);
            db.SetParameterValue("langkey", Language);
            db.SetParameterValue("ErrCode", null);
            db.SetParameterValue("ErrMsg", null);
        }
    }
}
