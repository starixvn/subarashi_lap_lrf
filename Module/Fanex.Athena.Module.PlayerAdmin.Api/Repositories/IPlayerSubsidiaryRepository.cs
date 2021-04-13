using System.Collections.Generic;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Repositories
{
    public interface IPlayerSubsidiaryRepository
    {
        IEnumerable<SubsidiaryViewModel> GetSubsidaryGroups(GetSubsidiariesMetaModel param);
        IEnumerable<SubsidiaryViewModel> GetSubsidiaries(GetSubsidiariesMetaModel param);
    }
}
