using System.Net.Http;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Utilities
{
    public static class ClientHelper
    {
        private const string HttpContext = "MS_HttpContext";
        private const string RemoteEndpointMessage = "System.ServiceModel.Channels.RemoteEndpointMessageProperty";

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