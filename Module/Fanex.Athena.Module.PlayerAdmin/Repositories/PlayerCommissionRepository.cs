using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.Helper;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;
using Fanex.Common;
using Fanex.Data;

namespace Fanex.Athena.Module.PlayerAdmin.Repositories
{
    public class PlayerCommissionRepository : IPlayerCommissionRepository
    {
        private readonly IDbFactory dbFactory;

        public PlayerCommissionRepository(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public IEnumerable<PlayerCommissionViewModel> GetAllCommGroups(GetAllCommGroupsCriteria criteria)
        {
            var comms = new List<PlayerCommissionViewModel>();
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(criteria.Permissions, isUpdate: false);

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                using (var reader = db.ExecuteReader())
                {
                    var visibility = CommissionGroupHelper.GetProductColumns(reader, hardcodedColumns);

                    while (reader.Read())
                    {
                        var comm = new PlayerCommissionViewModel();
                        comm.GroupName = Converter.ToString2(reader["GroupName"]);
                        comm.MapData(reader, hardcodedColumns, visibility);
                        comms.Add(comm);
                    }
                }
            }

            return comms;
        }

        public PlayerCommissionViewModel GetCommissionGroupById(GetCommissionGroupByIdCriteria criteria)
        {
            var comm = new PlayerCommissionViewModel();
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(criteria.Permissions, isUpdate: false);

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                using (var reader = db.ExecuteReader())
                {
                    var visibility = CommissionGroupHelper.GetProductColumns(reader, hardcodedColumns);

                    while (reader.Read())
                    {
                        comm.GroupName = Converter.ToString2(reader["GroupName"]);
                        comm.MapData(reader, hardcodedColumns, visibility);
                    }
                }
            }

            return comm;
        }

        public async Task<IResultInfo> MultipleMoveGroup(MultipleMoveGroupCriteria criteria)
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

        public async Task<IResultInfo> MultipleRemoveFromGroup(MultipleRemoveFromGroupCriteria criteria)
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

        public async Task<IResultInfo> MultipleUpdateGroup(MultipleUpdateGroupCriteria criteria)
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

        public PlayerCommissionViewModel GetPlayerCommissionGroup(GetPlayerCommissionGroupCriteria criteria)
        {
            var comm = new PlayerCommissionViewModel();
            var hardcodedColumns = CommissionGroupHelper.MapHardcodedNameFromDB(criteria.Permissions, isUpdate: false);

            using (var db = dbFactory.GetObjectDb(criteria.GetSPName()))
            {
                criteria.SetParameterValues(db);
                using (var reader = db.ExecuteReader())
                {
                    var visibility = CommissionGroupHelper.GetProductColumns(reader, hardcodedColumns);

                    while (reader.Read())
                    {
                        comm.MapData(reader, hardcodedColumns, visibility);
                    }
                }
            }

            return comm;
        }

        private static void AssignResult(IObjectDb db, IResultInfo result)
        {
            var errorCode = db.GetParameterValue("ErrCode");
            var errorMessage = db.GetParameterValue("ErrMsg");

            result.Code = Converter.ToInt(errorCode);
            result.Message = Converter.ToString2(errorMessage);
            result.ExtendedData = Converter.ToString2(db.GetParameterValue("strCustId"));
        }
    }
}
