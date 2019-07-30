using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerListController : ExternalApiBaseController
    {
        private readonly IPlayerListService _playerListService;

        private readonly IAgentListBuilder _agentListBuilder;

        public PlayerListController(IPlayerListService playerListService, IAgentListBuilder agentListBuilder)
        {
            _playerListService = playerListService;
            _agentListBuilder = agentListBuilder;
        }

        [HttpPost]
        public PlayerListResultViewModel Search(PlayerSearchingMetaModel searchParam)
        {
            AssignParam(searchParam);

            return _playerListService.Search(searchParam);
        }

        [HttpPost]
        public PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel)
        {
            AssignParam(metaModel);

            return _playerListService.GetPlayerListById(metaModel);
        }

        private void AssignParam(PlayerListBaseMetaModel searchParam)
        {
            searchParam.LicenseeId = LicenseeId;
            searchParam.AgentListXml = _agentListBuilder.ToXml(CurrencyAgentList, searchParam.Currency?.Trim());
        }
    }
}