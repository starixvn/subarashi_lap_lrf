namespace Fanex.Athena.DataAccess.Core.Common
{
    using Core;
    using Fanex.Athena.DataAccess.Core.Common.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Customer.MetaModel;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UserLogDataAccess : BaseDataAccess, IUserLogDataAccess
    {
        public async Task<IList<UserLog>> ReadLog(UserLogMetaModel model)
        {
            const string SpName = "Lap_ReadLog_UserLog_UserControl";
            using (var db = this.GetObjectDb(SpName))
            {
                db.SetParameterValue("StartDate", model.StartDate);
                db.SetParameterValue("EndDate", model.EndDate.Add(new TimeSpan(23, 59, 59)));
                db.SetParameterValue("ActionIDList", model.ActionIdList);

                return (await db.QueryAsync<UserLog>().ConfigureAwait(false)).ToList();
            }
        }

        public void WriteLog(UserLogItem businessLogItem)
        {
            const string UspName = "WriteLog_UserLog_UserControl";

            using (var db = base.GetObjectDb(UspName))
            {
                db.ExecuteNonQuery(businessLogItem);
            }
        }
    }
}