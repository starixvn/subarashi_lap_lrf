using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class StatelessApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }

        public bool BindSiteName { get; set; }

        public bool BindLanguage { get; set; }

        public bool BindUserId { get; set; }

        public bool BindIp { get; set; }

        public bool BindBalanceUpAndMoveBetDay { get; set; }
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var actionArgument = actionContext.ActionArguments;
            if (BindAgent)
            {
                AutoBindMetaModelService.MapAgentXml(actionArgument);
            }
            if (BindSiteName)
            {
                AutoBindMetaModelService.MapSiteName(actionArgument);
            }
            if (BindLanguage)
            {
                AutoBindMetaModelService.MapLanguage(actionArgument);
            }
            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArgument);
            }
            if (BindIp)
            {
                AutoBindMetaModelService.MapIp(actionArgument, actionContext.Request);
            }

            if (BindBalanceUpAndMoveBetDay)
            {
                AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArgument);
            }

            base.OnActionExecuting(actionContext);
        }

    }
}