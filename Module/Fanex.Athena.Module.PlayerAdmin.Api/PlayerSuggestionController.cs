using Fanex.Athena.Api.StatelessBase;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces;
using System.Collections.Generic;
using System.Web.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api
{
    public class PlayerSuggestionController : ExternalApiBaseController
    {
        private readonly IPlayerSuggestionService _playerSuggestionService;

        public PlayerSuggestionController(IPlayerSuggestionService playerSuggestionService)
        {
            _playerSuggestionService = playerSuggestionService;
        }

        [HttpGet]
        public IEnumerable<string> SearchUserNameList([FromUri]PlayerSuggestionMetaModel metaModel)
        {
            if (string.IsNullOrWhiteSpace(metaModel.UserName))
            {
                return new List<string>();
            }

            metaModel.AgentList = BuildAgentListXml(string.Empty);

            return _playerSuggestionService.SearchUserNameList(metaModel);
        }
    }
}