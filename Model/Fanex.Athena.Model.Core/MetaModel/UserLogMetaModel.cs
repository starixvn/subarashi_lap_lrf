namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System;
    using System.Data;

    public class UserLogMetaModel
    {
        public int LicenseeId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DataTable ActionIdList { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}