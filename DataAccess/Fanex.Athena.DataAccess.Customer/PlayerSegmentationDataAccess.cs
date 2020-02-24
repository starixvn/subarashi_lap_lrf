using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer
{
    public class PlayerSegmentationDataAccess : BaseDataAccess, IPlayerSegmentationDataAccess
    {
        public async Task<PagingApiResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeProblemPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddProblemPlayerListParams(db, metaModel);

                var playerList = await ReadPlayerList(db);
                var total = ReadTotal(db);

                var result = new PagingApiResult<PlayerInfo>(playerList, total);
                return result;
            }
        }

        public async Task<PagingApiResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel)
        {
            const string spName = "Lrf_ProblemAccount_LicenseeVIPPlayerSel";
            using (var db = GetObjectDb(spName))
            {
                AddCommmonParams(db, metaModel);
                AddPlayerListBaseParams(db, metaModel);
                AddVipPlayerListParams(db, metaModel);

                var total = ReadTotal(db);
                var playerList = await ReadPlayerList(db);

                var result = new PagingApiResult<PlayerInfo>(playerList, total);
                return result;
            }
        }

        public Task<IEnumerable<object>> UpdateVipStatusAsync()
        {
            throw new System.NotImplementedException();
        }

        private static async Task<IEnumerable<PlayerInfo>> ReadPlayerList(IObjectDb db)
        {
            var playerList = new List<PlayerInfo>();
            using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (reader.Read())
                {
                    var player = ReadPlayer(reader);
                    playerList.Add(player);
                }
            }
            return playerList;
        }

        private static PlayerInfo ReadPlayer(IDataReader reader)
        {
            var playerInfo = new PlayerInfo
            {
                ExternalId = reader["username"].ToString(),
                SystemId = reader["username2"].ToString(),
                MarkDate = Convert.ToDateTime(reader["CreatedDate"]),
                IsVip = Convert.ToBoolean(reader["isVIP"]),
            };
            return playerInfo;
        }

        private static int ReadTotal(IObjectDb db)
        {
            var total = Convert.ToInt32(db.GetParameterValue("TotalItems"));
            return total;
        }

        private static void AddCommmonParams(IObjectDb objectDb, IMetaModelAgent metaModel)
        {
            objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);
        }

        private static void AddPlayerListBaseParams(IObjectDb objectDb, BasePlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("UserName", metaModel.UserName);
            objectDb.SetParameterValue("PageIndex", metaModel.PageIndex);
            objectDb.SetParameterValue("PageSize", metaModel.PageSize);
            objectDb.SetParameterValue("TotalItems", 0);
        }

        private static void AddProblemPlayerListParams(IObjectDb objectDb, ProblemPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("FromDate", metaModel.FromDate);
            objectDb.SetParameterValue("ToDate", metaModel.ToDate);
            objectDb.SetParameterValue("IsCheckAll", metaModel.IsGetAll);
        }

        private static void AddVipPlayerListParams(IObjectDb objectDb, VipPlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("VipOption", metaModel.VipOtption);
        }
    }
}