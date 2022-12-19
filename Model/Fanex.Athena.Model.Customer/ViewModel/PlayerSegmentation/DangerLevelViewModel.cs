namespace Fanex.Athena.Model.Customer.ViewModel
{
    using System;
    using System.Collections.Generic;

    public class DangerLevelViewModel
    {
        public DangerLevelViewModel()
        {
            var today = DateTime.Today;
            FromDate = today;
            ToDate = today;
            MaxDate = today;
            MinDate = DateTime.MinValue;
            IsGetAll = true;
        }

        public bool IsGetAll { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public DateTime MaxDate { get; set; }

        public DateTime MinDate { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IDictionary<int, string> LevelList { get; set; }

        public IDictionary<int, string> SportList { get; set; }
    }
}