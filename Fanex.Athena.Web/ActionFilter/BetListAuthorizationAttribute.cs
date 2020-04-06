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
    public sealed class BetListAuthorizationAttribute : ActionFilterAttribute
    {
        public ILicenseeSettingService LicenseeSettingService { get; set; }

        public ISessionService SessionService { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var isAllowed = LicenseeSettingService.IsAuthorizedOnBetList(SessionService.LicenseeSession?.LicenseeName);
            ActionFilterAttributeHelper.OnActionExecuting(filterContext, isAllowed);
            base.OnActionExecuting(filterContext);
        }
    }
}
