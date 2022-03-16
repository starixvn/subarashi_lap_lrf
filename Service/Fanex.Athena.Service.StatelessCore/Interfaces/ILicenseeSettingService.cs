using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.DTO.Configuration;
using System.Collections.Generic;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ILicenseeSettingService
    {
        bool IsFakeLicensee(string licenseeName);

        bool IsEnableSingleWallet(string licenseeName);

        bool IsAuthorizedOnBetList(string licenseeName);

        FakeLicenseeSetting GetFakeLicenseeSetting(string licenseeName);

        Licensee GetLicenseeInfo(string licenseeName);

        IEnumerable<string> GetOddGroups(string licenseeName);
    }
}