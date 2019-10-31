using System;
using System.Linq;
using System.Web.Mvc;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;
using Fanex.Athena.Service.Core.Users.Interfaces;
using Fanex.Athena.Service.StatelessCore.Utility;

namespace Fanex.Athena.Web.ActionFilter
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]

    public sealed class AutoBindMetaModelAttribute : ActionFilterAttribute
    {
        public bool BindAgent { get; set; }

        public bool BindCurrencyList { get; set; }
        public bool BindCurrencyListByFilter { get; set; }
        public bool BindUserId { get; set; }

        public ISessionStorage SessionStorage { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var userSession = SessionStorage.UserAuthInfo;


            if (BindAgent)
            {
                MapAgentXml(filterContext, userSession);
            }

            if (BindUserId)
            {
                MapUserId(filterContext, userSession);
            }

            if (BindCurrencyList)
            {
                MapCurrencyList(filterContext, userSession);
            }
            if (BindCurrencyListByFilter)
            {
                MapCurrencyListByFilter(filterContext, userSession, true);
            }
            base.OnActionExecuting(filterContext);

        }

        private static void MapUserId(ActionExecutingContext filterContext, UserAuthInfo userSession)
        {
            var item = filterContext.ActionParameters.Where(x => x.Value is IMetaModelUserId)
             .Select(x => x).FirstOrDefault();
            var value = item.Value as IMetaModelUserId;
            value.UserId = userSession.UserId;
            filterContext.ActionParameters[item.Key] = value;
        }

        private static void MapCurrencyList(ActionExecutingContext filterContext, UserAuthInfo userSession)
        {
            var itemByDictionary = filterContext.ActionParameters.FirstOrDefault(x => x.Value is IMetaModelDictionaryCurrencyList)
;
            if (itemByDictionary.Value != null)
            {
                var value = itemByDictionary.Value as IMetaModelDictionaryCurrencyList;
                value.CurrencyList = userSession.CurrencyList;
                filterContext.ActionParameters[itemByDictionary.Key] = value;
            }

            MapCurrencyListByFilter(filterContext, userSession, false);
        }

        private static void MapCurrencyListByFilter(ActionExecutingContext filterContext,
            UserAuthInfo userSession, bool isFilter)
        {
            var item = filterContext.ActionParameters.FirstOrDefault(x => x.Value is IMetaModelCurrencyList);
            if (item.Value != null)
            {
                var value = item.Value as IMetaModelCurrencyList;
                if (isFilter)
                {
                    var selectedCurrencyList = value.SelectedCurrency?.Split(new[] { ',' },
                        StringSplitOptions.RemoveEmptyEntries);
                    value.CurrencyList = userSession.CurrencyList.Where(i =>
                    selectedCurrencyList.Contains(i.Key.ToString()))
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }
                else
                {
                    value.CurrencyList = userSession.CurrencyList
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }

                filterContext.ActionParameters[item.Key] = value;
            }
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
                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(userSession.CurrencyAgentList, currencyId, itemWithAgent.IsExcludedTestData);
                filterContext.ActionParameters[item.Key] = itemWithAgent;
            }
        }
    }
}
