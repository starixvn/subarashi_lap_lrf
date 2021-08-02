namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.DTO;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IThirdPartyBetLimitService
    {
        Task<ThirdPartyBetSetting> GetBetSettingAsync(int custId, int productId);

        Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel);
    }
}