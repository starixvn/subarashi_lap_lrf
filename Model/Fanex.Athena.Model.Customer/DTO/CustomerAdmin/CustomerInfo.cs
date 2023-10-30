using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerInfo
    {
        public int CustId { get; set; }

        public string UserName { get; set; }

        public string CurrencyCode { get; set; }

        public string IP { get; set; }

        public string Country { get; set; }

        public DateTime RegisteredDate { get; set; }

        public string RegisteredDateString => RegisteredDate.ToString("MM/dd/yyyy");
    }
}