namespace Fanex.Athena.DataAccess.Customer
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Model.Core.DTO.Common;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;

    public interface ICustomerClassDataAccess
    {
        Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSettingPolicies(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSpreadSettingPolicies(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<CustomerClassLimitPolicyModel>> GetSettingPoliciesMember(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<League>> GetLimitLeagues(GetLimitLeaguesV2MetaModel metaModel);
    }
}