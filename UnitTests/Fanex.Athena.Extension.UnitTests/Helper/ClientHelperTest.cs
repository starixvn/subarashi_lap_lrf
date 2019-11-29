using System.Collections;
using System.Net.Http;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.UnitTest.Common.Helpers;
using NUnit.Framework;

namespace Fanex.Athena.Extension.UnitTests.Helper
{
    public class ClientHelperTest
    {
        [TestCaseSource(typeof(TestingData), "TestCases")]
        public string GetClientIpAddress_WhenCall_ReturnCorrectData(string propertyKey, object propertyValue)
        {
            var request = new HttpRequestMessage();
            request.Properties[propertyKey] = propertyValue;

            return ClientHelper.GetClientIp(request);
        }
    }

    public class TestingData
    {
        public static IEnumerable TestCases
        {
            get
            {
                var httpContext = ExternalApiHelper.CreateHttpContext();

                yield return new TestCaseData("MS_HttpContext", httpContext).Returns(ExternalApiHelper.DefaultClientIp);
                yield return new TestCaseData("MS_HttpContext", null).Returns(string.Empty);
                yield return new TestCaseData(string.Empty, null).Returns(string.Empty);
            }
        }
    }
}