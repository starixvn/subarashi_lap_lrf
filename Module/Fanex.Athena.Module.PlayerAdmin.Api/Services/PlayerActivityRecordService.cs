using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerActivityRecordService : IPlayerActivityRecordService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerActivityRecordService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public PlayerActivityRecord GetActivityRecord(PlayerActivityRecordMetaModel metaModel)
        {
            const string UspName = "Lrf_CustomerLoginInfo";

            using (var db = _dbFactory.GetObjectDb(UspName))
            {
                db.SetParameterValue("custid", metaModel.IbcCustId);
                db.SetParameterValue("siteName", metaModel.SiteName);

                return db.QueryEntity<PlayerActivityRecord>();
            }
        }
    }
}