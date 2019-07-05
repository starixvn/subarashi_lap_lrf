using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerListQueryService
    {
        EntityResult<Player> SearchPlayerByUserName(SearchPlayerByUserNameMetaModel searchParam);

        EntityResult<Player> SearchPlayerByIdList(SearchPlayerByIdListMetaModel searchParam);
    }
}