namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.DTO;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IAGCasinoBetLimitRepository
    {
        Task<AgCasinoBetSetting> GetBetSettingAsync(int custId);

        Task<IResultInfo> UpdateSettingAsync(PlayerBetLimitUpdateMetaModel<AgCasinoBetLimitMetaModel> metaModel);
    }
}