namespace Fanex.Athena.Model.Customer.DTO.CustomerAdmin
{
    public class CustomerDetailInfo
    {
        public int CustId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string PreferredUserName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public bool Active { get; set; }

        public bool Locked { get; set; }

        public string SecurityQuestion { get; set; }

        public string SecurityCode { get; set; }
    }
}