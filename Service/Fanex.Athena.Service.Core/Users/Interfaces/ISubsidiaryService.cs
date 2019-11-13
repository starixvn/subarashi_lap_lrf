namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Report.DTO;

    public interface ISubsidiaryService
    {
        IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(int? whitteLabelId);
        IEnumerable<Subsidiary> GetSubsidiaryList();

        IDictionary<int, IEnumerable<int>> GetCurrencyAgentList(string subsidiaryNames, bool isExcludeTest = false, int currencyId = 0);
    }
}