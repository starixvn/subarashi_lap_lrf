namespace Fanex.Athena.Service.Core.Users
{
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System.Web;
    using System.Web.SessionState;

    public class SessionService : ISessionService
    {
        private const string LicenseeSessionKey = "LicenseeSessionKey";
        private const string UserSessionKey = "UserSessionKey";
        private const string CaptchaCodeKey = "CaptchaCodeKey";

        private static HttpSessionState CurrentSession => HttpContext.Current.Session;

        public LicenseeAuthInfo LicenseeSession => CurrentSession[LicenseeSessionKey] as LicenseeAuthInfo;

        public UserAuthInfo UserSession => CurrentSession[UserSessionKey] as UserAuthInfo;

        public string CaptchaCode
        {
            get { return CurrentSession[CaptchaCodeKey] as string; }
            set { CurrentSession[CaptchaCodeKey] = value; }
        }

        public void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            CurrentSession[UserSessionKey] = userSession;
            CurrentSession[LicenseeSessionKey] = licenseeSession;
        }
    }
}