namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Fanex.Athena.Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using DataDomain = Core.DataDomain;
    using Helper = Core.Helper;

    public class PlatformWinLossMetaModel : BaseReportMetaModel, IMetaModelSubsidiarySearch
    {
        public PlatformWinLossMetaModel()
        {
            LicenseeId = 0;
            var today = DateTimeHelper.Now;
            Year = today.Year;
            Month = today.Month;
            FromDay = 1;
            ToDay = today.Day;
            CurrencyId = 0;
            DrawFilter = DataDomain.DrawFilterType.Normal;
            PlatformType = string.Empty;
            IsExcludedTestData = true;
        }

        public int Level { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int FromDay { get; set; }

        public int ToDay { get; set; }

        public new DateTime FromDate
        {
            get { return new DateTime(Year, Month, FromDay); }
        }

        public new DateTime ToDate
        {
            get { return new DateTime(Year, Month, ToDay); }
        }

        public int DrawFilter { get; set; }

        public string PlatformType { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && Helper.PlatformHelper.IsValidPlatform(PlatformType);
            }
        }

        public bool HasComm { get; set; }

        public string SubsidiaryList { get; set; }

        public bool SubsidiarySearch { get; set; }
    }
}