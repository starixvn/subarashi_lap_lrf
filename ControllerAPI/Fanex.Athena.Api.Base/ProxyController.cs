namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Service.Core.Proxy;

    [ApiUMFilter]
    public class ProxyController : ApiController
    {
        private readonly IProxyService _proxyService;

        public ProxyController(IProxyService proxyService)
        {
            _proxyService = proxyService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> Health(string apiKey)
        {
            var result = await _proxyService.HealthCheck(apiKey).ConfigureAwait(false);
            return result;
        }

        [CLSCompliant(false)]
        [AcceptVerbs("Get", "Post")]
        //[ApiValidateAntiForgery]
        public async Task<HttpResponseMessage> Forward([FromUri] string apiKey, [FromUri] string apiUrl)
        {
            var result = await _proxyService.HandleRequest(apiKey, apiUrl).ConfigureAwait(false);
            return result;
        }

        [CLSCompliant(false)]
        [AcceptVerbs("Get")]
        public async Task<HttpResponseMessage> ReportViews()
        {
            const string ApiKey = "ReportClientApp";
            const string ApiUrl = "Home_Index";

            var result = await _proxyService.HandleRequest(ApiKey, ApiUrl).ConfigureAwait(false);

            return result;
        }
    }
}