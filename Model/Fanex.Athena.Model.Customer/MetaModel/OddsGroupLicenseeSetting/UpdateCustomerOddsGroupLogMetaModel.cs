using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.Customer.MetaModel.OddsGroupLicenseeSetting
{
    public class UpdateCustomerOddsGroupLogMetaModel
    {
        public int LicenseeCustId { get; set; }

        public int UserId { get; set; }

        public int CustId { get; set; }

        public string UserName { get; set; }

        public int ActionId { get; set; }

        public string SiteName { get; set; }

        public string Subsidiary { get; set; }

        public string Currency { get; set; }

        public int ActionDetailId { get; set; }

        public string NewValue { get; set; }

        public string OldValue { get; set; }
    }
}