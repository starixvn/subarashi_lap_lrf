using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Criteria.PlayerBatchUpdate;

namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    public interface IPlayerBatchUpdateRepository
    {
        Task<IResultInfo> Update(BasePlayerBatchUpdateCriteria criteria);
        Task<IResultInfo> UpdateBAStatus(UpdateBAStatusCriteria criteria);
        Task<Dictionary<string, string>> GetOldValues(List<int> custIds, int type);
    }
}
