using System;
using System.Web.Mvc;
using System.Web.Routing;
using Fanex.Athena.Model.Auth.Enum;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class AuthorizeRestrictionAttribute : AuthorizeAttribute
    {
        private readonly ISessionService _sessionService;

        private readonly AppMode _appMode;

        public AuthorizeRestrictionAttribute(AppMode mode)
            : this(new SessionService(), mode)
        {
        }

        public AuthorizeRestrictionAttribute(ISessionService sessionStorage, AppMode mode)
        {
            _sessionService = sessionStorage;
            _appMode = mode;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var skipAuthorization = filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true)
            || filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true);
            if (!skipAuthorization)
            {
                base.OnAuthorization(filterContext);
                var userSession = _sessionService.UserSession;
                var authorized = userSession != null && userSession.ApplicationMode == _appMode;
                if (!authorized)
                {
                    var routeValue = new
                    {
                        controller = "Utility",
                        action = "OneTokenRestriction",
                        code = "700"
                    };

                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(routeValue));
                }
            }
        }
    }
}