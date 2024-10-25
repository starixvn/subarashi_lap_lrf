namespace Fanex.Athena.Service.Core.Users
{
    using System.Web;
    using System.Web.SessionState;
    using Fanex.Athena.Extension;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    public class SessionService : ISessionService
    {
        private const string LicenseeSessionKey = "LicenseeSessionKey";
        private const string UserSessionKey = "UserSessionKey";
        private const string CaptchaCodeKey = "CaptchaCodeKey";

        private static HttpContext CurrentContext => HttpContext.Current;

        private static HttpSessionState CurrentSession => CurrentContext.Session;

        public LicenseeAuthInfo LicenseeSession => CurrentSession[LicenseeSessionKey] as LicenseeAuthInfo;

        public UserAuthInfo UserSession => CurrentSession[UserSessionKey] as UserAuthInfo;

        public string CaptchaCode
        {
            get { return CurrentSession[CaptchaCodeKey] as string; }
            set { CurrentSession[CaptchaCodeKey] = value; }
        }

        public string SessionID => CurrentSession.SessionID;

        public string ClientIP => ClientHelper.GetClientIp(CurrentContext.Request);

        public string FromReferer => CurrentContext.Request.Headers["Referer"];

        public bool IsIgnoreSharding => CurrentContext?.IsIgnoreSharding() ?? false;

        public void AssignSessions(UserAuthInfo userSession, LicenseeAuthInfo licenseeSession)
        {
            CurrentSession[UserSessionKey] = userSession;
            CurrentSession[LicenseeSessionKey] = licenseeSession;
        }

        public void ClearSessions()
            => CurrentSession?.Clear();
    }
}