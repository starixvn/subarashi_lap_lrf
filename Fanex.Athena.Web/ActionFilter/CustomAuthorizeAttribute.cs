// -----------------------------------------------------------------------
// <copyright file="CustomAuthorizeAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.Core.Users.Interfaces;

    [AttributeUsage(AttributeTargets.All)]
    public sealed class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly ISessionStorage _sessionStorage;

        public CustomAuthorizeAttribute()
        {
            _sessionStorage = new SessionStorage();
        }

        public CustomAuthorizeAttribute(ISessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage;
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var isAuthenticated = base.AuthorizeCore(httpContext);
            isAuthenticated = isAuthenticated && _sessionStorage.LicenseeAuthInfo != null && _sessionStorage.UserAuthInfo != null;
            return isAuthenticated;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            var routeValue = new
            {
                controller = "Utility",
                action = "LocationRestriction",
            };

            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
        }
    }
}