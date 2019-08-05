using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class ApiPermissionOnDataAttribute : ActionFilterAttribute
    {
        private readonly string _custIDFieldName;

        private readonly bool _isObject;

        public ApiPermissionOnDataAttribute(string custIDFieldName = "custId", bool isObject = true)
        {
            _custIDFieldName = custIDFieldName;
            _isObject = isObject;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var scope = actionContext.Request.GetDependencyScope();
            var authorizationService = scope.Resolve<IAuthorizationService>();
            var custId = 0;
            if (_isObject)
            {
                var customerIdentity = actionContext.ActionArguments.Where(x => x.Value is IMetalModelCustomerIdentity)
                           .Select(x => x.Value as IMetalModelCustomerIdentity).FirstOrDefault();

                if (customerIdentity != null)
                {
                    custId = customerIdentity.CustId;
                }
            }
            else
            {
                int.TryParse(actionContext.ActionArguments[_custIDFieldName] as string, out custId);
            }

            var authCurrencyList = actionContext.ActionArguments["currencyAgentList"] as OneAuthCurrency[];

            var isAuthorized = authorizationService.HasPermissionOnData(authCurrencyList, custId, 0);

            if (!isAuthorized)
            {
                var content = new
                {
                    ErrCode = (int)HttpStatusCode.Forbidden,
                    ErrMsg = "Access Denied."
                };

                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden, content);
            }

            base.OnActionExecuting(actionContext);
        }
    }
}