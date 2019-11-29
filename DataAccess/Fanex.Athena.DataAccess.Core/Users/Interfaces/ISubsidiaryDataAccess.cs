namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Users;
    using Model.Report.DTO;

    public interface ISubsidiaryDataAccess
    {
        IEnumerable<Subsidiary> GetSubsidiaryList(string licenseeName);
        IEnumerable<GroupSubsidiary> GetGroupSubsidiaries(string licenseeName);
    }
}