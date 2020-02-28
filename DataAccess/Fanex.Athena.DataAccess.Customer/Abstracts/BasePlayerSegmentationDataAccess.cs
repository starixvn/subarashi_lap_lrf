using Fanex.Athena.DataAccess.Core;
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
    public abstract class BasePlayerSegmentationDataAccess : BaseDataAccess
    {
        protected async Task<IEnumerable<PlayerInfo>> ReadPlayerList(IObjectDb db, Action<IDataReader, PlayerInfo> readPlayerExtraData = null)
        {
            var playerList = new List<PlayerInfo>();
            using (var reader = await db.ExecuteReaderAsync())
            {
                while (reader.Read())
                {
                    var player = new PlayerInfo();
                    ReadPlayer(reader, player);
                    readPlayerExtraData?.Invoke(reader, player);
                    playerList.Add(player);
                }
            }
            return playerList;
        }

        protected static void AddCommmonParams(IObjectDb objectDb, IMetaModelAgent metaModel)
        {
            objectDb.SetParameterValue("AgentList", metaModel.AgentListXml);
        }

        protected static void AddPlayerListBaseParams(IObjectDb objectDb, BasePlayerListMetaModel metaModel)
        {
            objectDb.SetParameterValue("UserName", metaModel.UserName);
            objectDb.SetParameterValue("PageIndex", metaModel.PageIndex);
            objectDb.SetParameterValue("PageSize", metaModel.PageSize);
            objectDb.SetParameterValue("OrderCol", metaModel.OrderCol);
            objectDb.SetParameterValue("SortType", metaModel.SortType);
            objectDb.SetParameterValue("TotalItems", 0);
        }

        protected static void ReadPlayer(IDataReader reader, PlayerInfo player)
        {
            player.CustId = Convert.ToInt32(reader["CustId"]);
            player.ExternalId = reader["username2"] as string;
            player.SystemId = reader["username"] as string;
            player.IsVip = Convert.ToBoolean(reader["isVIP"]);
            player.IsMarkVoid = Convert.ToBoolean(reader["isMarkVoid"]);
        }

        protected static int ReadTotal(IObjectDb db)
        {
            var total = Convert.ToInt32(db.GetParameterValue("TotalItems"));
            return total;
        }
    }
}