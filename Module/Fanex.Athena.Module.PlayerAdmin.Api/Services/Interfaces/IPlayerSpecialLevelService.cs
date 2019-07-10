using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerSpecialLevelService
    {
        IResultInfo Update(SpecialLevelUpdatingMetaModel metaModel);
    }
}