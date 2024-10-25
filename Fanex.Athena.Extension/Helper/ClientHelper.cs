using System.Linq;
using System.Net.Http;
using System.Web;

namespace Fanex.Athena.Extension.Helper
{
    public static class ClientHelper
    {
        private const string HttpContext = "MS_HttpContext";

        public static string GetClientIp(HttpRequestMessage request)
        {
            bool hasForwardedFor = request.Headers.TryGetValues("X-Forwarded-For", out var forwardedForIps);
            string ip;
            if (hasForwardedFor && forwardedForIps.Any() && !string.IsNullOrEmpty((ip = forwardedForIps.FirstOrDefault()?.Split(',')[0].Trim())))
            {
                return ip;
            }

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

        public static string GetClientIp(HttpRequestBase requestBase)
        {
            var ip = requestBase.ServerVariables?["HTTP_X_FORWARDED_FOR"]?.Split(',').FirstOrDefault()?.Trim();

            if (string.IsNullOrEmpty(ip))
            {
                ip = requestBase.ServerVariables?["REMOTE_ADDR"];
            }

            return ip;
        }

        public static string GetClientIp(HttpContextBase httpContext)
            => GetClientIp(httpContext.Request);

        public static string GetClientIp(HttpRequest httpRequest)
        {
            var forwardedForHeader = httpRequest.Headers["X-Forwarded-For"];
            return forwardedForHeader?.Split(',').FirstOrDefault()?.Trim()
                ?? httpRequest.UserHostAddress ?? string.Empty;
        }
    }
}