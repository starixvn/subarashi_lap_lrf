using System;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Model.Core.MetaModel.Common;
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

        public void Write(LogUserControlMetaModel metaModel)
        {
            const string UspName = "WriteLog_UserLog_UserControl";

            try
            {
                using (var db = base.GetObjectDb(UspName))
                {
                    db.SetParameterValue("CustID", metaModel.CustId);
                    db.SetParameterValue("UserId", metaModel.UserId);
                    db.SetParameterValue("ActionId", metaModel.ActionId);
                    db.SetParameterValue("doing", metaModel.Content);
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