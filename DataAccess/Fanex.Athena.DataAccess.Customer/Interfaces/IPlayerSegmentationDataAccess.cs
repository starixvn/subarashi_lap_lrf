using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.MetaModel.PlayerSegmentation;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface IPlayerSegmentationDataAccess
    {
        Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel);

        Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel);

        Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel);

        Task<IDictionary<int, string>> GetReasonGroupListAsync(string langKey);

        Task<IEnumerable<CustomerClassModel>> GetCustomerClassInformation(GetCustomerClassInformationMetaModel metaModel);
    }
}
