using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class DailyBetsMetaModel : IMetaModelCurrencyList
    {
        public string SiteName { get; set; }

        public DateTime Date { get; set; }

        public string ProductCodes { get; set; }

        public string SelectedCurrency { get; set; }

        public IEnumerable<Currency> CurrencyList { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public bool IsExportExcel { get; set; }

        public string BaseCurrency => "USD";
    }
}