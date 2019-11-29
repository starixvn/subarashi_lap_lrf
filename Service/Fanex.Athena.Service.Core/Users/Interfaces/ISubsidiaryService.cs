namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Fanex.Athena.Model.Report.DTO;

    public interface ISubsidiaryService
    {
        IEnumerable<CheckedItem> GetSubsidiaryTree(UserAuthInfo user, string licenseeName);

        IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(UserAuthInfo user, string licenseeName, string subsidiaryNames, bool isExcludeTest = false, int currencyId = 0);

        IEnumerable<Subsidiary> GetSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList);

        IEnumerable<GroupSubsidiary> GetGroupSubsidiaryList(UserAuthInfo user, string licenseeName, string subsidiaryList, string whiteLabelList);
    }
}