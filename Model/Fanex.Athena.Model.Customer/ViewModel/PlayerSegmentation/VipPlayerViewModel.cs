namespace Fanex.Athena.Model.Customer.ViewModel
{
    using Fanex.Athena.Model.Customer.DTO;
    using System.Collections.Generic;

    public class VipPlayerViewModel
    {
        public IDictionary<int, string> VipOptions { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }
    }
}