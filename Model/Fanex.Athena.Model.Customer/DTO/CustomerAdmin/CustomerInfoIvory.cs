using Fanex.Athena.Extension.Helper;
using Newtonsoft.Json.Linq;
using System;

namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerInfoIvory
    {
        public CustomerInfoIvory()
        { }

        public CustomerInfoIvory(JToken token)
        {
            Active = token["active"].Value<bool>() ? "Yes" : "No";
            Nationality = token["nationality"].Value<string>();
            Address = token["currentAddress"].Value<string>();
            CustId = token["ibcCustID"].Value<int>();
            Email = token["email"].Value<string>();
            Locked = token["locked"].Value<bool>() ? "Yes" : "No";
            Gender = "-";
            IP = token["registrationIP"].Value<string>();
            Mobile = token["mobile"].Value<string>();
            RegisteredDate = token["dateOfRegistration"].Value<string>();
            DOB = token["dateOfBirth"].Value<string>();
            Occupation = token["occupation"].Value<string>();
            RegisteredUserName = token["registeredName"].Value<string>();
        }

        public int CustId { get; set; }

        public string UserName { get; set; }

        public string RegisteredUserName { get; set; }

        public string Gender { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string Active { get; set; }

        public string Locked { get; set; }

        public string RegisteredDate { get; set; }

        public string IP { get; set; }

        public string DOB { get; set; }

        public string Address { get; set; }

        public string Nationality { get; set; }

        public string Occupation { get; set; }

        public string LicenseeName { get; set; }

        public string APISiteId { get; set; }

        public string SabaId { get; set; }

        public string RegisteredDateString => ConvertHelper.GetDateString(RegisteredDate, "MM/dd/yyyy", "-");

        public string DOBDateString => ConvertHelper.GetDateString(DOB, "MM/dd/yyyy", "-");
    }
}