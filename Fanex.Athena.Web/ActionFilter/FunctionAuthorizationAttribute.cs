// -----------------------------------------------------------------------
// <copyright file="FunctionAuthorizationAttribute.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Web.ActionFilter
{
    using System;
    using System.Web.Mvc;
    using Fanex.Athena.Service.Core.Users.Interfaces;
    using Fanex.Athena.Service.StatelessCore.Interfaces;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public sealed class FunctionAuthorizationAttribute : ActionFilterAttribute
    {
        private readonly string[] _permissionKeys;

        public FunctionAuthorizationAttribute()
        {
        }

        public FunctionAuthorizationAttribute(params string[] permissionKeys)
        {
            _permissionKeys = permissionKeys;
        }

        public ISessionStorage SessionStorage { get; set; }

        public IAuthorizationService AuthorizationServiceInstance { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var licenseeSession = SessionStorage.LicenseeAuthInfo;
            var userSession = SessionStorage.UserAuthInfo;
            var authorized = userSession != null && licenseeSession != null;
            if (authorized)
            {
                authorized = AuthorizationServiceInstance.HasPermissions(userSession, _permissionKeys);
            }

            ActionFilterAttributeHelper.OnActionExecuting(filterContext, authorized);
            base.OnActionExecuting(filterContext);
        }
    }
}
