// -----------------------------------------------------------------------
// <copyright file="CustomApiAuthorizeAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------
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
        private readonly ISessionStorage _sessionStorage;

        public CustomApiAuthorizeAttribute()
        {
            _sessionStorage = new SessionStorage();
        }

        public CustomApiAuthorizeAttribute(ISessionStorage sessionStorage)
        {
            _sessionStorage = sessionStorage ?? new SessionStorage();
        }

        protected override bool IsAuthorized(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (!base.IsAuthorized(actionContext))
            {
                return false;
            }

            return _sessionStorage.LicenseeAuthInfo != null && _sessionStorage.UserAuthInfo != null;
        }

        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized) { Content = new StringContent("Unauthorized.") };
        }
    }
}