namespace Fanex.Athena.Module.Notification.MetaModel
{
    using System;
    using Extension.Helper;
    using Fanex.Athena.Model.Core.MetaModel;

    public class NotificationMetaModel : IMetaModelValidation, IMetaModelAgent
    {
        public int MaximumMonthRange { get; set; } = 6;

        public string UserName { get; set; }

        public string MessageTypes { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int Type { get; set; }

        public string LicenseeName { get; set; }

        public bool IsOnlyUnread { get; set; }

        public string Language { get; set; }

        public string AgentListXml { get; set; }

        public bool IsExcludedTestData { get; set; }

        public bool IsValid => DateTimeHelper.IsValidMonthRange(FromDate, ToDate, MaximumMonthRange);
    }
}