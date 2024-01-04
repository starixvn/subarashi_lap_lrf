using System;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore.Abstraction;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.Abstraction
{
    public class BaseApiClientTestable : BaseApiClient
    {
        public BaseApiClientTestable(HttpClient httpClient) : base(httpClient)
        {
        }

        protected override string ApiName => "BaseApiClientTestable";

        public Task<T> InvokeHandleAsync<T>(string path, object value, string language, MediaType mediaType,
            Func<HttpResponseMessage, Task<T>> codeBlock,
            bool disposeHttpResponse = true, int timeOut = 100)
        {
            return HandleAsync<T>(path, value, language, mediaType, codeBlock, disposeHttpResponse, timeOut);
        }
    }
}