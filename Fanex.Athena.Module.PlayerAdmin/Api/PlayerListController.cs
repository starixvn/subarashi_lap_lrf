using Fanex.Athena.Api.Base;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using System.Collections.Generic;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerListController : ExternalApiBaseController
    {
        private readonly IPlayerListService _playerListService;

        public PlayerListController(IPlayerListService playerListService)
        {
            _playerListService = playerListService;
        }

        /**
         * search player list
         */

        [HttpPost]
        public dynamic Search(SearchPlayerMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;

            return _playerListService.SearchPlayer(searchParam);
        }

        private EntityResult<Player> CreateFakeResult()
        {
            var dataList = new List<Player>
            {
                new Player
                {
                    UserName = "qatest01",
                    SystemId = "qatestIN0194315",
                    Currency = "RMB",
                    CurrentBalance = 75.60m,
                    OutstandingBalance = 0m,
                    OddsGroup = "A",
                    BaStatus = true,
                    SpecialLevel = 1,
                    CustId = 1
                },
                new Player
                {
                    UserName = "qatest02",
                    SystemId = "qatestIN0208741",
                    Currency = "RMB",
                    CurrentBalance = 75.60m,
                    OutstandingBalance = 0m,
                    OddsGroup = "A",
                    BaStatus = false,
                    SpecialLevel = 2,
                    CustId = 2
                }
            };

            return new EntityResult<Player>
            {
                MainData = dataList,
                TotalItem = 2
            };
        }
    }
}