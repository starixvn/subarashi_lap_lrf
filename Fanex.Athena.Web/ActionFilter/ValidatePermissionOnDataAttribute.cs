// -----------------------------------------------------------------------
// <copyright file="FunctionAuthorizationAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Fanex.Athena.Model.Core.MetaModel;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ValidatePermissionOnDataAttribute : ActionFilterAttribute
    {
        private string _custIDFieldName { get; }

        private string _currencyIDFieldName { get; }

        private readonly bool _isObject;

        public ValidatePermissionOnDataAttribute(string custIDFieldName = "custId", string currencyIDFieldName = "currencyId")
        {
            _custIDFieldName = custIDFieldName;
            _currencyIDFieldName = currencyIDFieldName;
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
                var currencyId = 0;
                if (_isObject)
                {
                    var identityModel = filterContext.ActionParameters.Where(x => x.Value is IMetalModelCustomerIdentity)
                       .Select(x => x.Value as IMetalModelCustomerIdentity).FirstOrDefault();

                    if (identityModel != null)
                    {
                        custId = identityModel.CustId;
                        currencyId = identityModel.CurrencyId;
                    }
                }
                else
                {
                    int.TryParse(filterContext.HttpContext.Request[_custIDFieldName], out custId);
                    int.TryParse(filterContext.HttpContext.Request[_currencyIDFieldName], out currencyId);
                }

                authorized = AuthorizationService.CheckCustomerBelongsTo(userSession.CurrencyAgentList, custId, currencyId);
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