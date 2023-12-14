namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Core.MetaModel.Product;
    using Fanex.Athena.Extension.Helper;

    public class LicenseeWinLossByTimeZoneViewModel
    {
        public DateTime FromDate { get; set; } = DateTimeHelper.Today;

        public DateTime ToDate { get; set; } = DateTimeHelper.Today;

        public IEnumerable<ProductOption> ProductOptionList { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }
    }
}