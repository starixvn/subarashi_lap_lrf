using Fanex.Athena.Module.PlayerAdmin.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerListQueryService
    {
        PlayerQueryResultViewModel SearchPlayerByUserName(SearchPlayerByUserNameMetaModel searchParam);
    }
}