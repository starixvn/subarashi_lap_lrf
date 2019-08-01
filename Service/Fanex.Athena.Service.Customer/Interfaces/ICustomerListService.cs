// -----------------------------------------------------------------------
// <copyright file="ICustomerService.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Service.Customer.Interfaces
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    #region Using

    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Customer.DTO;
    using Fanex.Athena.Model.Customer.MetaModel;

    using Model.Core.ResultModel;

    #endregion Using

    public interface ICustomerListService
    {
        Task<ReportResultModel<CustomerDTO>> GetActiveCustomersAsync(CustomerListMetaModel metaModel);

        Task<ReportResultModel<DormantCustomer>> GetDormantCustomersAsync(CustomerListMetaModel metaModel);

        LogInfo GetCustomerLoginInfo(int custId, int licenseeId, string siteName);

        IResultInfo UpdateOddsGroup(CustomerOddsGroupMetaModel metaModel);

        Task<IResultInfo> UpdateCustClosedAsync(CustomerStatusMetaModel metaModel, string languageCode);

        Task<IResultInfo> UpdateCustSuspendAsync(CustomerStatusMetaModel metaModel, string languageCode);

        IResultInfo UpdateCustomerBAStatus(int licenseeId, int custId, int modifiedBy, bool allowBA, Request request);

        IResultInfo UpdateSpecialLevel(int userId, int custId, int level, string ip, string language);
    }
}