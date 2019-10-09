namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IDcsBetLinitRepository
    {
        Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, int productId);

        Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel);

        Task<bool> GetStatusAsync(int custId, int productId);
    }
}
