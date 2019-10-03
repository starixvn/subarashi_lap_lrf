namespace Fanex.Athena.Extension.Utility
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;

    public interface IAppSettings
    {
        bool HasAmountDueToColumn { get; }

        [SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        string BetListApiHostUrl { get; }

        bool IsProduction { get; }

        bool IsDisableExportLargeBetList { get; }

        IEnumerable<string> LicenseesWithLargeData { get; }

        IEnumerable<int> LicenseeOfferNewForecast { get; }

        IEnumerable<int> LicenseeAllowCasinoTransfer { get; }

        IEnumerable<int> LicenseeOfferStatusFunction { get; }

        string ExchangeProductApiHost { get; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        string ResultAmendmentApiUrl { get; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        string MarkNotificationAsReadApiUrl { get; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        string ResultAmendmentAttachmentApiUrl { get; }

        bool IsEnabledMoveBetNotification { get; }

        string DefaultBaseCurrency { get; }

        bool EnableAssignCurrency { get; }

        bool EnableSessionValidatingService { get; }

        string Environment { get; }

        DateTime HistoryDate { get; }

        bool IsDisableRngCasino { get; }

        bool IsShowMixedSport { get; }

        bool IsShowAllDataForSettleMatchCountReport { get; }

        IEnumerable<int> LiveReportNoDetailLinkSports { get; }

        bool LocalTest { get; }

        DateTime MaxDate { get; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Sonar Code Smell", "S3996:UriPropertiesShouldNotBeStrings",
            Justification = "Reviewed. Suppression is OK here.")]
        string RemoteRefUrl { get; }

        string TempFilePath { get; }

        string GetValue(string key);

        int BetListApiClientTimeOutMinutes { get; }
    }
}