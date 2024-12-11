using Fanex.Athena.Model.Core.DTO.Common;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.ViewModel
{
    public class OddsGroupLicenseeSettingViewModel
    {
        public IDictionary<int, string> CurrencyList { get; set; }

        public bool IsOneworksMaster { get; set; }

        public byte SubsidiaryViewType { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }

        public IEnumerable<string> OddsGroup { get; set; }
    }
}