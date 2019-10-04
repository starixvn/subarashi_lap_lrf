using System;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces;
using Fanex.Logging;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository
{
    public class PlayerLogRepository : IPlayerLogRepository
    {
        private readonly IDbFactory _dbFactory;

        private readonly ILogger _logger;

        public PlayerLogRepository(IDbFactory dbFactory, ILogger logger)
        {
            _dbFactory = dbFactory;
            _logger = logger;
        }

        public void Write(int custId, int userId, int actionId, string content)
        {
            const string UspName = "WriteLog_UserLog_UserControl_Wrapper";

            try
            {
                using (var db = _dbFactory.GetObjectDb(UspName))
                {
                    db.SetParameterValue("CustID", custId);
                    db.SetParameterValue("UserId", userId);
                    db.SetParameterValue("ActionId", actionId);
                    db.SetParameterValue("doing", content);
                    db.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                _logger.Error("WriteLog_UserLog_UserControl_Wrapper \n" + ex.Message, ex);
            }
        }
    }
}