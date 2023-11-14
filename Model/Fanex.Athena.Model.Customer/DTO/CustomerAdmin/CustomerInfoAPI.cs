using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerInfoAPI
    {
        public int IbcCustId { get; set; }

        public string UserName { get; set; }

        public string Currency { get; set; }

        public string CurrencyCode { get; set; }

        public string IP { get; set; }

        public string Country { get; set; }

        public DateTime DateOfRegistration { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string PreferredUserName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public bool Active { get; set; }

        public bool Lock { get; set; }

        public string SecurityQuestion { get; set; }

        public static string SecurityCode => "*****";
    }
}