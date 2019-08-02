// -----------------------------------------------------------------------
// <copyright file="FunctionAuthorizationAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Net;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Fanex.Athena.Model.Auth.Enum;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System.Linq;
    using Fanex.Athena.Model.Core.MetaModel;

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ValidatePermissionOnDataAttribute : ActionFilterAttribute
    {
        private string _custIDFieldName { get; set; } = "custId";
        private readonly bool _isObject;
        public ValidatePermissionOnDataAttribute()
        {
        }

        public ValidatePermissionOnDataAttribute(string custIDFieldName)
        {
            _custIDFieldName = custIDFieldName;
        }
        public ValidatePermissionOnDataAttribute(bool isObject)
        {
            _isObject = isObject;
        }

        public ISessionStorage SessionStorage { get; set; }

        public IAuthorizationService AuthorizationServiceInstance { get; set; }
        public IAuthorizationService AuthorizationService { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var context = filterContext.HttpContext;
            var userSession = SessionStorage.UserAuthInfo;
            var authorized = userSession != null;
            if (authorized)
            {
                var custId = 0;
                if (_isObject)
                {
                    custId = filterContext.ActionParameters.Where(x => x.Value is IMetalModelCustomerIdentity)
                       .Select(x => x.Value as IMetalModelCustomerIdentity).FirstOrDefault().CustId;
                }
                else
                {
                    int.TryParse(filterContext.HttpContext.Request[_custIDFieldName], out custId);
                }

                authorized = AuthorizationService.HasPermissionOnData(SessionStorage.UserAuthInfo.CurrencyAgentList, custId, 0);
            }

            if (!authorized)
            {
                if (context.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    filterContext.HttpContext.Response.ContentType = "application/json";
                    filterContext.Result = new JsonResult
                    {
                        Data = new { ErrCode = (int)HttpStatusCode.Forbidden, ErrMsg = "Access Denied." },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                else
                {
                    var routeValue = new
                    {
                        controller = "Utility",
                        action = "AccessDenied",
                        message = "AccessDenied"
                    };

                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }
}