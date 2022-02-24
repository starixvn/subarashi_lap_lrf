namespace Fanex.Athena.Service.Customer
{
    using System.Threading.Tasks;
    using DataAccess.Customer.Interfaces;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Fanex.Athena.Service.Customer.Interfaces;
    using Model.Core.ResultModel;

    public class CustomerListService : ICustomerListService
    {
        private readonly ICustomerListDataAccess _customerListDataAccess;
        private readonly IDormantCustomerListDataAccess _dormantCustomerListDataAccess;

        public CustomerListService(
            ICustomerListDataAccess customerListDataAccess,
            IDormantCustomerListDataAccess dormantCustomerListDataAccess
            )
        {
            _customerListDataAccess = customerListDataAccess;
            _dormantCustomerListDataAccess = dormantCustomerListDataAccess;
        }

        public async Task<ReportResultModel<CustomerDTO>> GetActiveCustomersAsync(CustomerListMetaModel metaModel)
        {
            return await _customerListDataAccess.GetActiveCustomers(metaModel).ConfigureAwait(false);
        }

        public async Task<ReportResultModel<DormantCustomer>> GetDormantCustomersAsync(CustomerListMetaModel metaModel)
        {
            return await _dormantCustomerListDataAccess.GetDormantCustomers(metaModel).ConfigureAwait(false);
        }

        public LogInfo GetCustomerLoginInfo(int custId, int licenseeId, string siteName)
        {
            return _customerListDataAccess.GetCustomerLoginInfo(custId, licenseeId, siteName);
        }

        public IResultInfo UpdateOddsGroup(CustomerOddsGroupMetaModel metaModel)
        {
            return _customerListDataAccess.UpdateOddsGroup(metaModel);
        }

        public IResultInfo UpdateCustClosed(CustomerStatusMetaModel metaModel)
            => _customerListDataAccess.UpdateCustClosed(metaModel);

        public IResultInfo UpdateCustSuspend(CustomerStatusMetaModel metaModel)
            => _customerListDataAccess.UpdateCustSuspend(metaModel);

        public IResultInfo UpdateCustomerBAStatus(
            int licenseeId,
            int custId,
            int modifiedBy,
            bool allowBA,
            Request request)
        {
            var result = _customerListDataAccess.UpdateCustomerBAStatus(licenseeId, custId, modifiedBy, allowBA, request);
            return result;
        }

        public IResultInfo UpdateSpecialLevel(int userId, int custId, int level, string ip, string language)
        {
            return _customerListDataAccess.UpdateSpecialLevel(userId, custId, level, ip, language);
        }
    }
}
