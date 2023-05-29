using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Core;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Resources;
using Fanex.Data;

namespace Fanex.Athena.DataAccess.Customer
{
    public class BasePlayerSegmentationDataAccess : BaseDataAccess
    {
        protected BasePlayerSegmentationDataAccess()
        {
        }

        protected static async Task<IEnumerable<PlayerInfo>> ReadPlayerList(IObjectDb db, Action<IDataReader, PlayerInfo> readPlayerExtraData = null)
        {
            var playerList = new LinkedList<PlayerInfo>();
            using (var reader = await db.ExecuteReaderAsync().ConfigureAwait(false))
            {
                while (reader.Read())
                {
                    var player = new PlayerInfo();
                    ReadPlayer(reader, player);
                    readPlayerExtraData?.Invoke(reader, player);
                    playerList.AddLast(player);
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
            objectDb.SetParameterValue("UserName", SqlHelper.ToSqlTextSearch(metaModel.UserName));
            objectDb.SetParameterValue("PageIndex", metaModel.PageIndex);
            objectDb.SetParameterValue("PageSize", metaModel.PageSize);
            objectDb.SetParameterValue("OrderCol", metaModel.OrderCol);
            objectDb.SetParameterValue("SortType", metaModel.SortType);
            objectDb.SetParameterValue("TotalItems", 0);
            objectDb.SetParameterValue("CustomerClass", metaModel.CustomerClass);
        }

        protected static void ReadPlayer(IDataReader reader, PlayerInfo player)
        {
            player.CustId = Convert.ToInt32(reader["CustId"]);
            player.ExternalId = reader["username2"] as string;
            player.SystemId = reader["username"] as string;
            player.AgentId = Convert.ToInt32(reader["AgentID"]);
            player.IsVip = Convert.ToBoolean(reader["isVIP"]);
            player.IsBA = Convert.ToBoolean(reader["IsBA"]);
        }

        protected static int ReadTotal(IObjectDb db)
        {
            var total = Convert.ToInt32(db.GetParameterValue("TotalItems"));
            return total;
        }

        protected static void AddTrackingParams<T>(IObjectDb objectDb, T metaModel)
            where T : IMetaModelUserId, IMetaModelIp
        {
            objectDb.SetParameterValue("UserID", metaModel.UserId);
            objectDb.SetParameterValue("Ip", metaModel.Ip);
        }
    }
}