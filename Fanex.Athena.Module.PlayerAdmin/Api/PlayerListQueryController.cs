using Fanex.Athena.Api.Base;
using Fanex.Athena.Extension.External;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using System.Collections.Generic;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerListQueryController : ExternalApiBaseController
    {
        private readonly IPlayerListQueryService _playerListService;

        public PlayerListQueryController(IPlayerListQueryService playerListService)
        {
            _playerListService = playerListService;
        }

        [HttpPost]
        public EntityResult<Player> Search(SearchPlayerByUserNameMetaModel searchParam)
        {
            searchParam.Currency = searchParam.Currency?.Trim();
            var isValidCurrency = CurrencyValidator.IsValid(CurrencyIDList?.Trim(), searchParam.Currency);
            if (!isValidCurrency)
            {
                return new EntityResult<Player>();
            }

            AssignSearchByUserNameParam(searchParam);

            return CreateFakeResult();

            // return _playerListService.SearchPlayerByUserName(searchParam);
        }

        private void AssignSearchByUserNameParam(SearchPlayerByUserNameMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;
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