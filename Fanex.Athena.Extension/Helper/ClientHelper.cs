using System.Net.Http;
using System.Web;

namespace Fanex.Athena.Extension.Helper
{
    public static class ClientHelper
    {
        private const string HttpContext = "MS_HttpContext";

        public static string GetClientIp(HttpRequestMessage request)
        {
            if (request.Properties.ContainsKey(HttpContext))
            {
                dynamic context = request.Properties[HttpContext];
                if (context != null)
                {
                    return context.Request.UserHostAddress;
                }
            }

            return string.Empty;
        }

        public static string GetClientIp(HttpContextBase httpContext)
        {
            var ip =
                httpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (string.IsNullOrEmpty(ip))
            {
                ip = httpContext.Request.ServerVariables["REMOTE_ADDR"];
            }

            return ip;
        }
    }
}