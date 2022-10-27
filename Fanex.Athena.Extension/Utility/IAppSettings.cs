namespace Fanex.Athena.Extension.Utility
{
    using System;
    using System.Collections.Generic;

    public interface IAppSettings
    {
        bool HasAmountDueToColumn { get; }

        string BetListApiHostUrl { get; }

        string OfferCryptoCurrencyLicensees { get; }

        bool IsProduction { get; }

        bool IsDisableExportLargeBetList { get; }

        IEnumerable<string> LicenseesWithLargeData { get; }

        IEnumerable<int> LicenseeOfferNewForecast { get; }

        IEnumerable<int> LicenseeAllowCasinoTransfer { get; }

        IEnumerable<int> LicenseeOfferStatusFunction { get; }

        string ExchangeProductApiHost { get; }

        string ResultAmendmentApiUrl { get; }

        string MarkNotificationAsReadApiUrl { get; }

        string ResultAmendmentAttachmentApiUrl { get; }

        bool IsEnabledMoveBetNotification { get; }

        string DefaultBaseCurrency { get; }

        bool EnableAssignCurrency { get; }

        bool EnableSessionValidatingService { get; }

        string Environment { get; }

        DateTime HistoryDate { get; }

        bool IsShowMixedSport { get; }

        bool IsShowAllDataForSettleMatchCountReport { get; }

        IEnumerable<int> LiveReportNoDetailLinkSports { get; }

        bool LocalTest { get; }

        DateTime MaxDate { get; }

        string RemoteRefUrl { get; }

        string TempFilePath { get; }

        string GetValue(string key);

        int BetListApiClientTimeOutMinutes { get; }

        IEnumerable<string> ListActionNoView { get; }

        string BetTicketEventBuilderUrl { get; }

        bool IsUseCtsApi { get; }
    }
}