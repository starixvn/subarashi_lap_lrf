namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.Enum;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IPlayerSegmentationService
    {
        Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel);

        Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel);

        Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel);

        Task<IDictionary<int, string>> GetReasonGroupListAsync(string langKey);

        bool IsNormalView(BasePlayerListMetaModel metaModel);

        PlayerSegmentationViewType GetViewType(bool anySubsidiary);

        Task<IEnumerable<string>> GetProblemAccCustomerClass();
        Task<IEnumerable<string>> GetCustomerClass();
    }
}
