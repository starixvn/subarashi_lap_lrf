using System;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.ViewModel
{
    public class MonitoredPlayerViewModel
    {
        const int MaxDateLastMonths = 3;
        private readonly DateTime LaunchDate = new DateTime(2022, 10, 12);

        public MonitoredPlayerViewModel()
        {
            var today = DateTime.Today;
            var minMonth = today.AddMonths(-MaxDateLastMonths);
            var firstDayLastThreeMonth = new DateTime(minMonth.Year, minMonth.Month, 1);
            FromReachedDate = today;
            ToReachedDate = today;
            MaxReachedDate = today;
            MinReachedDate = LaunchDate > firstDayLastThreeMonth ? LaunchDate : firstDayLastThreeMonth;
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
