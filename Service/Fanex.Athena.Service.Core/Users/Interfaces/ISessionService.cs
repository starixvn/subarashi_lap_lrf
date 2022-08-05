namespace Fanex.Athena.Service.Core.Users.Interfaces
{
    using Fanex.Athena.Model.Auth;
    using System.Collections.Specialized;

    public interface ISessionService
    {
        string CaptchaCode { get; set; }

        string SessionID { get; }

        string ClientIP { get; }

        string FromReferer { get; }

        NameValueCollection RequestHeaders { get; }

        LicenseeAuthInfo LicenseeSession { get; }

        UserAuthInfo UserSession { get; }

        void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession);

        void ClearSessions();
    }
}