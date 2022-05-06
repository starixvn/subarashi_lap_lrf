using Fanex.Athena.Service.Core.OAuth;
using Fanex.Athena.UnitTest.Common.Helpers;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Core.UnitTests.OAuth
{
    public class OAuthServiceTest
    {
        private OAuthOptions _options;
        private OAuthService _service;

        [SetUp]
        public void Setup()
        {
            _options = new OAuthOptions 
            {
                Host = "http://abc.com",
                TokenPath = "TokenPath",
                UserInfoPath = "UserInfoPath",
                RevocationPath = "RevocationPath",
                ClientId = "ClientId",
                ClientSecret = "ClientSecret",
                Scope = "scope1 scope2"
            };
        }

        [TearDown]
        public void TearDown()
        {
            _options = null;
            _service?.Dispose();
            _service = null;
        }

        [Test]
        public async Task RequestOAuthInfoAsync_RequestToken_IsError_SendParametersToIdentityServiceCorretcly()
        {
            // Arrange
            HttpRequestMessage passedRequest = null;

            var actualFormContent = string.Empty;
            var messageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            messageHandler.Send(Arg.Is<HttpRequestMessage>(_ => _.RequestUri.ToString() == $"{_options.Host}/{_options.TokenPath}")).Returns(_ =>
            {
                passedRequest = _.ArgAt<HttpRequestMessage>(0);
                actualFormContent = (passedRequest.Content as FormUrlEncodedContent).ReadAsStringAsync().Result;
                return new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(new
                    {
                        error = "error",
                        error_description = "error description"
                    }))
                };
            });

            _options.MessageHandler = messageHandler;

            var grantType = FakeHelper.Create<string>();
            var @params = new Dictionary<string, string>
            {
                {"test", "value" }
            };

            var expectedFormContent = $"test=value&Scope={_options.Scope.Replace(' ', '+')}&grant_type={grantType}&client_id={_options.ClientId}&client_secret={_options.ClientSecret}";

            _service = new OAuthService(_options);

            // Action
           
            var result = await _service.RequestOAuthInfoAsync(grantType, @params);

            // Assert
            Assert.AreEqual(expectedFormContent, actualFormContent);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("error description", result.ErrorMsg);
        }

        [Test]
        public async Task RequestOAuthInfoAsync_RequestUserInfo_SendParametersToIdentityServiceCorretcly()
        {
            // Arrange
            HttpRequestMessage passedUserInfoRequest = null;

            var messageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            messageHandler.Send(Arg.Is<HttpRequestMessage>(_ => _.RequestUri.ToString() == $"{_options.Host}/{_options.TokenPath}"))
                .Returns(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(new
                    {
                        access_token = "access token",
                        expires_in = 3600
                    }))
                });


            messageHandler.Send(Arg.Is<HttpRequestMessage>(_ => _.RequestUri.ToString() == $"{_options.Host}/{_options.UserInfoPath}"))
                .Returns(_ =>
                {
                    passedUserInfoRequest = _.ArgAt<HttpRequestMessage>(0);
                    return new HttpResponseMessage
                    {
                        StatusCode = HttpStatusCode.OK,
                        Content = new StringContent(JsonConvert.SerializeObject(new
                        {
                            Name = "calim value"
                        }))
                    };
                });

            _options.MessageHandler = messageHandler;

            _service = new OAuthService(_options);

            // Action

            var result = await _service.RequestOAuthInfoAsync(FakeHelper.Create<string>(), new Dictionary<string, string>());

            // Assert
            Assert.AreEqual("Bearer", passedUserInfoRequest.Headers.Authorization.Scheme);
            Assert.AreEqual("access token", passedUserInfoRequest.Headers.Authorization.Parameter);
            Assert.AreEqual("access token", result.AccessToken);
            Assert.AreEqual("calim value", result.IdentityName);
        }

        [Test]
        [TestCase(null)]
        [TestCase("")]
        public async Task RevokeAccessTokenAsync_AccessTokenIsNullOrEmpty_NoHandle(string accessToken)
        {
            // Arrange
            var messageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            messageHandler.Send(Arg.Is<HttpRequestMessage>(_ => _.RequestUri.ToString() == $"{_options.Host}/{_options.RevocationPath}")).Returns(_ =>
            {
                return new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(string.Empty)
                };
            });

            _options.MessageHandler = messageHandler;

            _service = new OAuthService(_options);

            // Action

            await _service.RevokeAccessTokenAsync(accessToken);

            // Assert
            messageHandler.DidNotReceive().Send(Arg.Any<HttpRequestMessage>());
        }

        [Test]
        public async Task RevokeAccessTokenAsync_AccessTokenIsNull_IsError1_SendParametersToIdentityServiceCorretcly()
        {
            // Arrange
            HttpRequestMessage passedRequest = null;

            var actualFormContent = string.Empty;
            var messageHandler = Substitute.ForPartsOf<MockHttpMessageHandler>();
            messageHandler.Send(Arg.Is<HttpRequestMessage>(_ => _.RequestUri.ToString() == $"{_options.Host}/{_options.RevocationPath}")).Returns(_ =>
            {
                passedRequest = _.ArgAt<HttpRequestMessage>(0);
                actualFormContent = (passedRequest.Content as FormUrlEncodedContent).ReadAsStringAsync().Result;
                return new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(new
                    {
                        error = "error",
                        error_description = "error description"
                    }))
                };
            });

            _options.MessageHandler = messageHandler;

            var accessToken = FakeHelper.Create<string>();

            var expectedFormContent = $"token={accessToken}&token_type_hint=access_token&client_id={_options.ClientId}&client_secret={_options.ClientSecret}";

            _service = new OAuthService(_options);

            // Action

            await _service.RevokeAccessTokenAsync(accessToken);

            // Assert
            Assert.AreEqual(expectedFormContent, actualFormContent);
        }
    }


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
