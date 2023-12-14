using System.Threading.Tasks;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.Enum;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;

namespace Fanex.Athena.Service.Customer.Interfaces
{
    public interface ICustomerAdminAPIService
    {
        Task<CustomerInfo> GetCustomerInfoByUserName(GetCustomerInfoMetaModel metaModel);

        CustomerInfoIvory GetCustomerInfoIvoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName);

        IEnumerable<CustomerDepositHistory> GetIvoryDepositHistoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName);

        IEnumerable<CustomerWithdrawHistory> GetIvoryWithdrawHistoryByUserName(GetCustomerInfoMetaModel metaModel, string siteName);
    }
}