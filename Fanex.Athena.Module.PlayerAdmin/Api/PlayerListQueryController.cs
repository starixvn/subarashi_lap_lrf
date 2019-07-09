using Fanex.Athena.Api.Base;
using Fanex.Athena.Extension.External;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;
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
        public PlayerQueryResultViewModel Search(SearchPlayerByUserNameMetaModel searchParam)
        {
            var isValidCurrency = CurrencyValidator.IsValid(AllowedCurrencyIdList, searchParam.Currency);
            if (!isValidCurrency)
            {
                return new PlayerQueryResultViewModel();
            }

            AssignSearchByUserNameParam(searchParam);

            return _playerListService.SearchPlayerByUserName(searchParam);
        }

        private void AssignSearchByUserNameParam(SearchPlayerByUserNameMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;
            searchParam.AgentListXml = BuildAgentListXml(searchParam.Currency?.Trim());
        }
    }
}