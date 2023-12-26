using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class IvoryFinancialLog
    {
        public string TransID { get; set; }

        public DateTime Time { get; set; }

        public decimal Amount { get; set; }

        public string Remark { get; set; }

        public int FinancialType { get; set; }
    }
}