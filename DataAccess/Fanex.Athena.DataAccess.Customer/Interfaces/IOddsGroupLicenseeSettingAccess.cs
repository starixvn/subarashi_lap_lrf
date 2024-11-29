using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.DataAccess.Customer.Interfaces
{
    public interface IOddsGroupLicenseeSettingDataAccess
    {
        Task<IEnumerable<CustomerOddsGroup>> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel metaModel);

        IResultInfo UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel metaModel, int custId);

        IResultInfo CheckAllowedDownlines(UpdateCustomerOddsGroupMetaModel metaModel);
    }
}