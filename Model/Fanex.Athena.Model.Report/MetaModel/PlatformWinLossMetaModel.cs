// -----------------------------------------------------------------------
// <copyright file="PlatformWinLossMetaModel.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.DataDomain;
    using Fanex.Athena.Model.Core.MetaModel;
    using DataDomain = Core.DataDomain;

    public class PlatformWinLossMetaModel : BaseReportMetaModel
    {
        public PlatformWinLossMetaModel()
        {
            LicenseeId = 0;
            var today = DateTime.Now;
            Year = today.Year;
            Month = today.Month;
            FromDay = 1;
            ToDay = today.Day;
            CurrencyId = 0;
            DrawFilter = DataDomain.DrawFilterType.Normal;
            PlatformType = DataDomain.PlatformType.All;
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

        public int PlatformType { get; set; }

        public string SortBy { get; set; }

        public string SortOrder { get; set; }

        public override bool IsValid
        {
            get
            {
                return base.IsValid && DataDomain.PlatformType.IsValidPlatform(PlatformType);
            }
        }

        public bool HasComm { get; set; }
    }
}