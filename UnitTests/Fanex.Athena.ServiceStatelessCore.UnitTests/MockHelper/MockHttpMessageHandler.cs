using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.MockHelper
{
    public abstract class MockHttpMessageHandler : HttpMessageHandler
    {
        public abstract HttpResponseMessage Send(HttpRequestMessage request);

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            return Task.FromResult(Send(request));
        }
    }
}