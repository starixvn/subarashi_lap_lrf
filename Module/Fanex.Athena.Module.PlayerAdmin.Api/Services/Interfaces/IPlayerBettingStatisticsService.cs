using Fanex.Athena.Module.PlayerAdmin.Api.DTO;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerBettingStatisticsService
    {
        PlayerBettingStatistics GetPlayerBettingStatistics(PlayerBettingStatisticsMetaModel metaModel);
    }
}