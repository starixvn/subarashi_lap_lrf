using Fanex.Athena.Model.Core.ViewModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerOddsGroupService
    {
        ResultViewModel Update(OddsGroupUpdatingMetaModel metaModel);
    }
}