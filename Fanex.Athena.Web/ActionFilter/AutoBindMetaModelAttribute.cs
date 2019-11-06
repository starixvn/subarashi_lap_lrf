using System;
using System.Web.Mvc;
using Fanex.Athena.Service.Core.Users;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]

    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }
        public bool BindDictionaryCurrencyList { get; set; }
        public bool BindCurrencyList { get; set; }
        public bool BindUserId { get; set; }
        private static readonly ISessionStorage _sessionStorage = new SessionStorage();
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = _sessionStorage.UserAuthInfo;

            var actionArgument = filterContext.ActionParameters;
            if (BindAgent)
            {
                AutoBindMetaModelService.MapAgentXml(actionArgument, userSession.CurrencyAgentList);
            }

            if (BindUserId)
            {
                AutoBindMetaModelService.MapUserId(actionArgument, userSession.UserId);
            }

            if (BindDictionaryCurrencyList)
            {
                AutoBindMetaModelService.MapDictionaryCurrencyList(actionArgument, userSession.CurrencyList);
            }
            if (BindCurrencyList)
            {
                AutoBindMetaModelService.MapCurrencyList(actionArgument, userSession.CurrencyList);
            }
            base.OnActionExecuting(filterContext);

        }

    }
}
