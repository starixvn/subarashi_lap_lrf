using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerListService
    {
        EntityResult<Player> SearchPlayer(SearchPlayerMetaModel searchParam);
    }
}