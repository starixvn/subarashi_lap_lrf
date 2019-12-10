using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.Api.StatelessBase
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExternalApiBaseController : ApiController
    {
        public string UserName => (string)ActionContext.ActionArguments["username"];

        public string SiteName => (string)ActionContext.ActionArguments["sitename"];

        public string Language => (string)ActionContext.ActionArguments["language"];

        public int UserId => (int)ActionContext.ActionArguments["userid"];

        public string CurrencyIDList => (string)ActionContext.ActionArguments["currencyIDList"];

        public IEnumerable<OneAuthCurrency> CurrencyAgentList => ActionContext.ActionArguments["currencyAgentList"] as IEnumerable<OneAuthCurrency>;
    }
}