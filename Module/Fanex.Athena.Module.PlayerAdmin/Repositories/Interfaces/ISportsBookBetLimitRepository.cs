namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface ISportsBookBetLimitRepository
    {
        Task<IEnumerable<PlayerBetLimit>> GetSettingAsync(int custId, bool isShowMixedSport);

        Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<IEnumerable<PlayerBetLimitMetaModel>> metaModel, bool isShowMixedSport);
    }
}
