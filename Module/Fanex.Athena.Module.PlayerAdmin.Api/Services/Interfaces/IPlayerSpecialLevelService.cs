using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerSpecialLevelService
    {
        ResultViewModel Update(SpecialLevelUpdatingMetaModel metaModel);
    }
}