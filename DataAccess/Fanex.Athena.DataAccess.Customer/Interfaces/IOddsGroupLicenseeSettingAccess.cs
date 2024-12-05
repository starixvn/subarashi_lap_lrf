using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface IOddsGroupLicenseeSettingDataAccess
    {
        Task<IEnumerable<CustomerOddsGroup>> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel metaModel);

        Task<IResultInfo> UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel metaModel, int custId, CancellationToken cancellationToken);

        IResultInfo CheckAllowedDownlines(UpdateCustomerOddsGroupMetaModel metaModel);
    }
}