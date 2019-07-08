using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Repository
{
    public interface IPlayerListCommandRepository
    {
        IResultInfo UpdateBaStatus(UpdateBaStatusMetaModel metaModel);

        IResultInfo UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel);

        IResultInfo UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel);
    }
}