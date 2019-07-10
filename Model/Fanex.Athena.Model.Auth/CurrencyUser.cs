using System.Collections.Generic;

namespace Fanex.Athena.Model.Auth
{
    public class CurrencyUser
    {
        public CurrencyUser()
        {
            CurrencyId = 0;
        }

        public int CurrencyId { get; set; }

        public string CurrencyName { get; set; }

        public bool IsActive { get; set; }

        public int AgentId { get; set; }

        public IEnumerable<int> AgentIdList { get; set; }
    }
}