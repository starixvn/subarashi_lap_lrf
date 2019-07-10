using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repository.Interfaces
{
    public interface IPlayerBaStatusRepository
    {
        IResultInfo Update(BaStatusUpdatingMetaModel metaModel);
    }
}