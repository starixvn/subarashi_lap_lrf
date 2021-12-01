namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;

    public class CustomerBalanceMetaModel : BaseReportMetaModel
    {
        public CustomerBalanceMetaModel()
        {
            FromDate = ToDate = DateTime.Today;
            PageIndex = 1;
            PageSize = DefaultPageSize;
            OrderItem = 1;
            IsExcludedTestData = true;
        }

        public int TopCount { get; set; }

        public short OrderItem { get; set; }

        public bool IsAllowedBA { get; set; }

        public bool IsEnableSingleWallet { get; set; }

        public bool HasComm { get; set; }
    }
}