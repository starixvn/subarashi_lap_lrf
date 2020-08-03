namespace Fanex.Athena.Model.Customer.ViewModel
{
    using Fanex.Athena.Extension.Helper;
    using System;

    public class PlayerSegmentationBetListViewModel
    {
        private const int DefaultPageSize = 50;
        private const int LimitedMonthRange = 6;

        public PlayerSegmentationBetListViewModel()
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
            FromDate = DateTimeHelper.GetFirstDateOfMonth(DateTime.Today.AddMonths(-LimitedMonthRange + 1));
            ToDate = DateTime.Today;
        }

        public int CustId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string BaseCurrency { get; set; }
        public string ExternalId { get; set; }
        public string SystemId { get; set; }
        public bool IsAllowedCustomerComm { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}