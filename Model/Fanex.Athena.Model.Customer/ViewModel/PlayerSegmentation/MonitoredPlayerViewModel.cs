using System;
using System.Collections.Generic;
using Fanex.Athena.Extension.Helper;

namespace Fanex.Athena.Model.Customer.ViewModel
{
    public class MonitoredPlayerViewModel
    {
        private const int MaxDateLastMonths = 3;
        private readonly DateTime LaunchDate = DateTimeHelper.CreateDateTime(2022, 10, 12);

        public MonitoredPlayerViewModel()
        {
            var today = DateTimeHelper.Today;
            var minMonth = today.AddMonths(-MaxDateLastMonths);
            var firstDayLastThreeMonth = DateTimeHelper.CreateDateTime(minMonth.Year, minMonth.Month, 1);
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