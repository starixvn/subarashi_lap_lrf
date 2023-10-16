namespace Fanex.Athena.Service.Core.Proxy
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web;
    using Fanex.Athena.Service.StatelessCore.CustomException;

    public class ProxyService : IProxyService, IDisposable
    {
        private readonly IProxyOptions _options;
        private readonly HttpClient _client;

        public ProxyService(IProxyOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
            _client = new HttpClient(_options.MessageHandler ?? new HttpClientHandler { AllowAutoRedirect = false, UseCookies = false })
            {
                Timeout = Timeout.InfiniteTimeSpan
            };
        }

        public async Task<HttpResponseMessage> HandleRequest(string apiKey, string apiUrl, HttpRequest originalRequest)
        {
            var apiUri = _options.BuildRequestUri(apiKey, apiUrl, originalRequest.QueryString.ToString());
            using (var requestMessage = CreateHttpRequest(originalRequest, apiUri))
            {
                if (_options.PrepareRequest != null)
                {
                    await _options.PrepareRequest(originalRequest, requestMessage);
                }

                var responseMessage = null as HttpResponseMessage;
                var cancelToken = new CancellationTokenSource(_options.Timeout);

                try
                {
                    responseMessage = await SendHttpRequest(requestMessage, cancelToken.Token).ConfigureAwait(false);
                    return responseMessage;
                }
                catch (Exception ex)
                {
                    responseMessage?.Dispose();
                    throw new ProxyException(ex.Message, apiKey, apiUrl, apiUri.ToString(), ex);
                }
                finally
                {
                    cancelToken.Dispose();
                }
            }
        }

        public async Task<HttpResponseMessage> HandleStaticResourcesRequest(string apiKey, string apiUrl)
        {
            var originalRequest = HttpContext.Current.Request;
            var staticURL = _options.BuildRequestUri(apiKey, apiUrl, originalRequest.QueryString.ToString());
            using (var requestMessage = CreateHttpRequest(originalRequest, staticURL))
            {
                var responseMessage = null as HttpResponseMessage;
                var cancelToken = new CancellationTokenSource(_options.Timeout);

                try
                {
                    responseMessage = await SendHttpRequest(requestMessage, cancelToken.Token).ConfigureAwait(false);
                    return responseMessage;
                }
                catch (Exception ex)
                {
                    return new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.InternalServerError,
                        Content = new StringContent($"{ex.Message} - {ex.InnerException?.Message} - static url: {staticURL}")
                    };
                }
                finally
                {
                    cancelToken.Dispose();
                }
            }
        }

        public Task<HttpResponseMessage> HandleRequest(string apiKey, string apiUrl)
            => HandleRequest(apiKey, apiUrl, HttpContext.Current.Request);

        public async Task<HttpResponseMessage> HealthCheck(string apiKey)
        {
            var healthCheckUrl = _options.GetHealthCheckUrl(apiKey);
            var apiUri = _options.BuildRequestUri(apiKey, healthCheckUrl, string.Empty);

            using (var requestMessage = new HttpRequestMessage(HttpMethod.Get, apiUri))
            {
                var cancelToken = new CancellationTokenSource(_options.Timeout);
                try
                {
                    var responseMessage = await SendHttpRequest(requestMessage, cancelToken.Token).ConfigureAwait(false);
                    responseMessage.EnsureSuccessStatusCode();
                    return responseMessage;
                }
                catch (Exception ex)
                {
                    return new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.InternalServerError,
                        Content = new StringContent($"{ex.Message} - {ex.InnerException?.Message} - api: {apiUri}")
                    };
                }
                finally
                {
                    cancelToken.Dispose();
                }
            }
        }

        private static HttpRequestMessage CreateHttpRequest(HttpRequest originalRequest, Uri uri)
        {
            var requestMessage = new HttpRequestMessage();
            var requestMethod = originalRequest.HttpMethod;
            if (requestMethod != HttpMethod.Get.Method &&
                 requestMethod != HttpMethod.Head.Method &&
                 requestMethod != HttpMethod.Delete.Method &&
                 requestMethod != HttpMethod.Trace.Method)
            {
                var streamContent = new StreamContent(originalRequest.InputStream);
                requestMessage.Content = streamContent;
            }

            foreach (var headerKey in originalRequest.Headers.AllKeys)
            {
                var headerValue = originalRequest.Headers.GetValues(headerKey);
                if (!requestMessage.Headers.TryAddWithoutValidation(headerKey, headerValue) && requestMessage.Content != null)
                {
                    requestMessage.Content?.Headers.TryAddWithoutValidation(headerKey, headerValue);
                }
            }

            requestMessage.Headers.Host = uri.Authority;
            requestMessage.RequestUri = uri;
            requestMessage.Method = new HttpMethod(originalRequest.HttpMethod);

            return requestMessage;
        }

        private Task<HttpResponseMessage> SendHttpRequest(HttpRequestMessage requestMessage, CancellationToken cancellationToken)
        {
            if (requestMessage == null)
            {
                throw new ArgumentNullException(nameof(requestMessage));
            }

            return _client.SendAsync(requestMessage, cancellationToken);
        }

        ~ProxyService()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            _client?.Dispose();
        }
    }
}