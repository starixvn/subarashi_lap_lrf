using System;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Report.ViewModel
{
    public class DailyBetDetailsViewModel
    {
        public IDictionary<int, string> CurrencyList { get; set; }

        public DateTime TodayByGmt8 { get; set; }

        public DateTime MinDate { get; set; }
    }
}