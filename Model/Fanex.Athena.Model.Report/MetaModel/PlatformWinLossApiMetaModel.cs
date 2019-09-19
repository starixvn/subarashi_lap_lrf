using System.Collections.Generic;

using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class PlatformWinLossApiMetaModel
    {
        public int CurrencyId { get; set; }

        public int PlatformType { get; set; }

        public int DrawFilter { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int FromDay { get; set; }
        public int ToDay { get; set; }
     
        public string AgentListXml { get; set; }

        public IList<ProductOption> ProductOptions { get; set; }

        public IList<Currency> CurrencyList { get; set; }

        public string BaseCurrency { get; set; }

        public string CurrencyName { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public bool HasComm { get; set; }
    }
}
