using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.Abstraction;
using Fanex.Athena.Service.StatelessCore.CustomException;
using Fanex.Athena.ServiceStatelessCore.UnitTests.MockHelper;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests.Abstraction
{
    [TestFixture]
    public class BaseApiClientTest
    {
        private const string Language = "en-US";
        private const string ApiUrl = "/api/Report/Action";
        private readonly Uri BaseAddress = new Uri("http://localhost:80");


        [TestCase(MediaType.Json, "application/json")]
        [TestCase(MediaType.MsgPack, "application/x-msgpack")]
        public async Task HandleAsync_WhenCall_HttpRequestParamIsPassedCorrectly(MediaType mediaType,
            string expectedContentType)
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
            var apiClient = new BaseApiClientTestable(client);
            var content = new
            {
                Currency = 1,
                UserName = "Test"
            };

            // Action
            await apiClient.InvokeHandleAsync<HttpResponseMessage>(ApiUrl, content, Language,
                mediaType, (x) => Task.FromResult(x), false);

            // Assert
            Assert.That(passedRequest.Headers.GetValues("Language").ElementAt(0), Is.EqualTo(Language));
            Assert.That(passedRequest.Headers.GetValues("Accept").ElementAt(0), Is.EqualTo(expectedContentType));
            Assert.That(passedRequest.Content, Is.Not.Null);
        }



        [Test]
        public void HandleAsync_UnSuccessful_ThrowException()
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
            var apiClient = new BaseApiClientTestable(client);

            // Action
            AsyncTestDelegate testDelegate = async () =>

           await apiClient.InvokeHandleAsync<HttpResponseMessage>(ApiUrl, null, Language,
                MediaType.Json, (x) => Task.FromResult(x), false);

            // Assert
            Assert.ThrowsAsync<ServiceException>(testDelegate);
        }

        [Test]
        public void HandleAsync_WhenCall_DisposeResponse()
        {
            // Arrange


            // Action

            // Assert
        }

        [Test]
        public void HandleAsync_WhenCall_NotDisposeResponse()
        {
            // Arrange


            // Action

            // Assert
        }
    }
}
