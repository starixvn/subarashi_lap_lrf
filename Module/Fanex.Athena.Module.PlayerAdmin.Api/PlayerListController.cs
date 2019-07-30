using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using Fanex.Athena.Service.StatelessCore.Utility;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    [ApiOneAuthorization]
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
            searchParam.AgentListXml = AuthParameterHelper.BuildAgentListXml(CurrencyAgentList, searchParam.Currency?.Trim());
        }
    }
}