using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    public interface ISessionStorage
    {
        string CaptchaCode { get; set; }

        LicenseeAuthInfo LicenseeAuthInfo { get; }

        UserAuthInfo UserAuthInfo { get; }

        void AssignSessions(UserAuthInfo userAuthInfo, LicenseeAuthInfo licenseeAuthInfo);
    }
}