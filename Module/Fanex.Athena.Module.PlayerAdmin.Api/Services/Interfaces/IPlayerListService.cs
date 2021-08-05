using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerListService
    {
        PlayerListResultViewModel Search(PlayerSearchingMetaModel metaModel);

        PlayerListResultViewModel GetPlayerListById(PlayerListByIdMetaModel metaModel);

        Task<IEnumerable<string>> CustomerClass();

        List<CommGroupViewModel> GetAllCommGroups(int licenseeId);
    }
}