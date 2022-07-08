using System;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.ViewModel
{
    public class MonitoredPlayerViewModel
    {
        const int MaxDateLastMonths = 3;

        public MonitoredPlayerViewModel()
        {
            var today = DateTime.Today;
            var minMonth = today.AddMonths(-MaxDateLastMonths);
            FromReachedDate = today;
            ToReachedDate = today;
            MaxReachedDate = today;
            MinReachedDate = new DateTime(minMonth.Year, minMonth.Month, 1);
            IsGetAll = true;
        }

        public bool CanEdit { get; set; }

        public bool IsGetAll { get; set; }

        public DateTime FromReachedDate { get; set; }

        public DateTime ToReachedDate { get; set; }

        public DateTime MaxReachedDate { get; set; }

        public DateTime MinReachedDate { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }
    }
}
