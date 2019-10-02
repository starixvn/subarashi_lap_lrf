using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Service.StatelessCore;
using Fanex.Athena.Service.StatelessCore.CustomException;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Newtonsoft.Json;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using NUnit.Framework;
using RestSharp;

namespace Fanex.Athena.ServiceStatelessCore.UnitTests
{
    public class BetListApiClientTest
    {
        private IAppSettings _appSettings;
        private IRestClient _restClient;
        private IRestResponse _restResponse;
        const string Token = "ANYTOKEN";
        const string APIURL = "http://localhost";
        const string TestPath = "/ANYPATH";
        const string Result = "ANYRESULT";

        private const string KEYNAME = "BETLIST_TOKEN_KEY";

        private const string LANGUAGEKEY = "Language";
        private IBetListApiClient _betListApiClient;
        private readonly object TestValue = new { Name = "Alex", Code = 1 };
        private string LANG = "vi-VN";
        private Uri actualBaseUrl;
        private int actualTimeOut;
        [SetUp]
        public void SetUp()
        {
            _restResponse = Substitute.For<IRestResponse>();
            _restResponse.ResponseStatus = ResponseStatus.Completed;
            _restResponse.StatusCode = HttpStatusCode.OK;
            _appSettings = Substitute.For<IAppSettings>();
            _appSettings.GetValue("BetListApiTokenValue").Returns(Token);
            _appSettings.BetListApiHostUrl.Returns(APIURL);
            _restClient = Substitute.For<IRestClient>();
            _restClient.BaseUrl = Arg.Do<Uri>(x => actualBaseUrl = x);
            _restClient.Timeout = Arg.Do<int>(x => actualTimeOut = x);
            _betListApiClient = new BetListApiClient(_appSettings, _restClient);
        }
        [TearDown]
        public void TearDown()
        {
            _appSettings = null;
            _restClient.ClearReceivedCalls();
            _restClient.ClearHandlers();
            _restClient = null;
            _betListApiClient = null;
            _restResponse = null;
        }
        [TestCase(0)]
        [TestCase(2)]
        public async Task HandleAsync_WhenCall_SetCorrectRequestInfoAsync(int timeOut)
        {
            //Arrange
            IRestRequest restRequest = null;
            _restClient.ExecuteTaskAsync(Arg.Do<IRestRequest>(x => restRequest = x))
               .Returns(_restResponse);
            //Action
            var result = await _betListApiClient.PostAsyncString(TestPath, TestValue, LANG, timeOut).ConfigureAwait(false);

            //Assert

            await _restClient.Received(1).ExecuteTaskAsync(Arg.Any<IRestRequest>());
            Assert.AreEqual(actualTimeOut, 60000 * timeOut);
            Assert.AreEqual(actualBaseUrl, new Uri(APIURL));
            Assert.IsNotNull(restRequest);
            Assert.AreEqual(restRequest.Method, Method.POST);
            var header = restRequest.Parameters.FirstOrDefault(x => x.Name == KEYNAME && x.Value.Equals(Token));
            Assert.NotNull(header);
            var language = restRequest.Parameters.FirstOrDefault(x => x.Name == LANGUAGEKEY && x.Value.Equals(LANG));
            Assert.NotNull(language);
            var data = restRequest.Parameters.FirstOrDefault(x => x.Type == ParameterType.RequestBody);
            Assert.NotNull(data);
            Assert.AreEqual(data.Value, JsonConvert.SerializeObject(TestValue));
            Assert.AreEqual(data.Name, "application/json");

        }

        [TestCase(ResponseStatus.Completed)]
        [TestCase(ResponseStatus.Error)]
        public void HandleAsync_WhenErrorWithAPI_ThrowException(ResponseStatus status)
        {
            //Arrange
            _restResponse = Substitute.For<IRestResponse>();
            _restResponse.ResponseStatus = status;
            _restResponse.StatusCode = HttpStatusCode.BadGateway;
            _restClient.ExecuteTaskAsync(Arg.Any<RestRequest>())
                .Returns(_restResponse);

            //Action
            var result = Assert.CatchAsync<ServiceException>(async () =>
              await _betListApiClient.PostAsyncString(TestPath, TestValue, LANG, 0).ConfigureAwait(false));

            //Assert

            StringAssert.Contains("Error occur when query betlist data", result.Message);
            StringAssert.Contains("HTTP status code", result.Message);

        }


        [Test]
        public async Task PostAsync_WhenCall_ReturnCorrecResultAsync()
        {
            //Arrange
            const string contentType = "application/json";
            _restResponse = Substitute.For<IRestResponse>();
            _restResponse.ResponseStatus = ResponseStatus.Completed;
            _restResponse.StatusCode = HttpStatusCode.OK;
            _restResponse.RawBytes = Encoding.UTF8.GetBytes(Result);
            _restResponse.ContentType = contentType;
            _restClient.ExecuteTaskAsync(Arg.Any<RestRequest>())
                .Returns(_restResponse);

            //Action
            var result =
              await _betListApiClient.PostAsync(TestPath, TestValue, LANG, 0).ConfigureAwait(false);

            //Assert
            Assert.IsTrue(result is HttpResponseMessage);
            var actualContent = await result.Content.ReadAsStringAsync();
            StringAssert.AreEqualIgnoringCase(Result, actualContent);
            var actualContentType = result.Content.Headers.ContentType.Parameters.Where(x => x.Value == contentType);
            Assert.NotNull(actualContentType);

        }

        [Test]
        public async Task PostAsync_WithGenericType_ReturnCorrecResultAsync()
        {
            //Arrange
            _restResponse = Substitute.For<IRestResponse>();
            _restResponse.ResponseStatus = ResponseStatus.Completed;
            _restResponse.StatusCode = HttpStatusCode.OK;
            _restResponse.Content = JsonConvert.SerializeObject(TestValue);
            _restResponse.ContentType = "application/json";
            _restClient.ExecuteTaskAsync(Arg.Any<RestRequest>())
                .Returns(_restResponse);

            //Action
            var result =
              await _betListApiClient.PostAsync<dynamic>(TestPath, TestValue, LANG, 0).ConfigureAwait(false);

            //Assert
            Assert.AreEqual(JsonConvert.SerializeObject(TestValue), JsonConvert.SerializeObject(result));

        }

        [Test]
        public async Task PostAsyncStream_WhenCall_ReturnCorrecResultAsync()
        {
            //Arrange
            const string contentType = "application/json";
            _restResponse = Substitute.For<IRestResponse>();
            _restResponse.ResponseStatus = ResponseStatus.Completed;
            _restResponse.StatusCode = HttpStatusCode.OK;
            _restResponse.RawBytes = Encoding.UTF8.GetBytes(Result);
            _restResponse.ContentType = contentType;
            _restClient.ExecuteTaskAsync(Arg.Any<RestRequest>())
                .Returns(_restResponse);

            //Action
            var result =
              await _betListApiClient.PostAsyncStream(TestPath, TestValue, LANG, 0).ConfigureAwait(false);

            //Assert
            Assert.IsTrue(result is Stream);
            using (var reader = new StreamReader(result))
            {
                var actualContent = await reader.ReadToEndAsync();
                Assert.AreEqual(Result, actualContent);
            }


        }
    }
}

