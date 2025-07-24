using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting;
using Fanex.Athena.Model.Report.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Fanex.Athena.Service.Customer.Interfaces
{
    public interface IOddsGroupLicenseeSettingService
    {
        Task<IEnumerable<CustomerOddsGroupViewModel>> GetCustomerOddsGroup(GetCustomerOddsGroupMetaModel metaModel, IEnumerable<Subsidiary> subsidiaries, IDictionary<int, string> currencyList);

        Task<IResultInfo> UpdateCustomerOddsGroup(UpdateCustomerOddsGroupMetaModel metaModel);

        void WriteCustomerOddsGroupLog(UpdateCustomerOddsGroupMetaModel metaModel);

        IResultInfo CheckAllowedDownlines(UpdateCustomerOddsGroupMetaModel metaModel);

        Task<CustomerOddsGroupLogResultModel> GetLoglist(UserLogMetaModel model);
    }
}