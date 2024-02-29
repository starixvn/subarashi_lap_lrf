using System;
using Newtonsoft.Json.Linq;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerInfo
    {
        private const string DefaultValue = "-";

        public CustomerInfo()
        { }

        public CustomerInfo(JToken token)
        {
            Active = token["Active"].Value<bool>() ? "Yes" : "No";
            Country = token["Country"].Value<string>();
            CurrencyCode = token["CurrencyCode"].Value<string>();
            CustId = token["IbcCustId"].Value<int>();
            Email = token["Email"].Value<string>();
            FirstName = token["FirstName"].Value<string>();
            LastName = token["LastName"].Value<string>();
            Locked = token["Lock"].Value<bool>() ? "Yes" : "No";
            Gender = token["Gender"].Value<string>();
            IP = token["IP"].Value<string>();
            Mobile = token["Mobile"].Value<string>();
            PreferredUserName = token["PreferredUserName"].Value<string>();
            RegisteredDate = token["DateOfRegistration"].Value<DateTime>();
            SecurityQuestion = token["SecurityQuestion"].Value<string>();
            UserName = token["UserName"].Value<string>();
            Address = token["Address"].Value<string>();
            Occupation = token["Occupation"].Value<string>();
            SourceOfFunds = token["SourceOfFunds"].Value<string>();
            SecurityCode = "*****";
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

        public string Address { get; set; } = DefaultValue;

        public string Occupation { get; set; } = DefaultValue;

        public string SourceOfFunds { get; set; } = DefaultValue;

        public string RegisteredDateString => RegisteredDate.ToString("MM/dd/yyyy");
    }
}