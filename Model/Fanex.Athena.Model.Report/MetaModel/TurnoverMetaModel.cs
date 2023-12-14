namespace Fanex.Athena.Model.Report.MetaModel
{
    using System;
    using Fanex.Athena.Extension.Helper;

    public class TurnoverMetaModel : BaseReportMetaModel
    {
        public TurnoverMetaModel()
        {
            Year = DateTimeHelper.Today.Year;
            Month = DateTimeHelper.Today.Month;
            FromDay = 1;
            ToDay = DateTimeHelper.Today.Day;
            IsExcludedTestData = true;
        }

        public int FromDay { get; set; }

        public int ToDay { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public new DateTime FromDate
        {
            get
            {
                return new DateTime(Year, Month, FromDay);
            }
        }

        public new DateTime ToDate
        {
            get
            {
                return new DateTime(Year, Month, ToDay);
            }
        }

        public string Username { get; set; }
    }
}