using System;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Logging;

namespace Fanex.Athena.DataAccess.Core.Common
{
    public class BusinessLogDataAccess : BaseDataAccess, IBusinessLogDataAccess
    {
        private readonly ILogger _logger;

        [CLSCompliant(false)]
        public BusinessLogDataAccess(ILogger logger)
        {
            _logger = logger;
        }

        public void Write(BusinessLogItem businessLogItem)
        {
            const string UspName = "WriteLog_UserLog_UserControl";

            try
            {
                using (var db = base.GetObjectDb(UspName))
                {
                    db.ExecuteNonQuery(businessLogItem);
                }
            }
            catch (Exception ex)
            {
                _logger.Error("WriteLog_UserLog_UserControl \n" + ex.Message, ex);
            }
        }
    }
}