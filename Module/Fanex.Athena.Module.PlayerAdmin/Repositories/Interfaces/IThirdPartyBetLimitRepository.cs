namespace Fanex.Athena.Module.PlayerAdmin.Repositories.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IThirdPartyBetLimitRepository
    {
        Task<ThirdPartyBetSetting> GetBetSettingAsync(int custId, int productId);

        Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel);
    }
}