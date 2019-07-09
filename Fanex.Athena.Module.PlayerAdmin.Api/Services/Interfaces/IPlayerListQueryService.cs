using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerListQueryService
    {
        PlayerQueryResultViewModel SearchPlayerByUserName(SearchPlayerByUserNameMetaModel searchParam);
    }
}