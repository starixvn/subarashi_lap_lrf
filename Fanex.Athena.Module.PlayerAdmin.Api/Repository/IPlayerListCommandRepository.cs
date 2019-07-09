using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository
{
    public interface IPlayerListCommandRepository
    {
        IResultInfo UpdateBaStatus(UpdateBaStatusMetaModel metaModel);

        IResultInfo UpdateOddsGroup(UpdateOddsGroupMetaModel metaModel);

        IResultInfo UpdateSpecialLevel(UpdateSpecialLevelMetaModel metaModel);
    }
}