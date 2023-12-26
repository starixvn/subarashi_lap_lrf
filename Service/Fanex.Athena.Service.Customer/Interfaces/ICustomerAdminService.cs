using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;

namespace Fanex.Athena.Service.Customer.Interfaces
{
    public interface ICustomerAdminService
    {
        Task<CustomerInfo> GetCustomerInfoByUserName(GetCustomerInfoMetaModel metaModel);

        Task<CustomerInfoIvory> GetCustomerInfoIvoryByUserName(GetCustomerInfoMetaModel metaModel);

        Task<ApiPagingResult<CustomerBetList>> GetBetListByCustId(GetCustomerBetListMetaModel metaModel);

        Task<IEnumerable<CustomerDepositHistory>> GetDepositHistoryByCustId(GetCustomerInfoMetaModel metaModel);

        Task<IEnumerable<CustomerWithdrawHistory>> GetWithdrawHistoryByCustId(GetCustomerInfoMetaModel metaModel);
    }
}