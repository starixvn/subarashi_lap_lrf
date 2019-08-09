using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]

    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }
        public bool BindCurrencyList { get; set; }

        public ISessionStorage SessionStorage { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = SessionStorage.UserAuthInfo;

            if (BindAgent)
            {
                MapAgentXml(filterContext, userSession);

            }

            if (BindCurrencyList)
            {
                MapCurrencyList(filterContext, userSession);

            }

            base.OnActionExecuting(filterContext);

        }

        private static void MapCurrencyList(ActionExecutingContext filterContext, Model.Auth.UserAuthInfo userSession)
        {
            var item = filterContext.ActionParameters.Where(x => x.Value is IMetaModelCurrencyList)
              .Select(x => x).FirstOrDefault();
            var value = item.Value as IMetaModelCurrencyList;
            value.CurrencyList = userSession.CurrencyList;
            filterContext.ActionParameters[item.Key] = value;
        }

        private static void MapAgentXml(ActionExecutingContext filterContext, Model.Auth.UserAuthInfo userSession)
        {
            var item = filterContext.ActionParameters.Where(x => x.Value is IMetaModelAgent)
                    .Select(x => x).FirstOrDefault();

            var currencyId = 0;
            if (item.Value is IMetaModelCurrency itemWithCurrency)
            {
                currencyId = itemWithCurrency.CurrencyId;
            }

            if (item.Value is IMetaModelAgent itemWithAgent)
            {
                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyId);
                filterContext.ActionParameters[item.Key] = itemWithAgent;
            }
        }
    }
}
