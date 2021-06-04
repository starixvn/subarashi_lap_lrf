using System.Collections.Generic;
using Fanex.Athena.Model.Auth;
using LAP.ONEBook.Security;

namespace Fanex.Athena.Module.PlayerAdmin.Api.MetaModel
{
    public class LRFFiltersMetaModel : ILRFFiltersMetaModel
    {
        public int LicenseeId { get; set; }

        public bool HasCommPermissionRead { get; set; }

        public IEnumerable<OneAuthCurrency> CurrencyAgentList { get; set; }

        public DefaultAuthInfo<OneAuthPermission, OneAuthCurrency> Token { get; set; }

        public Dictionary<int, int[]> GetCurrencyAgentListDict()
        {
            var result = new Dictionary<int, int[]>();
            foreach (var c in CurrencyAgentList)
            {
                result.Add(c.CurrencyId, c.AgentId);
            }

            return result;
        }
    }
}
