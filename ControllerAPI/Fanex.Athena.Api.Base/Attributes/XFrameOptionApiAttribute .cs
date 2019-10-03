namespace Fanex.Athena.Api.Base
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web.Http.Filters;

    using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
    public sealed class XFrameOptionApiAttribute : ActionFilterAttribute
    {
        private const string XFrameOptionHeaderName = "X-Frame-Options";

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            AddXFrameOption(actionExecutedContext);

            base.OnActionExecuted(actionExecutedContext);
        }

        public override Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            AddXFrameOption(actionExecutedContext);
            return base.OnActionExecutedAsync(actionExecutedContext, cancellationToken);
        }

        private static void AddXFrameOption(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Response != null)
            {
                var scope = actionExecutedContext.Request.GetDependencyScope();
                var sessionStorage = scope.Resolve<ISessionStorage>();
                var user = sessionStorage.UserAuthInfo;

                IEnumerable<string> headerValues;

                if (actionExecutedContext.Response.Headers.TryGetValues(XFrameOptionHeaderName, out headerValues) && headerValues.Any())
                {
                    actionExecutedContext.Response.Headers.Remove(XFrameOptionHeaderName);
                }

                if (user == null || user.ApplicationMode == AppMode.Self)
                {
                    actionExecutedContext.Response.Headers.Add(XFrameOptionHeaderName, "SAMEORIGIN");
                }
            }
        }
    }
}