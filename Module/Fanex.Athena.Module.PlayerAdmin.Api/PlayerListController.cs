using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Extension.External;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
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

        [HttpPost]
        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            var isValidCurrency = CurrencyValidator.IsValid(AllowedCurrencyIdList, searchParam.Currency);
            if (!isValidCurrency)
            {
                return new PlayerListResultViewModel();
            }

            AssignParam(searchParam);

            return _playerListService.Search(searchParam);
        }

        private void AssignParam(PlayerSearchingMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;
            searchParam.AgentListXml = BuildAgentListXml(searchParam.Currency?.Trim());
        }
    }
}