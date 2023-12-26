namespace Fanex.Athena.Model.Customer.MetaModel.CustomerAdmin
{
    public class GetCustomerBetListMetaModel
    {
        private const int DefaultPageSize = 500;

        protected GetCustomerBetListMetaModel()
        {
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderCol = 1;
            SortType = 1;
        }

        public int CustId { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public byte OrderCol { get; set; }

        public byte SortType { get; set; }

        public string SiteName { get; set; }

        public string APISiteId { get; set; }
    }
}