using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting
{
    public class UpdateCustomerOddsGroupMetaModel
    {
        public string SiteName { get; set; }

        public int LicenseeCustId { get; set; }

        public string CustIds { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public string Currency { get; set; }

        public string Subsidiary { get; set; }

        public string NewValue { get; set; }

        public string OldValue { get; set; }

        public string IP { get; set; }

        public string Language { get; set; }
    }
}