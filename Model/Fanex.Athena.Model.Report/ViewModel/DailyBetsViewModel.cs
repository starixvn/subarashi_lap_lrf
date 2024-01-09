using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Core.MetaModel.Product;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class DailyBetsViewModel
    {
        public IList<ProductOption> ProductOptions { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IEnumerable<SportGame> SportList { get; set; }

        public DateTime TodayByGmt8 { get; set; }

        public DateTime MinDate { get; set; }

        public bool IsAllowRefNo { get; set; }

        public bool IsShowPayout { get; set; }
    }
}