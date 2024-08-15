namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;
    using Fanex.Athena.Api.Base.Attributes;
    using Fanex.Athena.Api.StatelessBase.Utility;
    using Fanex.Athena.Service.Core.Proxy;
    using Fanex.Athena.Service.Core.Proxy.Interfaces;

    [ApiUMFilter]
    public class ProxyController : ApiController
    {
        private const string AccessDeniedPath = "~/Utility/AccessDenied";

        private readonly IProxyService _proxyService;

        private readonly IProxyViewService _proxyViewService;

        public ProxyController(IProxyService proxyService, IProxyViewService proxyViewService)
        {
            _proxyService = proxyService;
            _proxyViewService = proxyViewService;
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

        [HttpGet]
        [CLSCompliant(false)]
        public async Task<HttpResponseMessage> ReportViews([FromUri] string report, [FromUri] string url = "Index")
        {
            var success = _proxyViewService.PrepareViewRequest(report);

            if (!success)
            {
                return RequestHelper.HostRedirectResponse(AccessDeniedPath);
            }

            const string apiKey = "ReportClientApp";
            var apiUrl = $"{report}_{url}";
            var result = await _proxyService.HandleRequest(apiKey, apiUrl).ConfigureAwait(false);

            return result;
        }
    }
}
