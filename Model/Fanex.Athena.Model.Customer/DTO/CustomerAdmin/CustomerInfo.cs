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

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string PreferredUserName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string Active { get; set; }

        public string Locked { get; set; }

        public string SecurityQuestion { get; set; }

        public string SecurityCode { get; set; }

        public string RegisteredDateString => RegisteredDate.ToString("MM/dd/yyyy");
    }
}