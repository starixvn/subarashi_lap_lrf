namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;
    using Fanex.Athena.Model.Auth;
    using Fanex.Athena.Service.StatelessCore.Utility;

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ExternalApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var actionArguments = actionContext.ActionArguments;

            if (BindAgent)
            {
                MapAgent(actionArguments);
            }
        }

        private void MapAgent(IDictionary<string, object> actionArguments)
        {
            var rawCurrencyAgentList = (IEnumerable<AuthCurrency>)actionArguments["currencyAgentList"];

            var currencyAgentList = rawCurrencyAgentList.ToDictionary(_ => _.CurrencyId, _ => _.AgentId);

            AutoBindMetaModelService.MapAgentXml(actionArguments, currencyAgentList);
        }
    }
}