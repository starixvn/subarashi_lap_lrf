namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Threading.Tasks;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;
    using Model.Core.ResultModel;

    public interface ICustomerListService
    {
        Task<ReportResultModel<CustomerDTO>> GetActiveCustomersAsync(CustomerListMetaModel metaModel);

        Task<ReportResultModel<DormantCustomer>> GetDormantCustomersAsync(CustomerListMetaModel metaModel);

        LogInfo GetCustomerLoginInfo(int custId, int licenseeId, string siteName);

        IResultInfo UpdateOddsGroup(CustomerOddsGroupMetaModel metaModel);

        IResultInfo UpdateCustClosed(CustomerStatusMetaModel metaModel);

        IResultInfo UpdateCustSuspend(CustomerStatusMetaModel metaModel);

        IResultInfo UpdateCustomerBAStatus(int licenseeId, int custId, int modifiedBy, bool allowBA, Request request);

        IResultInfo UpdateSpecialLevel(int userId, int custId, int level, string ip, string language);
    }
}
