using System.Web.Http;
using System.Web.Http.Cors;

namespace Fanex.Athena.Api.StatelessBase
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExternalApiBaseController : ApiController
    {
        public string UserName => (string)ActionContext.ActionArguments["username"];

        public string SiteName => (string)ActionContext.ActionArguments["sitename"];

        public string Language => (string)ActionContext.ActionArguments["language"];
    }
}