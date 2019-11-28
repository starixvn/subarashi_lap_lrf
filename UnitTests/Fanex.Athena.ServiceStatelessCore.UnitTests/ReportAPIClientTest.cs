using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.ServiceStatelessCore.UnitTests.MockHelper;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class ReportAPIClientTest
    {
        private const string Language = "en-US";
        private const string ApiUrl = "/api/Report/Action";
        private readonly Uri BaseAddress = new Uri("http://localhost:80");

        [Test]
        public async Task PostAsyncString_WhenCall_HttpRequestParamIsPassedCorrectly()
        {
            // Arrange
            HttpRequestMessage passedRequest = null;
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(string.Empty)
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(x =>
            {
                passedRequest = x.ArgAt<HttpRequestMessage>(0);

                return httpResponse;
            });
            var client = new HttpClient(httpMessageHandler) { BaseAddress = BaseAddress };
            var reportApiClient = new ReportAPIClient(client);
            var content = new
            {
                Currency = 1,
                UserName = "Test"
            };

            // Action
            await reportApiClient.PostAsyncStringAsync(ApiUrl, content, Language);

            // Assert
            Assert.That(passedRequest.Headers.GetValues("Language").ElementAt(0), Is.EqualTo(Language));
            Assert.That(passedRequest.Headers.GetValues("Accept").ElementAt(0), Is.EqualTo("application/json"));
            Assert.That(passedRequest.Content, Is.Not.Null);
        }

        [Test]
        public async Task PostByteContentAsync_UseMessagePack_HttpRequestParamIsPassedCorrectly()
        {
            // Arrange
            HttpRequestMessage passedRequest = null;
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(string.Empty)
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(x =>
            {
                passedRequest = x.ArgAt<HttpRequestMessage>(0);

                return httpResponse;
            });
            var client = new HttpClient(httpMessageHandler) { BaseAddress = BaseAddress };
            var reportApiClient = new ReportAPIClient(client);
            var content = "param";

            // Action
            await reportApiClient.PostAsync(ApiUrl, content, Language, MediaType.MsgPack);

            // Assert
            Assert.That(passedRequest.Headers.GetValues("Language").ElementAt(0), Is.EqualTo(Language));
            Assert.That(passedRequest.Headers.GetValues("Accept").ElementAt(0), Is.EqualTo("application/x-msgpack"));
            Assert.That(passedRequest.Content.Headers.ContentType.MediaType, Is.EqualTo("application/x-msgpack"));
        }

        [Test]
        public void PostAsyncString_UnSuccessful_ThrowException()
        {
            // Arrange
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Content = new StringContent(string.Empty)
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(httpResponse);
            var client = new HttpClient(httpMessageHandler) { BaseAddress = BaseAddress };
            var reportApiClient = new ReportAPIClient(client);

            // Action
            AsyncTestDelegate testDelegate = async () => await reportApiClient.PostAsyncStringAsync(ApiUrl, null, Language);

            // Assert
            Assert.ThrowsAsync<HttpRequestException>(testDelegate);
        }
    }
}