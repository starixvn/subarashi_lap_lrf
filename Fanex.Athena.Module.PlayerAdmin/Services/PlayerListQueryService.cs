using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Common.Extensions;
using Fanex.Data;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Services
{
    public class PlayerListQueryService : IPlayerListQueryService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerListQueryService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public EntityResult<Player> SearchPlayerByUserName(SearchPlayerByUserNameMetaModel searchParam)
        {
            const string SpKey = "Lrf_CustomerSelByUsername";
            var result = new EntityResult<Player>();

            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                AssignParamByUserName(objectDb, searchParam);

                result.MainData = ReadPlayerList(objectDb);
                result.TotalItem = Common.Converter.ToInt(objectDb.GetParameterValue("TotalRows"));
            }

            return result;
        }

        public EntityResult<Player> SearchPlayerByIdList(SearchPlayerByIdListMetaModel searchParam)
        {
            throw new System.NotImplementedException();
        }

        private static void AssignParamByUserName(IObjectDb objectDb, SearchPlayerByUserNameMetaModel searchParam)
        {
            objectDb.SetParameterValue("LicenseeId", searchParam.LicenseeId);
            objectDb.SetParameterValue("UserName", searchParam.UserName);
            objectDb.SetParameterValue("SearchOption", searchParam.SearchOption);
            objectDb.SetParameterValue("BaFilter", searchParam.BaFilter);
            objectDb.SetParameterValue("SpecialLevel", searchParam.SpecialLevel);
            objectDb.SetParameterValue("OddsGroups", searchParam.OddsGroup);
            objectDb.SetParameterValue("AgentList", searchParam.AgentListXml);
            objectDb.SetParameterValue("PageSize", searchParam.PageSize);
            objectDb.SetParameterValue("PageIndex", searchParam.PageIndex);

            objectDb.SetParameterValue("TotalRows", 0);
        }

        private static IEnumerable<Player> ReadPlayerList(IObjectDb objectDb)
        {
            var playerList = new List<Player>();

            using (var reader = objectDb.ExecuteReader())
            {
                while (reader.Read())
                {
                    playerList.Add(new Player
                    {
                        CustId = reader.ToInt("CustId"),
                        Currency = reader.ToString("Currency"),
                        SystemId = reader.ToString("UserName"),
                        UserName = reader.ToString("NickName"),
                        BaStatus = reader.ToBool("BAStatus"),
                        SpecialLevel = reader.ToInt("SpecialLevel"),
                        OddsGroup = reader.ToString("OddsGroup"),
                        CurrentBalance = reader.ToDecimal("TotalBalance"),
                        OutstandingBalance = reader.ToDecimal("Outstanding")
                    });
                }
            }

            return playerList;
        }
    }
}