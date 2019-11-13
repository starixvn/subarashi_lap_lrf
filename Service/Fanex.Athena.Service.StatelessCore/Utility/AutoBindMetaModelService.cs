using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Fanex.Athena.DataAccess.Core.Configuration.Interfaces;
using Fanex.Athena.Extension.Helper;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Service.StatelessCore.Utility
{
    public static class AutoBindMetaModelService
    {
        public static void MapAgentXml(IDictionary<string, object> actionArguments)
        {
            if (actionArguments.ContainsKey("currencyAgentList")
               && actionArguments["currencyAgentList"] is IEnumerable<OneAuthCurrency> currencyWithAgent)
            {
                var item = actionArguments.FirstOrDefault(x => x.Value is IMetaModelAgent);
                if (item.Value != null)
                {
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
            }
        }

        public static void MapAgentXml(IDictionary<string, object> actionArguments, IDictionary<int, int[]> currencyAgentList)
        {
            var item = actionArguments.Where(x => x.Value is IMetaModelAgent)
                   .Select(x => x).FirstOrDefault();

            var currencyId = 0;
            if (item.Value is IMetaModelCurrency itemWithCurrency)
            {
                currencyId = itemWithCurrency.CurrencyId;
            }

            if (item.Value is IMetaModelAgent itemWithAgent)
            {
                itemWithAgent.AgentListXml = AuthParameterHelper.GenerateAgentListXml(currencyAgentList, currencyId, itemWithAgent.IsExcludedTestData);
                actionArguments[item.Key] = itemWithAgent;
            }
        }

        public static void MapCurrencyList(
            IDictionary<string, object> actionArguments,
            IDictionary<int, string> currencyList)
        {
            var item = actionArguments.FirstOrDefault(x => x.Value is IMetaModelCurrencyList);
            if (item.Value != null)
            {
                var value = item.Value as IMetaModelCurrencyList;
                if (item.Value is IMetaModelCurrencyIdList)
                {
                    var itemById = item.Value as IMetaModelCurrencyIdList;
                    var selectedCurrencyList = itemById.CurrencyIdList?.Split(new[] { ',' },
                        StringSplitOptions.RemoveEmptyEntries);

                    value.CurrencyList = currencyList.Where(i =>
                    selectedCurrencyList.Contains(i.Key.ToString()))
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }
                else
                {
                    value.CurrencyList = currencyList
                    .Select(x => new Currency { ID = x.Key, Name = x.Value }).ToList();
                }

                actionArguments[item.Key] = value;
            }
        }

        public static void MapUserId(IDictionary<string, object> actionArguments, int userId)
        {
            var item = actionArguments.Where(x => x.Value is IMetaModelUserId)
             .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelUserId value)
            {
                value.UserId = userId;
                actionArguments[item.Key] = value;
            }
        }

        public static void MapUserId(IDictionary<string, object> actionArguments)
        {
            if (actionArguments.ContainsKey("userid")
                         && actionArguments["userid"] is int userId)
            {
                var item = actionArguments.Where(x => x.Value is IMetaModelUserId)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelUserId model)
                {
                    model.UserId = userId;
                    actionArguments[item.Key] = model;
                }
            }
        }

        public static void MapSiteName(IDictionary<string, object> actionArguments, string siteName)
        {
            var item = actionArguments.Where(x => x.Value is IMetaModelSiteName)
           .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelSiteName value)
            {
                value.SiteName = siteName;
                actionArguments[item.Key] = value;
            }
        }
        public static void MapSiteName(IDictionary<string, object> actionArguments)
        {
            if (actionArguments.ContainsKey("sitename")
                && actionArguments["sitename"] is string siteName)
            {
                var item = actionArguments.Where(x => x.Value is IMetaModelSiteName)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelSiteName model)
                {
                    model.SiteName = siteName;
                    actionArguments[item.Key] = model;
                }
            }
        }

        public static void MapLanguage(IDictionary<string, object> actionArguments)
        {
            if (actionArguments.ContainsKey("language")
                          && actionArguments["language"] is string lang)
            {
                var item = actionArguments.Where(x => x.Value is IMetaModelLanguage)
                        .Select(x => x).FirstOrDefault();

                if (item.Value is IMetaModelLanguage model)
                {
                    model.Language = Util.MapIetfLanguageCodes[lang];
                    actionArguments[item.Key] = model;
                }
            }
        }

        public static void MapIp(IDictionary<string, object> actionArguments, string ip)
        {
            var item = actionArguments.Where(x => x.Value is IMetaModelIp)
                    .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelIp model)
            {
                model.Ip = ip;
                actionArguments[item.Key] = model;
            }
        }

        public static void MapBalanceUpAndMoveBet(IDictionary<string, object> actionArguments, IBalanceUpDataAccess balanceUpDataAccess)
        {
            var item = actionArguments.Where(x => x.Value is IMetaModelBalanceUpAndMoveBet)
             .Select(x => x).FirstOrDefault();

            if (item.Value is IMetaModelBalanceUpAndMoveBet value)
            {
                var temp = balanceUpDataAccess.GetBalanceUp();
                value.BalanceUpDay = temp.BalanceUpDay;
                value.MoveBetsDay = temp.MoveBetsDay;
                actionArguments[item.Key] = value;
            }
        }
    }
}