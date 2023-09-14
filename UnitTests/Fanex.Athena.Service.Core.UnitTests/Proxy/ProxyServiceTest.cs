using System;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using Fanex.Athena.Service.Core.Proxy;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.Service.Core.UnitTests.Proxy
{
    [TestFixture]
    public class ProxyServiceTest
    {
        private IProxyOptions _options;
        private ProxyService _service;

        [SetUp]
        public void Setup()
        {
            _options = Substitute.For<IProxyOptions>();
        }

        [TearDown]
        public void TearDown()
        {
            _options = null;
            _service?.Dispose();
            _service = null;
        }

        [Test]
        public async Task HandleRequest_MethodGet_ReturnHttpResponseMessageOK()
        {
            // Setup
            var messageHandler = new MockHttpMessageHandler("TEST VALUE", HttpStatusCode.OK);
            _options.MessageHandler = messageHandler;
            _service = new ProxyService(_options);

            // Arrange
            HttpContext.Current = GetHttpContext();
            Uri fakeUri = new Uri("https://localhost:4000/api/Test");
            _options.BuildRequestUri(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(fakeUri);

            // Action
            var result = await _service.HandleRequest("key", "url/home", HttpContext.Current.Request);

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [Test]
        public async Task HandleRequest_MethodGet_ReturnInternalServerError()
        {
            // Setup
            var messageHandler = new MockHttpMessageHandler("TEST VALUE", HttpStatusCode.InternalServerError);
            _options.MessageHandler = messageHandler;
            _service = new ProxyService(_options);

            // Arrange
            HttpContext.Current = GetHttpContext();
            Uri fakeUri = new Uri("https://localhost:4000/api/Test");
            _options.BuildRequestUri(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(fakeUri);

            // Action
            var result = await _service.HandleRequest("key", "url/home", HttpContext.Current.Request);

            // Assert
            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Test]
        public async Task HandleRequest_MethodGetFromController_ReturnInternalServerError()
        {
            // Setup
            var messageHandler = new MockHttpMessageHandler("TEST VALUE", HttpStatusCode.InternalServerError);
            _options.MessageHandler = messageHandler;
            _service = new ProxyService(_options);

            // Arrange
            HttpContext.Current = GetHttpContext();
            Uri fakeUri = new Uri("https://localhost:4000/api/Test");
            _options.BuildRequestUri(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(fakeUri);

            // Action
            var result = await _service.HandleRequest("key", "url/home");

            // Assert
            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Test]
        public async Task HealthCheck_MethodGetFromController_ReturnInternalServerError()
        {
            // Setup
            var messageHandler = new MockHttpMessageHandler("TEST VALUE", HttpStatusCode.InternalServerError);
            _options.MessageHandler = messageHandler;
            _service = new ProxyService(_options);

            // Arrange
            HttpContext.Current = GetHttpContext();
            Uri fakeUri = new Uri("https://localhost:4000/api/Test");
            _options.BuildRequestUri(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(fakeUri);

            // Action
            var result = await _service.HealthCheck("key");

            // Assert
            Assert.AreEqual(HttpStatusCode.InternalServerError, result.StatusCode);
        }

        [Test]
        public async Task HealthCheck_MethodGetFromController_ReturnInternalOK()
        {
            // Setup
            var messageHandler = new MockHttpMessageHandler("TEST VALUE", HttpStatusCode.OK);
            _options.MessageHandler = messageHandler;
            _service = new ProxyService(_options);

            // Arrange
            HttpContext.Current = GetHttpContext();
            Uri fakeUri = new Uri("https://localhost:4000/api/Test");
            _options.BuildRequestUri(Arg.Any<string>(), Arg.Any<string>(), Arg.Any<string>()).Returns(fakeUri);

            // Action
            var result = await _service.HealthCheck("key");

            // Assert
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        private static HttpContext GetHttpContext()
        {
            return new HttpContext(
                new HttpRequest(null, "http://home.test.com", null),
                new HttpResponse(null)
            );
        }

        public class MockHttpMessageHandler : HttpMessageHandler
        {
            private readonly string _response;
            private readonly HttpStatusCode _statusCode;

            public string Input { get; private set; }
            public int NumberOfCalls { get; private set; }

            public MockHttpMessageHandler(string response, HttpStatusCode statusCode)
            {
                _response = response;
                _statusCode = statusCode;
            }

            protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
                CancellationToken cancellationToken)
            {
                NumberOfCalls++;
                if (request.Content != null) // Could be a GET-request without a body
                {
                    Input = await request.Content.ReadAsStringAsync();
                }
                return new HttpResponseMessage
                {
                    StatusCode = _statusCode,
                    Content = new StringContent(_response)
                };
            }
        }
    }
}
