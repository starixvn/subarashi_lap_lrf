using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting
{
    public class CustomerOddsGroupLogResultModel
    {
        public IEnumerable<CustomerOddsGroupLog> DataList { get; set; }

        public int TotalRows { get; set; }
    }
}