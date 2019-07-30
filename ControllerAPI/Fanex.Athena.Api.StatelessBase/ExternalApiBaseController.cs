using Fanex.Athena.Model.Auth;
using System;
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

        /// <summary>
        /// will be remove soon
        /// </summary>
        [Obsolete]
        public int LicenseeId => (int)ActionContext.ActionArguments["licenseeid"];

        public int UserId => (int)ActionContext.ActionArguments["userid"];

        public string CurrencyIDList => (string)ActionContext.ActionArguments["currencyIDList"];

        public OneAuthCurrency[] CurrencyAgentList => ActionContext.ActionArguments["currencyAgentList"] as OneAuthCurrency[];
    }
}