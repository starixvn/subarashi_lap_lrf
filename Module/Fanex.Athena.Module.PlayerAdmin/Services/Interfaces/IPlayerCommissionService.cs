using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerCommissionService
    {
        IEnumerable<PlayerCommissionViewModel> GetAllCommGroups(BasePlayerCommissionUpdateQuery query);
        Task<IResultInfo> MultipleMoveGroup(MultipleMoveGroupQuery query);
        Task<IResultInfo> MultipleRemoveFromGroup(MultipleRemoveFromGroupQuery query);
        Task<IResultInfo> MultipleUpdateGroup(MultipleUpdateGroupQuery query);
        PlayerCommissionViewModel GetPlayerCommissionGroup(SingleMoveGroupQuery query);
    }
}
