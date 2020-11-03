using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.DTO
{
    public class CustomerClassModel
    {
        public CustomerClassModel(string id)
        {
            Id = id;
            LimitPolicies = new List<CustomerClassLimitPolicyModel>();
            OddsGroup = "-";
        }

        public string Id { get; set; }

        public string OddsGroup { get; set; }

        public List<CustomerClassLimitPolicyModel> LimitPolicies { get; set; }
    }
}
