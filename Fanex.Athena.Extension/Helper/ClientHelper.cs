using System.Net.Http;

namespace Fanex.Athena.Extension.Helper
{
    public static class ClientHelper
    {
        private const string HttpContext = "MS_HttpContext";

        public static string GetClientIpAddress(HttpRequestMessage request)
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
    }
}