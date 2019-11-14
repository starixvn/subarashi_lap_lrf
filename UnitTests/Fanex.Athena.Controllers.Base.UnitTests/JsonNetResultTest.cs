namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using System;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using NSubstitute;
    using NUnit.Framework;
    using Fanex.Athena.Controllers.Base;
    using System.Web;

    public class JsonNetResultTest
    {

        [Test]
        public void ExecuteResult_NullContext_ThrowsArgumentNullException()
        {
            // Arrange
            var jsonNetResult = CreateObject();

            // Action
            var exception = Assert.Throws<ArgumentNullException>(() => jsonNetResult.ExecuteResult(null));

            // Assert
            StringAssert.Contains("context", exception.Message);
        }

        [Test]
        public void ExecuteResult_DenyGet_ThrowsInvalidOperationException()
        {
            // Arrange
            var request = Substitute.For<HttpRequestBase>();
            request.HttpMethod.Returns("GET");
            var mockHttpContext = Substitute.For<HttpContextBase>();
            mockHttpContext.Request.Returns(request);
            var context = new ControllerContext(mockHttpContext, new RouteData(), Substitute.For<ControllerBase>());
            var jsonNetResult = CreateObject();
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.DenyGet;

            // Action
            var exception = Assert.Throws<InvalidOperationException>(() => jsonNetResult.ExecuteResult(context));

            // Assert
            StringAssert.Contains("JSON GET is not allowed", exception.Message);
        }

        [Test]
        public void ExecuteResult_AllowGetAndNullDataAndNullJsonString_ThrowsInvalidOperationException()
        {
            // Arrange
            var request = Substitute.For<HttpRequestBase>();
            request.HttpMethod.Returns("POST");
            var mockHttpContext = Substitute.For<HttpContextBase>();
            mockHttpContext.Request.Returns(request);

            const string jsonString = null;
            var jsonNetResult = CreateObject(jsonString);
            jsonNetResult.Data = null;

            var response = Substitute.For<HttpResponseBase>();
            response.ContentType = string.IsNullOrEmpty(jsonNetResult.ContentType) ? "application/json" : jsonNetResult.ContentType;
            if (jsonNetResult.ContentEncoding != null)
            {
                response.ContentEncoding = jsonNetResult.ContentEncoding;
            }

            mockHttpContext.Response.Returns(response);

            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            var context = new ControllerContext(mockHttpContext, new RouteData(), Substitute.For<ControllerBase>());

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.Received(0).Write(jsonString);
            });
        }

        [Test]
        public void ExecuteResult_AllowGetNotNullJsonString_ThrowsInvalidOperationException()
        {
            // Arrange
            var request = Substitute.For<HttpRequestBase>();
            request.HttpMethod.Returns("POST");
            var mockHttpContext = Substitute.For<HttpContextBase>();
            mockHttpContext.Request.Returns(request);

            const string jsonString = "json string";
            var jsonNetResult = CreateObject(jsonString);

            var response = Substitute.For<HttpResponseBase>();
            response.ContentType = string.IsNullOrEmpty(jsonNetResult.ContentType) ? "application/json" : jsonNetResult.ContentType;
            if (jsonNetResult.ContentEncoding != null)
            {
                response.ContentEncoding = jsonNetResult.ContentEncoding;
            }

            mockHttpContext.Response.Returns(response);

            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            var context = new ControllerContext(mockHttpContext, new RouteData(), Substitute.For<ControllerBase>());

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.Received(1).Write(jsonString);
            });
        }

        [Test]
        public void ExecuteResult_AllowGetAndNotNullDataAndNullJsonString_ThrowsInvalidOperationException()
        {
            // Arrange
            var request = Substitute.For<HttpRequestBase>();
            request.HttpMethod.Returns("POST");
            var mockHttpContext = Substitute.For<HttpContextBase>();
            mockHttpContext.Request.Returns(request);

            const string jsonString = null;
            var jsonNetResult = CreateObject(jsonString);
            jsonNetResult.Data = new JsonResult();

            var scriptSerializer = JsonSerializer.Create(JsonNetResult.Settings);

            var sw = new StringWriter();
            scriptSerializer.Serialize(sw, jsonNetResult.Data);
            var writeString = sw.ToString();
            sw.Close();

            var response = Substitute.For<HttpResponseBase>();
            response.ContentType = string.IsNullOrEmpty(jsonNetResult.ContentType) ? "application/json" : jsonNetResult.ContentType;
            if (jsonNetResult.ContentEncoding != null)
            {
                response.ContentEncoding = jsonNetResult.ContentEncoding;
            }

            mockHttpContext.Response.Returns(response);

            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            var context = new ControllerContext(mockHttpContext, new RouteData(), Substitute.For<ControllerBase>());

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.Received(1).Write(writeString);
            });
        }

        private JsonNetResult CreateObject()
        {
            return new JsonNetResult();
        }

        private JsonNetResult CreateObject(string jsonString)
        {
            if (jsonString == null)
            {
                return new JsonNetResult();
            }

            return new JsonNetResult(jsonString);
        }
    }
}