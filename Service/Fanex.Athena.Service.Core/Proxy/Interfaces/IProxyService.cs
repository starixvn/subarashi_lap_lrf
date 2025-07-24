namespace Fanex.Athena.Service.Core.Proxy
{
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    public interface IProxyService
    {
        Task<HttpResponseMessage> HandleRequest(string apiKey, string apiUrl, CancellationToken cancellationToken = default);

        Task<HttpResponseMessage> HealthCheck(string apiKey);
    }
}