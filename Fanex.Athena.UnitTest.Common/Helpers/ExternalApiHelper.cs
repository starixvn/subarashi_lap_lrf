using System.Collections.Generic;
using System.Web;
using System.Web.Http.Controllers;
using Fanex.Athena.Model.Auth;
using NSubstitute;

namespace Fanex.Athena.UnitTest.Common.Helpers
{
    public static class ExternalApiHelper
    {
        public const int DefaultLicenseeId = 1;
        public const int DefaultUserId = 2;
        public const string DefaultUserName = "test";
        public const string DefaultSiteName = "sitenametest";
        public const string DefaultLanguage = "en";
        public const string DefaultCurrencyIdList = "1";
        public static List<string> _subproduct = new List<string> { "SLT", "BTC" };

        public const string DefaultClientIp = "127.0.0.1";

        public static HttpActionContext CreateMockActionContext(IEnumerable<AuthCurrency> authCurrencyList = null)
        {
            return new HttpActionContext
            {
                ControllerContext = new HttpControllerContext(),
                ActionArguments =
                {
                    { "licenseeid", DefaultLicenseeId },
                    { "userid", DefaultUserId },
                    { "username", DefaultUserName },
                    { "sitename", DefaultSiteName },
                    { "currencyIDList", DefaultCurrencyIdList },
                    { "language", DefaultLanguage },
                    { "currencyAgentList", authCurrencyList ?? CreateAuthCurrencyList() },
                    { "subproduct", _subproduct }
                }
            };
        }

        public static HttpContextBase CreateHttpContext()
        {
            var httpRequest = Substitute.For<HttpRequestBase>();
            httpRequest.UserHostAddress.Returns(DefaultClientIp);

            var httpContext = Substitute.For<HttpContextBase>();
            httpContext.Request.Returns(httpRequest);

            return httpContext;
        }

        public static IEnumerable<AuthCurrency> CreateAuthCurrencyList()
        {
            return new AuthCurrency[]
            {
                new AuthCurrency
                {
                    CurrencyId = 1,
                    Currency = "USD",
                    AgentId = new int [] { 1,2 }
                }
            };
        }

        public static string CreateDefaultAgentListXml()
        {
            return "<ROOT><Agent AgentId=\"1\" Currency=\"1\"/><Agent AgentId=\"2\" Currency=\"1\"/></ROOT>";
        }
    }
}