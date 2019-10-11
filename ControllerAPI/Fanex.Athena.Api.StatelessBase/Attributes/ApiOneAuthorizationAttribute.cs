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
using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.Extension.Helpers;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Resources;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Logging;
using LAP.ONEBook.Security;
using ONEbook.UM.Services;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiOneAuthorizationAttribute : FilterAttribute, IAuthorizationFilter
    {
        private const string KeyName = "X-Auth-Token";
        public string AllowFunctionKeys { get; set; }

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
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                var service = scope.Resolve<IOneBookSecurityWrapper>();
                var token = service.Authenticate(tokenValue);

                if (token == null || string.IsNullOrWhiteSpace(token.SiteName) || token.UserSEQ <= 0)
                {
                    LogInfo(logger, actionContext.Request, "TokenInfo is null or invalid");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                var licenseeSettingService = scope.Resolve<ILicenseeSettingService>();
                var licensee = licenseeSettingService.GetLicenseeInfo(token.SiteName);
                if (licensee == null)
                {
                    LogInfo(logger, actionContext.Request, $"not found licensee with name={token.SiteName}");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                if (!HasPermission(token))
                {
                    LogInfo(logger, actionContext.Request, "Acces Denied");
                    return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
                }

                actionContext.ActionArguments["licenseeid"] = licensee.Id;

                AssignActionArguments(actionContext, token);

                return continuation?.Invoke();
            }
            catch (Exception exception)
            {
                logger.Error(LogMessageHelper.GenerateMessage(exception));
                return UnauthorizeAccessHandlerAsync(actionContext, ViewResources.AccessDeniedMsg);
            }
        }

        private bool HasPermission(DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> token)
        {
            var allowedFunctionKeyList = GetAllowedFunctionKeyList();
            if (allowedFunctionKeyList != null && allowedFunctionKeyList.Any())
            {
                return token.IsAdminstrator || token.Permissions.Any(i =>
                allowedFunctionKeyList.Contains(i.FunctionKey)
                || (i.SubFunctionKeys != null && i.SubFunctionKeys.Intersect(allowedFunctionKeyList).Any()));
            }

            return true;
        }

        private IEnumerable<string> GetAllowedFunctionKeyList()
        {
            var functionKeys = AllowFunctionKeys?.Trim();
            if (string.IsNullOrEmpty(functionKeys))
            {
                return new List<string>();
            }

            return functionKeys.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(x => x.Trim());
        }

        private static void AssignActionArguments(HttpActionContext actionContext, DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> token)
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
            if (request.Headers.TryGetValues(KeyName, out IEnumerable<string> headerValues))
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