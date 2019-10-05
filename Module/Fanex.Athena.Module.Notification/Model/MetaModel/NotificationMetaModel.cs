namespace Fanex.Athena.Module.Notification.MetaModel
{
    using Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class NotificationMetaModel : IMetaModelValidation
    {
        private const int MaximumMonthRangeConst = 6;

        public static int MaximumMonthRange => MaximumMonthRangeConst;

        public int LicenseeId { get; set; }

        public string UserName { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int Type { get; set; }

        public string LicenseeName { get; set; }

        public bool IsOnlyUnread { get; set; }

        public string Language { get; set; }

        public bool IsValid => DateTimeHelper.IsValidMonthRange(FromDate, ToDate, MaximumMonthRange);
    }
}