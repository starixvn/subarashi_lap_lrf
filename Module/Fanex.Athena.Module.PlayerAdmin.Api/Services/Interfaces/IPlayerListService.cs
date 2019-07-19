using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerListService
    {
        PlayerListResultViewModel Search(PlayerSearchingMetaModel metaModel);

        PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel);
    }
}