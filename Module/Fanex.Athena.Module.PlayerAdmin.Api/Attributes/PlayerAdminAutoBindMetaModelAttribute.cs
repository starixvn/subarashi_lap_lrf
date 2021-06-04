using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Module.PlayerAdmin.Api.MetaModel;
using Fanex.Athena.Service.StatelessCore.Utility;
using LAP.ONEBook.Security;

namespace Fanex.Athena.Module.PlayerAdmin.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class PlayerAdminAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        private const string currencyAgentListKey = "currencyAgentList";

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var actionArgument = actionContext.ActionArguments;

            MapArgumentsToMetaModel(actionArgument);

            base.OnActionExecuting(actionContext);
        }

        public static void MapArgumentsToMetaModel(IDictionary<string, object> actionArguments)
        {
            var hasArg = actionArguments.ContainsKey(currencyAgentListKey)
                && actionArguments[currencyAgentListKey] is IEnumerable<OneAuthCurrency>;
            if (!hasArg)
            {
                return;
            }

            BindLRFFiltersMetaModel(actionArguments);
            BindModelAgent(actionArguments);
            BindSiteName(actionArguments);
        }

        public static void BindLRFFiltersMetaModel(IDictionary<string, object> actionArguments)
        {
            var item = actionArguments.FirstOrDefault(x => x.Value is ILRFFiltersMetaModel);
            if (item.Value == null)
            {
                return;
            }

            if (item.Value is ILRFFiltersMetaModel arg)
            {
                arg.LicenseeId = (int)actionArguments["licenseeid"];
                arg.CurrencyAgentList = actionArguments[currencyAgentListKey] as IEnumerable<OneAuthCurrency>;
                arg.Token = actionArguments["tokenInfo"] as DefaultAuthInfo<OneAuthPermission, OneAuthCurrency>;
                actionArguments[item.Key] = arg;
            }
        }

        public static void BindModelAgent(IDictionary<string, object> actionArguments)
        {
            var item = actionArguments.FirstOrDefault(x => x.Value is IMetaModelAgent);
            if (item.Value == null)
            {
                return;
            }

            var currencyWithAgent = actionArguments[currencyAgentListKey] as IEnumerable<OneAuthCurrency>;
            var currencyIdList = string.Empty;
            if (item.Value is IMetaModelCurrencyIdList itemWithCurrency)
            {
                currencyIdList = itemWithCurrency.CurrencyIdList;
            }

            if (item.Value is IMetaModelAgent itemWithAgent)
            {
                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(currencyWithAgent, currencyIdList);
                actionArguments[item.Key] = itemWithAgent;
            }
        }

        public static void BindSiteName(IDictionary<string, object> actionArguments)
        {
            const string siteNameKey = "sitename";
            if (!actionArguments.ContainsKey(siteNameKey))
            {
                return;
            }

            var item = actionArguments.Where(x => x.Value is IMetaModelSiteName)
                .Select(x => x).FirstOrDefault();
            if (item.Value is IMetaModelSiteName model)
            {
                model.SiteName = actionArguments[siteNameKey] as string;
                actionArguments[item.Key] = model;
            }
        }
    }
}
