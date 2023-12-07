namespace Fanex.Athena.Service.Core.Proxy
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web;

    public interface IProxyService
    {
        Task<HttpResponseMessage> HandleRequest(string apiKey, string apiUrl, HttpRequest originalRequest);

        Task<HttpResponseMessage> HandleRequest(string apiKey, string apiUrl);

        Task<HttpResponseMessage> HealthCheck(string apiKey);
    }
}