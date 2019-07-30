using Fanex.Athena.Model.Auth;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fanex.Athena.Service.StatelessCore
{
    public class AgentListBuilder : IAgentListBuilder
    {
        public string ToXml(IEnumerable<OneAuthCurrency> authCurrencyList, string selectedCurrency)
        {
            if (authCurrencyList == null || !authCurrencyList.Any())
            {
                return string.Empty;
            }

            var actualCurrencyAgentList = GetSelectedCurrencyAgentList(authCurrencyList, selectedCurrency);

            var builder = new StringBuilder("<ROOT>");
            foreach (var currencyItem in actualCurrencyAgentList)
            {
                var xmlItemList = currencyItem.AgentId.Select(x => $"<Agent AgentId=\"{x}\" Currency=\"{currencyItem.CurrencyId}\"/>");
                builder.Append(string.Join("", xmlItemList));
            }

            builder.Append("</ROOT>");

            return builder.ToString();
        }

        private IEnumerable<OneAuthCurrency> GetSelectedCurrencyAgentList(IEnumerable<OneAuthCurrency> authCurrencyList, string selectedCurrency)
        {
            if (string.IsNullOrEmpty(selectedCurrency))
            {
                return authCurrencyList;
            }

            var selectedCurrencyIdList = selectedCurrency.Trim()
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => Convert.ToInt32(x));

            return authCurrencyList.Where(x => selectedCurrencyIdList.Contains(x.CurrencyId));
        }
    }
}