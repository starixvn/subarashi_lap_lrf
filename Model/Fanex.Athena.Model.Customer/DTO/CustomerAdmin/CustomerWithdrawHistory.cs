using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerWithdrawHistory
    {
        public string TransID { get; set; }

        public DateTime TransDate { get; set; }

        public decimal Amount { get; set; }

        public string Remark { get; set; }

        public string TransDateString => TransDate.ToString("yyyy-MM-dd hh:mm:ss tt");
    }
}