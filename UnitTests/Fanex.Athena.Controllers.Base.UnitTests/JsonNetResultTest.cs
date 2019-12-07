namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using System;
    using System.Web.Mvc;
    using System.Web.Routing;

    using NSubstitute;
    using NUnit.Framework;
    using Fanex.Athena.Controllers.Base;
    using System.Web;
    using System.Text;

    public class JsonNetResultTest
    {
        [Test]
        public void ExecuteResult_NullContext_ThrowsArgumentNullException()
        {
            // Arrange
            var jsonNetResult = CreateObject();

            // Action
            void testDelegate() => jsonNetResult.ExecuteResult(null);

            // Assert
            Assert.Throws<ArgumentNullException>(testDelegate);
        }

        [Test]
        public void ExecuteResult_DenyGet_ThrowsInvalidOperationException()
        {
            // Arrange
            var context = CreateContext("GET");
            var jsonNetResult = CreateObject();
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.DenyGet;

            // Action
            void testDelegate() => jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Throws<InvalidOperationException>(testDelegate);
        }

        [Test]
        public void ExecuteResult_DataIsNull_DoNotThing()
        {
            // Arrange
            var jsonNetResult = CreateObject();
            jsonNetResult.Data = null;
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            var context = CreateContext("POST");
            var response = Substitute.For<HttpResponseBase>();
            context.HttpContext.Response.Returns(response);

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.DidNotReceiveWithAnyArgs().Write(Arg.Any<string>());
            });
        }

        [Test]
        public void ExecuteResult_WhenCallWithContentType_UpdateResponseContentType()
        {
            // Arrange
            var jsonNetResult = CreateObject();
            jsonNetResult.Data = null;
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            jsonNetResult.ContentType = "Test";
            jsonNetResult.ContentEncoding = Encoding.Default;

            var context = CreateContext("POST");
            var response = Substitute.For<HttpResponseBase>();
            context.HttpContext.Response.Returns(response);

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(response.ContentType, Is.EqualTo(jsonNetResult.ContentType));
                Assert.That(response.ContentEncoding, Is.EqualTo(jsonNetResult.ContentEncoding));
            });
        }

        [Test]
        public void ExecuteResult_WhenCallWithJsonString_WriteJsonStringToResponse()
        {
            // Arrange
            var jsonString = "{}";

            var jsonNetResult = CreateObject(jsonString);
            jsonNetResult.Data = null;
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            var context = CreateContext("POST");
            var response = Substitute.For<HttpResponseBase>();
            context.HttpContext.Response.Returns(response);

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.Received(1).Write(jsonString);
            });
        }

        [Test]
        public void ExecuteResult_WhenCallWithData_WriteDataToResponse()
        {
            // Arrange
            var jsonNetResult = CreateObject();
            jsonNetResult.Data = new { Id = 1 };
            jsonNetResult.JsonRequestBehavior = JsonRequestBehavior.AllowGet;

            var context = CreateContext("POST");
            var response = Substitute.For<HttpResponseBase>();
            context.HttpContext.Response.Returns(response);

            // Action
            jsonNetResult.ExecuteResult(context);

            // Assert
            Assert.Multiple(() =>
            {
                response.Received(1).Write("{\"id\":1}");
            });
        }

        private JsonNetResult CreateObject(string jsonString = null)
        {
            if (jsonString == null)
            {
                return new JsonNetResult();
            }

            return new JsonNetResult(jsonString);
        }

        private ControllerContext CreateContext(string httpMethod)
        {
            var request = Substitute.For<HttpRequestBase>();
            request.HttpMethod.Returns(httpMethod);

            var mockHttpContext = Substitute.For<HttpContextBase>();
            mockHttpContext.Request.Returns(request);

            return new ControllerContext(mockHttpContext, new RouteData(), Substitute.For<ControllerBase>());
        }
    }
}