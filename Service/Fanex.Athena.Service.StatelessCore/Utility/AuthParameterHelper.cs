using Fanex.Athena.Model.Auth;
using Fanex.Athena.Model.Core.DataDomain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fanex.Athena.Service.StatelessCore.Utility
{
    public static class AuthParameterHelper
    {
        public static string GenerateAgentListXml(IDictionary<int, int[]> currencyAgentList,
            int currencyId = 0, bool isExcludeTestData = false)
        {
            return GenerateAgentListXml(currencyAgentList, new[] { currencyId < 0 ? 0 : currencyId }, isExcludeTestData);
        }

        public static string GenerateAgentListXml(IDictionary<int, int[]> currencyAgentList,
            IEnumerable<int> currencyIdList, bool isExcludeTestData = false)
        {
            const int AllCurrencyId = 0;
            var result = new StringBuilder("<ROOT>");
            if (isExcludeTestData && currencyAgentList.ContainsKey(CurrencyType.Uus))
            {
                currencyAgentList = currencyAgentList.Where(x => x.Key != CurrencyType.Uus).ToDictionary(x => x.Key, x => x.Value);
            }

            if (currencyIdList.Contains(AllCurrencyId))
            {
                foreach (var currency in currencyAgentList)
                {
                    result.Append(GenerateAgentXmlBody(currency.Key, currency.Value));
                }
            }
            else
            {
                foreach (var currencyId in currencyIdList)
                {
                    if (currencyAgentList.ContainsKey(currencyId))
                    {
                        var agentList = currencyAgentList.Single(x => x.Key == currencyId).Value;
                        result.Append(GenerateAgentXmlBody(currencyId, agentList));
                    }
                }
            }

            result.Append("</ROOT>");
            return result.ToString();
        }

        public static string GenerateAgentListXml(IDictionary<int, string> currencyList,
            IDictionary<int, IEnumerable<int>> currencyAgentList)
        {
            var result = new StringBuilder("<ROOT>");
            foreach (var item in currencyAgentList)
            {
                if (currencyList.ContainsKey(item.Key))
                {
                    result.Append(GenerateAgentXmlBody(item.Key, item.Value));
                }
            }

            result.Append("</ROOT>");
            return result.ToString();
        }

        private static StringBuilder GenerateAgentXmlBody(int currencyId, IEnumerable<int> agentList)
        {
            var result = new StringBuilder();
            foreach (var agentId in agentList)
            {
                result.AppendFormat("<Agent AgentId=\"{0}\" Currency=\"{1}\"/>", agentId, currencyId);
            }

            return result;
        }

        public static string GenerateAgentListXml(IEnumerable<OneAuthCurrency> authCurrencyList, string currencyIdList)
        {
            if (authCurrencyList == null || !authCurrencyList.Any())
            {
                return string.Empty;
            }

            var actualCurrencyAgentList = GetSelectedCurrencyAgentList(authCurrencyList, currencyIdList);

            var builder = new StringBuilder("<ROOT>");
            foreach (var currencyItem in actualCurrencyAgentList)
            {
                var xmlItemList = currencyItem.AgentId.Select(x => $"<Agent AgentId=\"{x}\" Currency=\"{currencyItem.CurrencyId}\"/>");
                builder.Append(string.Join("", xmlItemList));
            }

            builder.Append("</ROOT>");

            return builder.ToString();
        }

        private static IEnumerable<OneAuthCurrency> GetSelectedCurrencyAgentList(IEnumerable<OneAuthCurrency> authCurrencyList, string currencyIdList)
        {
            if (string.IsNullOrEmpty(currencyIdList))
            {
                return authCurrencyList;
            }

            var selectedCurrencyIdList = currencyIdList.Trim()
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => Convert.ToInt32(x));

            return authCurrencyList.Where(x => selectedCurrencyIdList.Contains(x.CurrencyId));
        }
    }
}