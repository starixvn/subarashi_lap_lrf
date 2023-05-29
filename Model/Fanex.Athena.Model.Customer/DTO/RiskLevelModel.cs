using System.Collections.Generic;
using System.Linq;

namespace Fanex.Athena.Model.Customer.DTO
{
    public class RiskLevelModel
    {
        public IEnumerable<CustomerClassModel> CustomerClass { get; set; } = Enumerable.Empty<CustomerClassModel>();

        public IEnumerable<CustomerClassModel> SpreadSettingPolicies { get; set; } = Enumerable.Empty<CustomerClassModel>();
    }
}