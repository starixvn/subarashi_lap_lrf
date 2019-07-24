using Fanex.Athena.Model.Core.DTO.Configuration;

namespace Fanex.Athena.Service.StatelessCore.Interfaces
{
    public interface ILicenseeSettingService
    {
        bool IsFakeLicensee(string licenseeName);

        bool IsAuthorizedOnBetList(string licenseeName);

        FakeLicenseeSetting GetFakeLicenseeSetting(string licenseeName);
    }
}