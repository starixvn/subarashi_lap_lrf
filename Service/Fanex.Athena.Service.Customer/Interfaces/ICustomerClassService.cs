namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;

    public interface ICustomerClassService
    {
        Task<RiskLevelModel> GetRiskLevelPolicyByCustomerClass(GetCustomerClassInformationMetaModel metaModel, string customerClass);

        Task<IEnumerable<RiskLevel>> GetAllRiskLevel();

        Task<IEnumerable<CustomerClassModel>> GetSettingPolicy(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<CustomerClassModel>> GetSpreadSettingPolicy(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<string>> GetAllCustomerClassId();

        Task<IEnumerable<CustomerClassModel>> GetAllCustomerClass(string language);
    }
}