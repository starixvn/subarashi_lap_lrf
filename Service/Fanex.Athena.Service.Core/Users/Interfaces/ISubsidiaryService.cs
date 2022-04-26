namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Report.DTO;
    using System.Collections.Generic;

    public interface ISubsidiaryService
    {
        bool IsIgnoredSubsidiarySearch(bool subsidiarySearch, string subsidiaryList, UserAuthInfo userInfo);

        IEnumerable<CheckedItem> GetSubsidiaryTree(UserAuthInfo user, string licenseeName, bool ignoreViewType = false);

        IEnumerable<CheckedItem> GetWhiteLabelTree(UserAuthInfo user, string licenseeName);

        IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName, string subsidiaryNames, bool isExcludeTest = false, int currencyId = 0);

        IDictionary<int, int[]> GetCurrencyAgentList(string siteName, IDictionary<int, int[]> agentList, string subsidiaryList);

        IEnumerable<Subsidiary> GetSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList);

        IEnumerable<GroupSubsidiary> GetGroupSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList, string whiteLabelList);
    }
}