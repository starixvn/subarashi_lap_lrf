using System.Collections.Generic;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.ViewModels;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Services.Interfaces
{
    public interface IPlayerSubsidiaryService
    {
        IEnumerable<SubsidiaryViewModel> GetSubsidiaries(GetSubsidiariesMetaModel param);

        SubsidiaryViewType GetSubsidiaryViewType(GetSubsidiaryViewTypeMetaModel param);

        IDictionary<int, int[]> GetCurrencyAgentList(GetSubsidiariesMetaModel param, string subsidiaries);
    }
}
