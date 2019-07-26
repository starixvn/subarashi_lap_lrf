namespace Fanex.Athena.Service.Core.Users
{
    using System.Web;

    using Fanex.Athena.Model.Auth;

    using Interfaces;

    public class SessionStorage : ISessionStorage
    {
        private const string LicenseeSessionKey = "LicenseeSessionKey";

        private const string UserSessionKey = "UserSessionKey";
        private const string CaptchaCodeKey = "CaptchaCodeKey";

        public LicenseeAuthInfo LicenseeAuthInfo
        {
            get
            {
                var temp = HttpContext.Current.Session[LicenseeSessionKey];
                return temp as LicenseeAuthInfo;
            }
        }

        public UserAuthInfo UserAuthInfo
        {
            get
            {
                var temp = HttpContext.Current.Session[UserSessionKey];
                return temp as UserAuthInfo;
            }
        }

        public string CaptchaCode
        {
            get { return HttpContext.Current.Session[CaptchaCodeKey] as string; }
            set { HttpContext.Current.Session[CaptchaCodeKey] = value; }
        }

        public void AssignSessions(UserAuthInfo userAuthInfo, LicenseeAuthInfo licenseeAuthInfo)
        {
            HttpContext.Current.Session[UserSessionKey] = userAuthInfo;
            HttpContext.Current.Session[LicenseeSessionKey] = licenseeAuthInfo;
        }
    }
}