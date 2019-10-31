using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class DailyBetsViewModel
    {
        private const byte LimitedMonthRange = 3;

        public IList<ProductOption> ProductOptions { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public DateTime TodayByGmt8 { get; set; }

        public DateTime MinDate => TodayByGmt8.AddMonths(-LimitedMonthRange);
    }
}