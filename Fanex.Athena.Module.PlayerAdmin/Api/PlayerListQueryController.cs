using Fanex.Athena.Api.Base;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.Core.Users.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerListQueryController : ExternalApiBaseController
    {
        private readonly IPlayerListQueryService _playerListService;
        private readonly ISessionService _sessionService;

        public PlayerListQueryController(ISessionService sessionService, IPlayerListQueryService playerListService)
        {
            _playerListService = playerListService;
            _sessionService = sessionService;
        }

        [HttpPost]
        public dynamic Search(SearchPlayerByUserNameMetaModel searchParam)
        {
            AssignSearchByUserNameParam(searchParam);

            return _playerListService.SearchPlayerByUserName(searchParam);
        }

        private void AssignSearchByUserNameParam(SearchPlayerByUserNameMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;

            var currencyListString = searchParam.Currency?.Trim();
            if (string.IsNullOrEmpty(currencyListString))
            {
                throw new ArgumentException(ViewResources.InvalidRequestMsg);
            }

            var currencyIdList = currencyListString.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(x => Convert.ToInt32(x));

            searchParam.AgentListXml = _sessionService.GenerateAgentListXml(currencyIdList);
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