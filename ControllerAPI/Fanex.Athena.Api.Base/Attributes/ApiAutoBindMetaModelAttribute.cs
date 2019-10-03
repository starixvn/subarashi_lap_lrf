using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
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

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var scope = actionContext.Request.GetDependencyScope();
            var sessionStorage = scope.Resolve<ISessionStorage>();
            var userSession = sessionStorage.UserAuthInfo;

            if (BindAgent)
            {
                MapAgentXml(actionContext, userSession);
            }

            if (BindUserId)
            {
                MapUserId(actionContext, userSession);
            }

            if (BindBalanceUpAndMoveBet)
            {
                MapBalanceUpAndMoveBet(actionContext);
            }

            base.OnActionExecuting(actionContext);
        }

        private static void MapBalanceUpAndMoveBet(HttpActionContext actionContext)
        {
            var balanceUpDataAccess = actionContext.Request.GetDependencyScope().Resolve<IBalanceUpDataAccess>();
            var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelBalanceUpAndMoveBet)
             .Select(x => x).FirstOrDefault();
            var value = item.Value as IMetaModelBalanceUpAndMoveBet;

            if (value != null)
            {
                var temp = balanceUpDataAccess.GetBalanceUp();
                value.BalanceUpDay = temp.BalanceUpDay;
                value.MoveBetsDay = temp.MoveBetsDay;
                actionContext.ActionArguments[item.Key] = value;
            }
        }

        private static void MapUserId(HttpActionContext actionContext, UserAuthInfo userSession)
        {
            var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelUserId)
             .Select(x => x).FirstOrDefault();
            var value = item.Value as IMetaModelUserId;

            if (value != null)
            {
                value.UserId = userSession.UserId;
                actionContext.ActionArguments[item.Key] = value;
            }
        }

        private static void MapAgentXml(HttpActionContext actionContext, Model.Auth.UserAuthInfo userSession)
        {
            var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelAgent)
                    .Select(x => x).FirstOrDefault();

            var currencyId = 0;
            if (item.Value is IMetaModelCurrency itemWithCurrency)
            {
                currencyId = itemWithCurrency.CurrencyId;
            }

            if (item.Value is IMetaModelAgent itemWithAgent)
            {
                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyId);
                actionContext.ActionArguments[item.Key] = itemWithAgent;
            }
        }
    }
}