namespace Fanex.Athena.Extension.Utility
{
    using System.Web;
    using System.Web.Security;
    using Fanex.Athena.Extension.Helper;
    using Interfaces;

    public class FormsAuthenticationService : IFormsAuthenticationService
    {
        public void CreateFormAuth(string userName, bool createPersistentCookie)
        {
            var cache = HttpContext.Current.Response.Cache;
            cache.SetNoStore();
            cache.SetExpires(DateTimeHelper.Now.AddMinutes(-1));
            cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cookies.Remove(FormsAuthentication.FormsCookieName);
            FormsAuthentication.SetAuthCookie(userName, createPersistentCookie);
        }

        public void SignOut()
        {
            FormsAuthentication.SignOut();
        }
    }
}