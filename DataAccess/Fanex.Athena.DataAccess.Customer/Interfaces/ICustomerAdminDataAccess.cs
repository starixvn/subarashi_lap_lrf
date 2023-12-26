using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface ICustomerAdminDataAccess
    {
        Task<CustomerInfo> GetCustomerInfoByUserNameAsync(GetCustomerInfoMetaModel metaModel);

        Task<CustomerInfoIvory> GetCustomerInfoIvoryByUserNameAsync(GetCustomerInfoMetaModel metaModel);

        Task<ApiPagingResult<CustomerBetList>> GetBetListByCustIdAsync(GetCustomerBetListMetaModel metaModel);

        Task<IEnumerable<CustomerWithdrawHistory>> GetWithdrawHistoryByCustIdAsync(GetCustomerInfoMetaModel metaModel);

        Task<IEnumerable<CustomerDepositHistory>> GetDepositHistoryByCustIdAsync(GetCustomerInfoMetaModel metaModel);
    }
}