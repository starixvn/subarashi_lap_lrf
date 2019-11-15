namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Report.DTO;

    public interface ISubsidiaryService
    {
        IEnumerable<GroupSubsidiary> GetGroupSubsidiariesByViewType(string licenseeName, int? whitteLabelId, UserAuthInfo user);

        IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(string licenseeName, int? whitteLabelId);

        IEnumerable<Subsidiary> GetAllSubsidiaries(string licenseeName, UserAuthInfo user);

        IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName, string subsidiaryNames, bool isExcludeTest = false, int currencyId = 0);
    }
}