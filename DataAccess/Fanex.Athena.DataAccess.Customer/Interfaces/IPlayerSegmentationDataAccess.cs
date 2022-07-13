using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface IPlayerSegmentationDataAccess
    {
        Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel);

        Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel);

        Task<(string ListAffectCustId, IEnumerable<UpdateStatusPlayerResult> ListUpdateStatusPlayerResult)> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel);

        Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey);
    }
}