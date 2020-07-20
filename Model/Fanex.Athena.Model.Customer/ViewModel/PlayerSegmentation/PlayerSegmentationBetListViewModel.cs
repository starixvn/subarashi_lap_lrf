using Fanex.Athena.Extension.Helper;
using System;

namespace Fanex.Athena.Model.Customer.ViewModel
{
    public class PlayerSegmentationBetListViewModel
    {
        private const int DefaultPageSize = 50;

        public PlayerSegmentationBetListViewModel()
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
            FromDate = DateTimeHelper.StartOfWeek(DateTime.Today, DayOfWeek.Monday);
            ToDate = DateTime.Today;
        }

        public int CustId { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string BaseCurrency { get; set; }
        public bool IsAllowedCustomerComm { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}