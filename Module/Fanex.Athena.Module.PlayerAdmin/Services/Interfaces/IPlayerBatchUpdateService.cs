using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerBatchUpdate;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerBatchUpdateService
    {
        Task<IResultInfo> UpdateSpecialLevel(UpdateSpecialLevelQuery query);
        Task<IResultInfo> UpdateOddsGroup(UpdateOddsGroupQuery query);
        Task<IResultInfo> UpdateBAStatus(UpdateBAStatusQuery query);
    }
}
