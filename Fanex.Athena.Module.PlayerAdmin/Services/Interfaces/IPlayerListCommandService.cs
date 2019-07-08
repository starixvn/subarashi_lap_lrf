using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Services.Interfaces
{
    public interface IPlayerListCommandService
    {
        IResultInfo UpdateBaStatus(UpdateBaStatusMetaModel metaModel);

        IResultInfo UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel);

        IResultInfo UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel);
    }
}