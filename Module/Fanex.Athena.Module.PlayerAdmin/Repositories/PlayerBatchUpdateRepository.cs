using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Common;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    public class PlayerBatchUpdateRepository : IPlayerBatchUpdateRepository
    {
        private readonly IDbFactory dbFactory;

        public PlayerBatchUpdateRepository(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public async Task<IResultInfo> Update(BasePlayerBatchUpdateCriteria criteria)
        {
            var result = new ResultInfo();

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);
                AssignResult(db, result);
                return result;
            }
        }

        public async Task<IResultInfo> UpdateBAStatus(UpdateBAStatusCriteria criteria)
        {
            var result = new ResultInfo();

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                await db.ExecuteNonQueryAsync().ConfigureAwait(false);

                var errorCode = db.GetParameterValue("ErrCode");
                var errorMessage = db.GetParameterValue("ErrMsg");
                var extendedData = db.GetParameterValue("OddsGroup");

                result.Code = Converter.ToInt(errorCode);
                result.Message = Converter.ToString2(errorMessage);
                result.ExtendedData = Converter.ToString2(extendedData);

                return result;
            }
        }

        public async Task<Dictionary<string, string>> GetOldValues(List<int> custIds, int type)
        {
            var criteria = new GetOldValuesCriteria(custIds, type);
            var result = new Dictionary<string, string>();

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                var valueCoumn = criteria.GetValueColumnName();

                using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
                {
                    while (reader.Read())
                    {
                        var custId = reader["custid"].ToString();
                        result[custId] = reader[valueCoumn].ToString();
                    }
                }
            }

            return result;
        }

        private static void AssignResult(IObjectDb db, IResultInfo result)
        {
            var errorCode = db.GetParameterValue("ErrCode");
            var errorMessage = db.GetParameterValue("ErrMsg");

            result.Code = Converter.ToInt(errorCode);
            result.Message = Converter.ToString2(errorMessage);
        }
    }
}
