using Fanex.Athena.Model.Core.DTO.Common;

namespace Fanex.Athena.Model.Customer.DTO.OddsGroupLicenseeSetting
{
    public class CustomerOddsGroupViewModel : ICurrencyInfo
    {
        public string Custids { get; set; }

        public string Subsidiary { get; set; }

        public string OddsGroup { get; set; }

        public int CurrencyId { get; set; }

        public string Currency { get; set; }

        public string Status { get; set; }
    }
}