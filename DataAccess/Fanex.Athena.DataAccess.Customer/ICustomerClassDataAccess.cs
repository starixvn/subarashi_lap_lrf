using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Customer.DTO;
using Fanex.Athena.Model.Customer.MetaModel;

namespace Fanex.Athena.DataAccess.Customer
{
    public interface ICustomerClassDataAccess
    {
        Task<IEnumerable<CustomerClassLimitPolicyModel>> GetLimitPolicies(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<CustomerClassModel>> GetGroupPolicies(GetCustomerClassInformationMetaModel metaModel);
    }
}
