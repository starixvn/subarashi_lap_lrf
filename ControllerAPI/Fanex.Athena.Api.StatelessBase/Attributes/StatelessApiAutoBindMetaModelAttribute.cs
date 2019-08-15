using System;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Api.StatelessBase.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public sealed class StatelessApiAutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }
        public bool BindSiteName { get; set; }
        public bool BindLanguage { get; set; }
        public bool BindUserId { get; set; }
        public bool BindIp { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (BindAgent)
            {
                MapAgentXml(actionContext);
            }
            if (BindSiteName)
            {
                MapSiteName(actionContext);
            }
            if (BindLanguage)
            {
                MapLanguage(actionContext);
            }
            if (BindUserId)
            {
                MapUserId(actionContext);
            }
            if (BindIp)
            {
                MapIp(actionContext);
            }
            base.OnActionExecuting(actionContext);
        }

        private static void MapIp(HttpActionContext actionContext)
        {
            var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelIp)
                    .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelIp model)
            {
                model.Ip = ClientHelper.GetClientIpAddress(actionContext.Request);
                actionContext.ActionArguments[item.Key] = model;
            }
        }

        private static void MapUserId(HttpActionContext actionContext)
        {
            if (actionContext.ActionArguments.ContainsKey("userid")
                         && actionContext.ActionArguments["userid"] is int userId)
            {
                var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelUserId)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelUserId model)
                {
                    model.UserId = userId;
                    actionContext.ActionArguments[item.Key] = model;
                }
            }
        }

        private static void MapLanguage(HttpActionContext actionContext)
        {
            if (actionContext.ActionArguments.ContainsKey("language")
                          && actionContext.ActionArguments["language"] is string lang)
            {
                var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelLanguage)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelLanguage model)
                {
                    model.Language = Util.MapIetfLanguageCodes[lang];
                    actionContext.ActionArguments[item.Key] = model;
                }
            }
        }

        private static void MapSiteName(HttpActionContext actionContext)
        {
            if (actionContext.ActionArguments.ContainsKey("sitename")
                && actionContext.ActionArguments["sitename"] is string siteName)
            {
                var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelSiteName)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelSiteName model)
                {
                    model.SiteName = siteName;
                    actionContext.ActionArguments[item.Key] = model;
                }
            }
        }

        private static void MapAgentXml(HttpActionContext actionContext)
        {
            if (actionContext.ActionArguments.ContainsKey("currencyAgentList")
                && actionContext.ActionArguments["currencyAgentList"] is OneAuthCurrency[] currencyWithAgent)
            {
                var item = actionContext.ActionArguments.Where(x => x.Value is IMetaModelAgent)
                        .Select(x => x).FirstOrDefault();

                var currencyIdList = string.Empty;
                if (item.Value is IMetaModelCurrencyIdList itemWithCurrency)
                {
                    currencyIdList = itemWithCurrency.CurrencyIdList;
                }

                if (item.Value is IMetaModelAgent itemWithAgent)
                {
                    itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(currencyWithAgent, currencyIdList);
                    actionContext.ActionArguments[item.Key] = itemWithAgent;
                }
            }
        }
    }
}