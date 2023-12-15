namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.Extension.Helper;

    public class ProblemPlayerViewModel
    {
        public ProblemPlayerViewModel()
        {
            var today = DateTimeHelper.Today;
            FromDate = today;
            ToDate = today;
            MaxDate = today;
            MinDate = DateTimeHelper.CreateDateTime(2012, 1, 1); // 01/01/2012
            IsGetAll = true;
        }

        public bool IsGetAll { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime MaxDate { get; set; }

        public DateTime MinDate { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IDictionary<int, string> ReasonList { get; set; }

        public IEnumerable<string> CustomerClass { get; set; }
    }
}