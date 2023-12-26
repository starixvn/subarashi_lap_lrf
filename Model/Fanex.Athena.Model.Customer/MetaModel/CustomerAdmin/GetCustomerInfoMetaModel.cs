namespace Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin
{
    public class GetCustomerInfoMetaModel
    {
        public int CustId { get; set; }

        public string UserName { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public string BUDate { get; set; }

        public string SiteName { get; set; }

        public string SabaId { get; set; } = string.Empty;
    }
}