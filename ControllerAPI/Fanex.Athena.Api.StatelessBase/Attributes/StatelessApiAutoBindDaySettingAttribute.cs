using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Api.StatelessBase.Attributes.Extensions;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class StatelessApiAutoBindDaySettingAttribute : ActionFilterAttribute
    {
        public bool BindBalanceUpAndMoveBetDay { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (BindBalanceUpAndMoveBetDay)
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
    }
}