namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using Fanex.Athena.Model.Auth;

    public interface ISessionService
    {
        string CaptchaCode { get; set; }

        LicenseeAuthInfo LicenseeSession { get; }

        UserAuthInfo UserSession { get; }

        void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession);
    }
}