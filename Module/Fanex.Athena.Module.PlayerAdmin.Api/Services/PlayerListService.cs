using Fanex.Athena.Extension.Utility.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Data;
using System;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services
{
    public class PlayerListService : IPlayerListService
    {
        private readonly IDbFactory _dbFactory;

        public PlayerListService(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            const string SpKey = "Lrf_CustomerSelByUsername";
            var result = new PlayerListResultViewModel();

            using (var objectDb = _dbFactory.GetObjectDb(SpKey))
            {
                AssignParamByUserName(objectDb, searchParam);

                result.DataList = ReadPlayerList(objectDb);
                result.TotalItem = Convert.ToInt32(objectDb.GetParameterValue("TotalRows"));
            }

            return result;
        }

        private static void AssignParamByUserName(IObjectDb objectDb, PlayerSearchingMetaModel searchParam)
        {
            objectDb.SetParameterValue("LicenseeId", searchParam.LicenseeId);
            objectDb.SetParameterValue("UserName", searchParam.UserName);
            objectDb.SetParameterValue("SearchOption", searchParam.SearchOption);
            objectDb.SetParameterValue("BaFilter", searchParam.BaFilter);
            objectDb.SetParameterValue("SpecialLevel", searchParam.SpecialLevel);
            objectDb.SetParameterValue("OddsGroups", searchParam.OddsGroup);
            objectDb.SetParameterValue("PageSize", searchParam.PageSize);
            objectDb.SetParameterValue("PageIndex", searchParam.PageIndex);
            objectDb.SetParameterValue("AgentList", searchParam.AgentListXml);

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
                        CustId = Convert.ToInt32(reader["CustId"]),
                        Currency = reader["Currency"].ToString(),
                        SystemId = reader["UserName"].ToString(),
                        UserName = reader["NickName"].ToString(),
                        BaStatus = Convert.ToBoolean(reader["BAStatus"]),
                        SpecialLevel = Convert.ToInt32(reader["SpecialLevel"]),
                        OddsGroup = reader["OddsGroup"].ToString(),
                        CurrentBalance = Convert.ToDecimal(reader["TotalBalance"]),
                        OutstandingBalance = Convert.ToDecimal(reader["Outstanding"])
                    });
                }
            }

            return playerList;
        }
    }
}