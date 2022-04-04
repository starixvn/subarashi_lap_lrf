namespace Fanex.Athena.Api.Base.Attributes
{
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    [AttributeUsage(AttributeTargets.All)]
    public sealed class CustomApiAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly ISessionService _sessionService;

        public CustomApiAuthorizeAttribute()
        {
            _sessionService = new SessionService();
        }

        public CustomApiAuthorizeAttribute(ISessionService sessionStorage)
        {
            _sessionService = sessionStorage ?? new SessionService();
        }

        protected override bool IsAuthorized(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (!base.IsAuthorized(actionContext))
            {
                return false;
            }

            return _sessionService.LicenseeSession != null && _sessionService.UserSession != null;
        }

        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized) { Content = new StringContent("Unauthorized.") };
        }
    }
}