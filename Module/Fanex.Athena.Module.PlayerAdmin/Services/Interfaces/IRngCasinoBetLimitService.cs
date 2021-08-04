namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.BetSettings.MetaModel;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Module.PlayerAdmin.MetaModel;

    public interface IRngCasinoBetLimitService
    {
        Task<IResultInfo> UpdateStatusAsync(PlayerBetLimitProductStatusUpdateMetaModel metaModel, BetSettingCasinoStatusMetaModel param, bool isSyncCasino);
    }
}