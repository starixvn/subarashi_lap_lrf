using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Customer.DTO
{
    public class RiskLevelModel
    {
        public IEnumerable<CustomerClassLimitPolicyModel> CustomerClassLimitPolicies { get; set; } = Enumerable.Empty<CustomerClassLimitPolicyModel>();

        public IEnumerable<CustomerClassSitePolicyMemberModel> SiteMemberPolicies { get; set; } = Enumerable.Empty<CustomerClassSitePolicyMemberModel>();
    }
}