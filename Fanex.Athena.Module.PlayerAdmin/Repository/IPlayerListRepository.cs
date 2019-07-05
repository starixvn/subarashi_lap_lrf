using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    public interface IPlayerListRepository
    {
        EntityResult<Player> SearchPlayerList(SearchPlayerByUserNameMetaModel searchParam);
    }
}
