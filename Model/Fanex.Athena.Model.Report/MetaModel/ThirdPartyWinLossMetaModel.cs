// -----------------------------------------------------------------------
// <copyright file="ThirdPartyWinLossMetaModel.cs" company="Microsoft">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using Fanex.Athena.Model.Core.Helper;
    using System;

    public class ThirdPartyWinLossMetaModel : BaseDrilldownReportMetaModel
    {
        private DateTime? _fromDate;

        private DateTime? _toDate;

        public byte ReportBy { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int FromDay { get; set; }

        public int ToDay { get; set; }

        public new DateTime FromDate
        {
            get { return _fromDate ?? new DateTime(Year, Month, FromDay); }
            set { _fromDate = value; }
        }

        public new DateTime ToDate
        {
            get { return _toDate ?? new DateTime(Year, Month, ToDay); }
            set { _toDate = value; }
        }

        public override bool IsValid
        {
            get
            {
                return MetaModelValidationHelper.ValidateBaseCurrency(BaseCurrency);

            }
        }

        public int ProductId { get; set; }

        public string ProductCode { get; set; }

        public string ProductName { get; set; }

        public string DefaultBaseCurrency { get; set; }

    }
}