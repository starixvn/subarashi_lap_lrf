using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerCommission;
using Fanex.Athena.Module.PlayerAdmin.ViewModels.PlayerCommission;

namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    public interface IPlayerCommissionRepository
    {
        IEnumerable<PlayerCommissionViewModel> GetAllCommGroups(GetAllCommGroupsCriteria criteria);

        PlayerCommissionViewModel GetCommissionGroupById(GetCommissionGroupByIdCriteria criteria);

        Task<IResultInfo> MultipleMoveGroup(MultipleMoveGroupCriteria criteria);

        Task<IResultInfo> MultipleRemoveFromGroup(MultipleRemoveFromGroupCriteria criteria);

        Task<IResultInfo> MultipleUpdateGroup(MultipleUpdateGroupCriteria criteria);

        PlayerCommissionViewModel GetPlayerCommissionGroup(GetPlayerCommissionGroupCriteria criteria);
    }
}
