namespace Fanex.Athena.Web.ActionFilter
{
    using Fanex.Athena.Extension.Utility;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;

    [AttributeUsage(AttributeTargets.All)]
    public sealed class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly ISessionService _sessionService;
        private readonly IAppSettings _appSettings;

        public CustomAuthorizeAttribute()
        {
            _sessionService = new SessionService();
            _appSettings = new AppSettings();
        }

        public CustomAuthorizeAttribute(ISessionService sessionStorage, IAppSettings appSettings)
        {
            _sessionService = sessionStorage ?? new SessionService();
            _appSettings = appSettings ?? new AppSettings();
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var isAuthenticated = base.AuthorizeCore(httpContext);
            isAuthenticated = isAuthenticated
                && _sessionService.LicenseeSession != null && _sessionService.UserSession != null;
            return isAuthenticated;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (IsActionView(filterContext.HttpContext.Request))
            {
                var routeValue = new
                {
                    controller = "Utility",
                    action = "LocationRestriction",
                };
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
            }
            else
            {
                filterContext.Result = new ContentResult { Content = "Unauthorized" };
            }
        }

        private bool IsActionView(HttpRequestBase request)
        {
            var noViewActions = _appSettings.ListActionNoView;
            var actionLink = request.Url.AbsolutePath.Trim('/');
            return string.IsNullOrEmpty(actionLink) ||
                !noViewActions.Any(_ => actionLink.EndsWith(_, StringComparison.OrdinalIgnoreCase));
        }
    }
}