namespace Fanex.Athena.DataAccess.Core.Users.Interfaces
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DTO.Common;

    public interface ILicenseeDataAccess
    {
        IResultInfo<bool> IsAllowUpdateMemberBAStatus(string language, int licenseeId);

        IResultInfo<bool> IsAllowUpdateMemberBAStatus(Request request, int licenseeId);

        bool IsLicenseeBelongToUser(int licenseeId, int userId);

        IList<Licensee> GetByUser(int userId);

        Licensee GetLicenseeByName(string licenseeName);
    }
}
