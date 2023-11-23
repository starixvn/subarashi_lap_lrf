using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.CustomerAdmin;
using Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin;

namespace Fanex.Athena.Service.Customer.Interfaces
{
    public interface ICustomerAdminAPIService
    {
        Task<CustomerInfo> GetCustomerInfoByUserName(GetCustomerInfoMetaModel metaModel);
    }
}