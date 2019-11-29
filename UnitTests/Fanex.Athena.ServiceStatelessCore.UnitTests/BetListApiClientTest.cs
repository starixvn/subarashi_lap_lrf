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
        public async Task PostAsyncString_WhenCall_HttpRequestParamIsPassedCorrectly()
        {
            // Arrange
            HttpRequestMessage passedRequest = null;
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(Result)
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(x =>
            {
                passedRequest = x.ArgAt<HttpRequestMessage>(0);

                return httpResponse;
            });
            var client = new HttpClient(httpMessageHandler) { BaseAddress = new Uri(APIURL) };
            var betListApiClient = new BetListApiClient(client);

            // Action
            var result = await betListApiClient.PostStringAsync(TestPath, TestValue, LANG).ConfigureAwait(false);

            // Assert
            Assert.That(passedRequest.Headers.GetValues("Language").ElementAt(0), Is.EqualTo(LANG));
            Assert.That(passedRequest.Headers.GetValues("Accept").ElementAt(0), Is.EqualTo("application/json"));
            Assert.That(passedRequest.Content, Is.Not.Null);
            Assert.That(result, Is.EqualTo(Result));
        }

        [Test]
        public async Task PostAsyncString_WhenCall_ReturnCorrectByteArrayResult()
        {
            // Arrange
            var byteArrayContent = new byte[] { 1, 2, 3 };
            var httpResponse = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new ByteArrayContent(byteArrayContent)
            };
            var httpMessageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            httpMessageHandler.Send(Arg.Any<HttpRequestMessage>()).Returns(httpResponse);
            var client = new HttpClient(httpMessageHandler) { BaseAddress = new Uri(APIURL) };
            var betListApiClient = new BetListApiClient(client);

            // Action
            var result = await betListApiClient.PostStringAsync(TestPath, TestValue, LANG).ConfigureAwait(false);

            // Assert
            Assert.That(result.Length, Is.EqualTo(3));
            Assert.That(result[0], Is.EqualTo(byteArrayContent[0]));
            Assert.That(result[1], Is.EqualTo(byteArrayContent[1]));
            Assert.That(result[2], Is.EqualTo(byteArrayContent[2]));
        }

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
    }
}