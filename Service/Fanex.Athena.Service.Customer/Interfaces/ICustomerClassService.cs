namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Model.Core.DTO.Common;
    using Model.Customer.DTO;
    using Model.Customer.MetaModel;

    public interface ICustomerClassService
    {
        Task<RiskLevelModel> GetRiskLevelPolicyByCustomerClass(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<RiskLevel>> GetAllRiskLevel();

        Task<IEnumerable<CustomerClassModel>> GetSettingPolicy(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<CustomerClassModel>> GetSpreadSettingPolicy(GetCustomerClassInformationMetaModel metaModel);

        Task<IEnumerable<string>> GetAllCustomerClassId();

        Task<IEnumerable<CustomerClassModel>> GetAllCustomerClass(string language);

        Task<IEnumerable<LeagueGroup>> GetLimitLeagues(GetLimitLeaguesV2MetaModel metaModel);
    }
}