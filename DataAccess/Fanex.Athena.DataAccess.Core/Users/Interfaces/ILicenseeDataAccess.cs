namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface ILicenseeDataAccess
    {
        bool IsLicenseeBelongToUser(int licenseeId, int userId);

        IList<Licensee> GetByUser(int userId);

        Licensee GetLicenseeByName(string licenseeName);

        int GetSpecialPlatformByName(string licenseeName);
    }
}