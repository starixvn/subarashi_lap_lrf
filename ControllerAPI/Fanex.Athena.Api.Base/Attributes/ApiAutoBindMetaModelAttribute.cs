using System;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.DataAccess.Core.Configuration;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Api.Base.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class ApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }

        public bool BindUserId { get; set; }

        public bool BindBalanceUpAndMoveBet { get; set; }

        private static readonly ISessionStorage _sessionStorage = new SessionStorage();

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var userSession = _sessionStorage.UserAuthInfo;
            var actionArgument = actionContext.ActionArguments;
            if (BindAgent)
            {
                AutoBindMetaModelService.MapAgentXml(actionArgument, userSession.CurrencyAgentList);
            }

            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArgument, userSession.UserId);
            }

            if (BindBalanceUpAndMoveBet)
            {
                var balanceUpDataAccess = new BalanceUpDataAccess(null, null);
                AutoBindMetaModelService.MapBalanceUpAndMoveBet(actionArgument, balanceUpDataAccess);
            }

            base.OnActionExecuting(actionContext);
        }
    }
}