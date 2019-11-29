using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DataDomain;
using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Report.MetaModel
{
    public class DailyBetsMetaModel : IMetaModelProductCodeList, IMetaModelCurrencyIdList, IMetaModelValidation, IMetaModelCurrencyList
    {
        public string SiteName { get; set; }

        public DateTime Date { get; set; }

        public string ProductCodeList { get; set; }

        public string CurrencyIdList { get; set; }

        public IEnumerable<Currency> CurrencyList { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public bool IsExportExcel { get; set; }

        public static string BaseCurrency
        {
            get
            {
                const string usd = "USD";
                return usd;
            }
        }

        public bool IsValid => !string.IsNullOrWhiteSpace(ProductCodeList) && !string.IsNullOrWhiteSpace(CurrencyIdList);
    }
}