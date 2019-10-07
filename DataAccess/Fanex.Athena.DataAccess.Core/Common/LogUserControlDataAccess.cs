using System;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Logging;

namespace Fanex.Athena.DataAccess.Core.Common
{
    public class LogUserControlDataAccess : BaseDataAccess, ILogUserControlDataAccess
    {
        private readonly ILogger _logger;

        [CLSCompliant(false)]
        public LogUserControlDataAccess(ILogger logger)
        {
            _logger = logger;
        }

        public void Write(int custId, int userId, int actionId, string content)
        {
            const string UspName = "WriteLog_UserLog_UserControl";

            try
            {
                using (var db = base.GetObjectDb(UspName))
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
                _logger.Error("WriteLog_UserLog_UserControl \n" + ex.Message, ex);
            }
        }
    }
}