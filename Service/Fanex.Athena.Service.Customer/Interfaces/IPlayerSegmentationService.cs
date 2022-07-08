namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface IPlayerSegmentationService
    {
        Task<ApiPagingResult<PlayerInfo>> GetProblemPlayerListAsync(ProblemPlayerListMetaModel metaModel);

        Task<ApiPagingResult<PlayerInfo>> GetVipPlayerListAsync(VipPlayerListMetaModel metaModel);

        Task<IEnumerable<UpdateStatusPlayerResult>> UpdateVipStatusAsync(UpdateStatusPlayerMetaModel metaModel);

        Task<IEnumerable<ReasonGroup>> GetReasonGroupListAsync(string langKey);

        Task<ApiPagingResult<MonitoredPlayerInfo>> GetMonitoredPlayerListAsync(MonitoredPlayerListMetaModel metaModel);

        Task<IEnumerable<MonitoredPlayerReachedHistory>> GetMonitoredPlayerReachedHistoryAsync(MonitoredPlayerReachedHistoryMetaModel metaModel);

        Task<MonitoredPlayerCommand> InsertMonitoredPlayerAsync(InsertMonitoredPlayerMetaModel metaModel);

        Task<MonitoredPlayerCommand> UpdateMonitoredPlayerAsync(UpdateMonitoredPlayerMetaModel metaModel);

        Task<MonitoredPlayerCommand> DeleteMonitoredPlayerAsync(DeleteMonitoredPlayerMetaModel metaModel);

        Task<IEnumerable<MonitoredPlayerCommand>> BatchUpdateMonitoredPlayerAsync(BatchUpdateMonitoredPlayerMetaModel metaModel);

        bool IsNormalView(BasePlayerListMetaModel metaModel);
    }
}