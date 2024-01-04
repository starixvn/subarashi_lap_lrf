using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.DTO
{
    public class CustomerClassModel
    {
        public CustomerClassModel(string id)
        {
            Id = id;
            Policies = new List<CustomerClassLimitPolicyModel>();
        }

        public string Id { get; set; }

        public string Category { get; set; }

        public List<CustomerClassLimitPolicyModel> Policies { get; set; }
    }
}