namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Customer.DTO;

    public class VipPlayerViewModel
    {
        public VipPlayerViewModel()
        {
            var today = DateTimeHelper.Today;
            var firstDayOfMonth = new DateTime(today.Year, today.Month, 1);

            FromReachedDate = firstDayOfMonth;
            ToReachedDate = today;
            MaxReachedDate = today;
            MinReachedDate = new DateTime(2012, 1, 1); // 01/01/2012
        }

        public IDictionary<int, string> VipOptions { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IEnumerable<RiskLevel> RiskLevels { get; set; }

        public DateTime FromReachedDate { get; set; }

        public DateTime ToReachedDate { get; set; }

        public DateTime MaxReachedDate { get; set; }

        public DateTime MinReachedDate { get; set; }
    }
}