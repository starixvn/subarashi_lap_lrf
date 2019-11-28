using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.DataAccess.Report.Interfaces;

namespace Fanex.Athena.DataAccess.Report
{
    public class ExchangeVoidedDataAccess : BaseDataAccess, IExchangeVoidedDataAccess
    {
        public int GetCustId(string userName, string agentList)
        {
            const string SpName = "Lrf_UserInfoByUserNameSel";

            using (var objectDb = GetObjectDb(SpName))
            {
                objectDb.SetParameterValue("UserName", userName);
                objectDb.SetParameterValue("AgentList", agentList);

                return objectDb.QueryEntity<int>();
            }
        }
    }
}