using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.ServiceStatelessCore.UnitTests.MockHelper;
using NSubstitute;
using NUnit.Framework;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    [TestFixture]
    public class BetListApiClientTest
    {
        private const string APIURL = "http://localhost";
        private const string TestPath = "/ANYPATH";
        private const string Result = "ANYRESULT";
        private readonly object TestValue = new { Name = "Alex", Code = 1 };
        private readonly string LANG = "vi-VN";

        [Test]
        public async Task PostAsync_WhenCall_ReturnCorrectResponse()
        {
            // Arrange
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StreamContent(new MemoryStream(new byte[] { 1 }))
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(httpResponse);
            var client = new HttpClient(httpMessageHandler) { BaseAddress = new Uri(APIURL) };
            var betListApiClient = new BetListApiClient(client);

            // Action
            var result = await betListApiClient.PostAsync(TestPath, TestValue, LANG).ConfigureAwait(false);

            // Assert
            Assert.That(result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }

        [Test]
        public async Task PostStreamAsync_WhenCall_ReturnCorrectResponse()
        {
            // Arrange
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StreamContent(new MemoryStream(new byte[] { 1 }))
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(httpResponse);
            var client = new HttpClient(httpMessageHandler) { BaseAddress = new Uri(APIURL) };
            var betListApiClient = new BetListApiClient(client);

            // Action
            var result = await betListApiClient.PostStreamAsync(TestPath, TestValue, LANG).ConfigureAwait(false);

            // Assert
            Assert.NotNull(result);
            Assert.That(result is Stream);
        }
    }
}