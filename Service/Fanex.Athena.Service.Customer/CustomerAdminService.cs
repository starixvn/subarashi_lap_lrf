using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.DataAccess.Customer.Interfaces;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;
using Fanex.Athena.Service.Customer.Interfaces;

namespace Fanex.Athena.Service.Customer
{
    public class CustomerAdminService : ICustomerAdminService
    {
        private readonly ICustomerAdminDataAccess _customerAdminDataAccess;

        public CustomerAdminService(ICustomerAdminDataAccess customerAdminDataAccess)
        {
            _customerAdminDataAccess = customerAdminDataAccess;
        }

        public Task<CustomerInfo> GetCustomerInfoByUserName(GetCustomerInfoMetaModel metaModel)
            => _customerAdminDataAccess.GetCustomerInfoByUserNameAsync(metaModel);

        public Task<ApiPagingResult<CustomerBetList>> GetBetListByCustId(GetCustomerBetListMetaModel metaModel)
            => _customerAdminDataAccess.GetBetListByCustIdAsync(metaModel);

        public Task<IEnumerable<CustomerDepositHistory>> GetDepositHistoryByCustId(GetCustomerInfoMetaModel metaModel)
            => _customerAdminDataAccess.GetDepositHistoryByCustIdAsync(metaModel);

        public Task<IEnumerable<CustomerWithdrawHistory>> GetWithdrawHistoryByCustId(GetCustomerInfoMetaModel metaModel)
            => _customerAdminDataAccess.GetWithdrawHistoryByCustIdAsync(metaModel);
    }
}