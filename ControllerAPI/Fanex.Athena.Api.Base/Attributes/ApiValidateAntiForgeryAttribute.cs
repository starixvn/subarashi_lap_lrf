namespace Fanex.Athena.Api.Base.Attributes
{
    using Extension.Utility;
    using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
    using Resources;
    using System;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web.Helpers;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiValidateAntiForgeryAttribute : FilterAttribute, IAuthorizationFilter
    {
        private const string KeyName = "__RequestVerificationToken";

        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(
            HttpActionContext actionContext,
            CancellationToken cancellationToken,
            Func<Task<HttpResponseMessage>> continuation)
        {
            try
            {
                var headers = actionContext.Request.Headers;
                var scope = actionContext.Request.GetDependencyScope();
                var antiForgeryService = scope.Resolve<IAntiForgeryService>();
                if (!headers.Contains(KeyName))
                {
                    return UnauthorizeAccessHandlerAsync(actionContext);
                }

                var cookie = headers
                    .GetCookies()
                    .Select(c => c[AntiForgeryConfig.CookieName])
                    .FirstOrDefault();

                var crfsKey = headers.GetValues(KeyName).FirstOrDefault();

                antiForgeryService.Validate(cookie != null ? cookie.Value : null, crfsKey);
            }
            catch (Exception)
            {
                return UnauthorizeAccessHandlerAsync(actionContext);
            }

            return continuation?.Invoke();
        }

        private static Task<HttpResponseMessage> FromResultAsync(HttpResponseMessage result)
        {
            var source = new TaskCompletionSource<HttpResponseMessage>();
            source.SetResult(result);
            return source.Task;
        }

        private static Task<HttpResponseMessage> UnauthorizeAccessHandlerAsync(HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.BadRequest,
                RequestMessage = actionContext.ControllerContext.Request,
                Content = new StringContent(ViewResources.AccessDeniedMsg)
            };

            return FromResultAsync(actionContext.Response);
        }
    }
}