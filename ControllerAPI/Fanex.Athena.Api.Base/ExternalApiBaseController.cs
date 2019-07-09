using Fanex.Athena.Api.Base.Attributes;
using Fanex.Athena.Model.Core.DTO.OneAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Fanex.Athena.Api.Base
{
    [AllowAnonymous]
    [ApiOneAuthorization]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExternalApiBaseController : ApiController
    {
        public string UserName => (string)ActionContext.ActionArguments["username"];

        public string SiteName => (string)ActionContext.ActionArguments["sitename"];

        public string Language => (string)ActionContext.ActionArguments["language"];

        public int LicenseeId => (int)ActionContext.ActionArguments["licenseeid"];

        public int UserId => (int)ActionContext.ActionArguments["userid"];

        public string CurrencyIDList => (string)ActionContext.ActionArguments["currencyIDList"];

        public OneAuthCurrency[] CurrencyAgentList => ActionContext.ActionArguments["currencyAgentList"] as OneAuthCurrency[];

        public IEnumerable<int> AllowedCurrencyIdList => CurrencyAgentList.Select(x => x.CurrencyId);

        protected string BuildAgentListXml(string selectedCurrency)
        {
            if (CurrencyAgentList == null || !CurrencyAgentList.Any())
            {
                return string.Empty;
            }

            var actualCurrencyAgentList = GetSelectedCurrencyAgentList(selectedCurrency);

            var builder = new StringBuilder("<ROOT>");
            foreach (var currencyItem in actualCurrencyAgentList)
            {
                var xmlItemList = currencyItem.AgentId.Select(x => $"<Agent AgentId=\"{x}\" Currency=\"{currencyItem.CurrencyId}\"/>");
                builder.Append(string.Join("", xmlItemList));
            }

            builder.Append("</ROOT>");

            return builder.ToString();
        }

        private IEnumerable<OneAuthCurrency> GetSelectedCurrencyAgentList(string selectedCurrency)
        {
            if (string.IsNullOrEmpty(selectedCurrency))
            {
                return CurrencyAgentList;
            }

            var selectedCurrencyIdList = selectedCurrency.Trim()
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(x => Convert.ToInt32(x));

            return CurrencyAgentList.Where(x => selectedCurrencyIdList.Contains(x.CurrencyId));
        }
    }
}