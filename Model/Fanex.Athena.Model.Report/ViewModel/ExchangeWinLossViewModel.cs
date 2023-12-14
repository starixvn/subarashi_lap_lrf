namespace Fanex.Athena.Model.Report.ViewModel
{
    using System;
    using System.Collections.Generic;
    using Core.DataDomain;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.DTO.Common;
    using Fanex.Athena.Model.Report.Constants;

    public class ExchangeWinLossViewModel
    {
        public ExchangeWinLossViewModel()
        {
            FromDate = DateTimeHelper.Today;
            ToDate = DateTimeHelper.Today;
            ReportBy = ReportByType.Daily;
            DateOptionType = ViewInTypes.SettledAndResettledReport;
            ExcludeTestData = true;
        }

        public SubsidiaryViewType ViewType { get; set; }

        public IEnumerable<CheckedItem> SubsidiaryList { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public byte ReportBy { get; set; }

        public byte DateOptionType { get; set; }

        public bool ExcludeTestData { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public int CurrencyId { get; set; }

        public int LicenseeId { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IDictionary<byte, string> ReportByOption { get; set; }

        public IDictionary<byte, string> DateTypeOption { get; set; }

        public DateTime MinDate { get; set; }

        public DateTime MaxDate { get; set; }
    }
}