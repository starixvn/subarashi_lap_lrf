using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer
{
    public class PlayerSegmentationDataAccess : BasePlayerSegmentationDataAccess, IPlayerSegmentationDataAccess
    {
        public async Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeProblemPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddProblemPlayerListParams(db, metaModel);

                var playerList = await ReadPlayerList(db, (reader, player) =>
                {
                    player.MarkDate = Convert.ToDateTime(reader["CreatedDate"]);
                });
                var total = ReadTotal(db);

                var result = new ApiPagingResult<PlayerInfo>(playerList, metaModel.PageIndex, metaModel.PageSize, total);
                return result;
            }
        }

        public async Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVIPPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddVipPlayerListParams(db, metaModel);

                var playerList = await ReadPlayerList(db);
                var total = ReadTotal(db);

                var result = new ApiPagingResult<PlayerInfo>(playerList, metaModel.PageIndex, metaModel.PageSize, total);
                return result;
            }
        }

        public async Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVipPlayerUpd";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddVipStatusUpdateParams(db, metaModel);

                using (var reader = await db.ExecuteReaderAsync())
                {
                    var result = new List<UpdateStatusPlayerResult>();
                    while (reader.Read())
                    {
                        var record = new UpdateStatusPlayerResult();
                        record.Code = Convert.ToInt16(reader["ErrCode"]);
                        record.NumberOfPlayer = Convert.ToInt16(reader["cnt"]);
                        record.PlayerIds = reader["ErrMsg"] as string;
                        result.Add(record);
                    }

                    return result;
                }
            }
        }

        private static void AddVipStatusUpdateParams(IObjectDb objectDb, UpdateStatusPlayerMetaModel metaModel)
        {
            objectDb.SetParameterValue("Username", metaModel.SystemIds);
            objectDb.SetParameterValue("IsVip", metaModel.isVip);
            objectDb.SetParameterValue("UserID", metaModel.UserId);
            objectDb.SetParameterValue("Ip", metaModel.Ip);
        }

        private static void AddProblemPlayerListParams(IObjectDb objectDb, ProblemPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("FromDate", metaModel.FromDate);
            objectDb.SetParameterValue("ToDate", metaModel.ToDate);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
        }

        private static void AddVipPlayerListParams(IObjectDb objectDb, VipPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("VipOption", metaModel.VipOption);
        }
    }
}