using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.DataAccess.Core.Users.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;

using ONEbook.UM.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiOneAuthorizationAttribute : FilterAttribute, IAuthorizationFilter
    {
        private const string KeyName = "X-Auth-Token";

        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(
            HttpActionContext actionContext,
            CancellationToken cancellationToken,
            Func<Task<HttpResponseMessage>> continuation)
        {
            var scope = actionContext.Request.GetDependencyScope();
            var logger = scope.Resolve<ILogger>();
            var maintainanceService = scope.Resolve<IMaintenanceService>();

            try
            {
                if (maintainanceService.IsUnderMaintenance())
                {
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.UnderMaintenance);
                }

                var tokenValue = GetAuthToken(actionContext.Request);
                if (string.IsNullOrEmpty(tokenValue))
                {
                    LogInfo(logger, actionContext.Request, "Auth Token is null");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                var service = scope.Resolve<IOneBookSecurityWrapper>();
                var token = service.Authenticate(tokenValue);

                if (token == null || string.IsNullOrWhiteSpace(token.SiteName) || token.UserSEQ <= 0)
                {
                    LogInfo(logger, actionContext.Request, "TokenInfo is null");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                var licenseeDataAccess = scope.Resolve<ILicenseeDataAccess>();
                var licensee = licenseeDataAccess.GetLicenseeByName(token.SiteName);
                if (licensee == null)
                {
                    LogInfo(logger, actionContext.Request, "Licensee is null");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                actionContext.ActionArguments["licenseeid"] = licensee.Id;
                AssignActionArguments(actionContext, token);

                return continuation?.Invoke();
            }
            catch (Exception exception)
            {
                logger.Error(exception.Message, exception);
                return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
            }
        }

        private static void AssignActionArguments(HttpActionContext actionContext, OneAuthToken token)
        {
            actionContext.ActionArguments["userid"] = token.UserSEQ;
            actionContext.ActionArguments["currencyIDList"] = string.Join(",", token.Currency.Select(i => i.CurrencyId).ToArray());
            actionContext.ActionArguments["username"] = token.UserID;
            actionContext.ActionArguments["sitename"] = token.SiteName;
            actionContext.ActionArguments["language"] = token.Language;
            actionContext.ActionArguments["currencyAgentList"] = token.Currency;
        }

        private static string GetAuthToken(HttpRequestMessage request)
        {
            IEnumerable<string> headerValues;
            if (request.Headers.TryGetValues(KeyName, out headerValues))
            {
                return headerValues.FirstOrDefault();
            }

            return request.GetQueryNameValuePairs().FirstOrDefault(x => x.Key.Equals(KeyName, StringComparison.OrdinalIgnoreCase)).Value;
        }

        private static Task<HttpResponseMessage> UnauthorizeAccessHandlerAsync(HttpActionContext actionContext, string message)
        {
            actionContext.Response = new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.Forbidden,
                RequestMessage = actionContext.ControllerContext.Request,
                Content = new StringContent(message)
            };

            var source = new TaskCompletionSource<HttpResponseMessage>();
            source.SetResult(actionContext.Response);
            return source.Task;
        }

        private static void LogInfo(ILogger logger, HttpRequestMessage request, string message)
        {
            var content = new StringBuilder("ApiOneAuthorization: ");
            content.AppendLine(message);
            content.AppendLine("Url: " + request.RequestUri);
            logger.Info(content.ToString());
        }
    }
}