using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using System.Collections.Generic;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerSuggestionService
    {
        IEnumerable<string> SearchUserNameList(PlayerSuggestionMetaModel metaModel);
    }
}