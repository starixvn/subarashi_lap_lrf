using System.Web.Http.Controllers;

namespace Fanex.Athena.UnitTest.Common.Helpers
{
    public static class ExternalApiHelper
    {
        public static HttpActionContext CreateMockActionContext()
        {
            return new HttpActionContext
            {
                ControllerContext = new HttpControllerContext(),
                ActionArguments =
                {
                    { "licenseeid", 1 },
                    { "userid", 2 },
                    { "username", "test" },
                    { "sitename", "sitenametest" },
                    { "currencyIDList", "1" },
                    { "language", "en-US" }
                }
            };
        }
    }
}