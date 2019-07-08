using System.Collections.Specialized;

namespace Fanex.Athena.Extension.Helper
{
    public static class ClientRequestHelper
    {
        public static string GetClientIP(NameValueCollection serverVariables)
        {
            var clientIP = serverVariables["HTTP_X_FORWARDED_FOR"]
                ?? serverVariables["REMOTE_ADDR"]
                ?? string.Empty;

            return string.IsNullOrEmpty(clientIP) || clientIP.Equals("::1")
                ? "127.0.0.1"
                : clientIP;
        }
    }
}