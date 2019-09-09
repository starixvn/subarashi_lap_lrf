using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.DTO;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerWinLossService
    {
        IEnumerable<PlayerWinLoss> GetData(PlayerWinLossMetaModel metaModel);
    }
}