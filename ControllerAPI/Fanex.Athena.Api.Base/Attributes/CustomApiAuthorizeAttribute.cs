namespace Fanex.Athena.Api.Base.Attributes
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Web.Http.Controllers;
    using Fanex.Athena.Service.Core.Users;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Api.StatelessBase.Utility;

    [AttributeUsage(AttributeTargets.All)]
    public sealed class CustomApiAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly ISessionService _sessionService;

        public CustomApiAuthorizeAttribute()
            : this(null)
        {
        }

        public CustomApiAuthorizeAttribute(ISessionService sessionStorage)
        {
            _sessionService = sessionStorage ?? new SessionService();
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (!base.IsAuthorized(actionContext))
            {
                return false;
            }

            return _sessionService.LicenseeSession != null && _sessionService.UserSession != null;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            if (actionContext.ActionDescriptor.ActionName.Equals("ReportViews"))
            {
                actionContext.Response = RequestHelper.HostRedirectResponse("~/Utility/LocationRestriction");

                return;
            }

            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized) { Content = new StringContent("Unauthorized.") };
        }
    }
}