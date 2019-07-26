using Fanex.Athena.Model.Auth;
using System.Web.Http.Controllers;

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

        public static HttpActionContext CreateMockActionContext(OneAuthCurrency[] authCurrencyList = null)
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
                    { "currencyAgentList", authCurrencyList ?? CreateAuthCurrencyList() }
                }
            };
        }

        public static OneAuthCurrency[] CreateAuthCurrencyList()
        {
            return new OneAuthCurrency[]
            {
                new OneAuthCurrency
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