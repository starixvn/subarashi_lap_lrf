namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IAGCasinoBetLimitService
    {
        Task<IList<AgCasinoGame>> GetGroupBettingsAsync(string siteName, int currency);

        Task<AgCasinoBetSetting> GetBetSettingAsync(int custId);

        Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel);
    }
}
