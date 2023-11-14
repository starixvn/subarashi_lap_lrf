using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerInfo
    {
        public CustomerInfo()
        { }

        public CustomerInfo(CustomerInfoAPI customerInfoAPI)
        {
            Active = customerInfoAPI.Active ? "Yes" : "No";
            Country = customerInfoAPI.Country;
            CurrencyCode = customerInfoAPI.CurrencyCode;
            CustId = customerInfoAPI.IbcCustId;
            Email = customerInfoAPI.Email;
            FirstName = customerInfoAPI.FirstName;
            LastName = customerInfoAPI.LastName;
            Locked = customerInfoAPI.Lock ? "Yes" : "No";
            Gender = customerInfoAPI.Gender;
            IP = customerInfoAPI.IP;
            Mobile = customerInfoAPI.Mobile;
            PreferredUserName = customerInfoAPI.PreferredUserName;
            RegisteredDate = customerInfoAPI.DateOfRegistration;
            SecurityQuestion = customerInfoAPI.SecurityQuestion;
            UserName = customerInfoAPI.UserName;
            SecurityCode = CustomerInfoAPI.SecurityCode;
        }

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