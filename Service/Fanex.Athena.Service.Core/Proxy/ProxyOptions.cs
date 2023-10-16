namespace Fanex.Athena.Service.Core.Proxy
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using System.Web;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    public class ProxyOptions : IProxyOptions
    {
        private const string RootUrlHeaderKey = "RootUrl";

        private static readonly IDictionary<string, string> ProxyApiHostMapper = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "Report", "Proxy_ReportApiHost" },
            { "BetList", "Proxy_BetListApiHost" }
        };

        private static readonly IDictionary<string, string> ProxyHealthCheckMapper = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "Report", "Proxy_ReportApiHealthCheck" },
            { "BetList", "Proxy_BetListApiHealthCheck" }
        };

        private static readonly ISessionService SessionService = new SessionService();

        public ProxyOptions(int requestTimeout)
        {
            PrepareRequest = (originalRequest, message) =>
            {
                message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", SessionService.UserSession.AccessToken);
                message.Headers.Add(RootUrlHeaderKey, HttpContext.Current.Request.ApplicationPath);
                return Task.CompletedTask;
            };

            Timeout = new TimeSpan(0, 0, requestTimeout);
        }

        public HttpMessageHandler MessageHandler { get; set; }

        public Func<HttpRequest, HttpRequestMessage, Task> PrepareRequest { get; set; }

        public Uri BuildRequestUri(string apiKey, string apiUrl, string query)
        {
            var realApiHost = BuildApiHost(apiKey);
            var realApiPath = BuildApiPath(apiUrl);

            var uri = new Uri($"{realApiHost}/{realApiPath}");
            var realUri = new UriBuilder(uri)
            {
                Query = query
            };

            return realUri.Uri;
        }

#pragma warning disable S3995 // URI return values should not be strings

        public string GetHealthCheckUrl(string apiKey)
#pragma warning restore S3995 // URI return values should not be strings
        {
            var settingKey = ProxyHealthCheckMapper.ContainsKey(apiKey) ? ProxyHealthCheckMapper[apiKey] : throw new Exception($"{apiKey} is invalid");
            return ConfigurationManager.AppSettings[settingKey] ?? throw new Exception($"{settingKey} doesn't exist");
        }

        private static string BuildApiHost(string apiKey)
        {
            var settingKey = ProxyApiHostMapper.ContainsKey(apiKey) ? ProxyApiHostMapper[apiKey] : throw new Exception($"{apiKey} is invalid");
            var apiHost = ConfigurationManager.AppSettings[settingKey] ?? throw new Exception($"{settingKey} doesn't exist");
            apiHost = apiHost.TrimEnd('/');
            return apiHost;
        }

        private static string BuildApiPath(string apiUrl)
        {
            var realPath = apiUrl.Replace('_', '/');
            realPath = realPath.TrimStart('/');
            return realPath;
        }

        public TimeSpan Timeout { get; set; }
    }
}