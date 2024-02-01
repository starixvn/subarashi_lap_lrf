namespace Fanex.Athena.Model.Auth.DataDomain
{
    public static class PermissionKeys
    {
        public const string GroupTotalBet = "TOTALBETS1";
        public const string GroupForecast = "FORECAST2";
        public const string GroupReport = "REPORTS3";
        public const string GroupCustomerReport = "CUSTOMERREPORTS52";
        public const string GroupCustomerInformation = "CUSTOMERINFORMATION4";
        public const string GroupAccountManagement = "ACCOUNTMANAGEMENT6";
        public const string Subsidiary = "SUBSIDIARY";

        /* Total Bet */

        public const string TotalBetHandicapOverUnderLive = "HandicapOverUnderLive7";
        public const string TotalBetMoneyLine = "MoneyLine8";
        public const string TotalBetOddEven1x2DND = "OddEven1x2DND9";
        public const string TotalBetCorrectScore = "CorrectScore10";
        public const string TotalBetTotalGoal = "TotalGoal11";
        public const string TotalBetMixParlay = "MixParlay12";
        public const string TotalBetOutright = "Outright13";
        public const string TotalBetHalfTimeFullTime = "HTFT14";
        public const string TotalBetFirstGoalLastGoal = "FGLG15";
        public const string TotalBetCleanSheet = "CleanSheet16";
        public const string TotalBetDoubleChance = "DoubleChance17";
        public const string TotalBetHomeDrawAwayNoBet = "HomeDrawAwayNoBet18";
        public const string TotalBetBONTeamToScore = "BONteamtoscore19";
        public const string TotalBetToWinToNil = "Towintonil20";
        public const string TotalBet3WayHandicap = "3-WayHandicap21";

        /* Forecast */

        public const string ForecastHandicapOverUnderLive = "HandicapOverUnderLive24";
        public const string ForecastOneXTwo = "1X225";

        /* Report */

        public const string ReportGodOfFortuneWinLoss = "GodOfFortuneWinLoss";
        public const string ReportSabaVirtualSportsWinLoss = "SabaVirtualSportsWinLoss";
        public const string ReportLastBetsMonitoring = "LastBetsMonitoring26";
        public const string ReportLicenseeWinLoss = "LicenseeWinLoss27";
        public const string AuditLicenseeWinLoss = "AuditLicenseeWinLoss";
        public const string ReportSettledMatchCount = "SettledMatchCount28";
        public const string ReportCustomerWinLoss = "CustomerWinLoss29";
        public const string ReportCustomerPendingFunds = "CustomerPendingFunds30";
        public const string ReportMatchWinLoss = "MatchWinLoss31";
        public const string ReportWinLossByProduct = "WinLossByProducts32";
        public const string ReportWinLossByBetType = "WinLossByBetType33";
        public const string ReportLiveReport = "LiveReport38";
        public const string ReportTurnover = "Turnover39";
        public const string ReportCustomerBalance = "CustomerBalance40";
        public const string ReportResults = "Results41";
        public const string ReportAGCasinoWinLoss = "AGCasinoWinLoss62";
        public const string ReportAGCasinoBalance = "AGCasinoBalance63";
        public const string ReportWeeklyLiveMatches = "WeeklyLiveMatches69";
        public const string ReportCustomerTurnover = "CustomerTurnover51";
        public const string ReportPlatformWinLoss = "MobileWinLoss53";
        public const string ReportSubsidiaryPerformance = "SubsidiaryPerformance73";
        public const string ReportLicenseeWinLossByTimeZone = "LicenseeWinLossByTimeZone76";
        public const string ReportExchangeWinLoss = "ExchangeWinloss77";
        public const string ReportCasinoTurnover = "CasinoTurnover80";
        public const string ReportDailyBets = "DailyBets81";
        public const string ReportLeagueWinLoss = "LeagueWinLoss";
        public const string ReportCustomerSupportTask = "CustomerSupportTask";
        public const string ReportExtraPayout = "ExtraPayout";
        public const string ReportNewCashOutWinLoss = "NewCashOutWinLoss";
        public const string ReportAbnormalBet = "AbnormalBet";
        public const string ReportGrossGamingRevenue = "GrossGamingRevenue";
        public const string ReportWinlossAnalysis = "WinlossAnalysis";
        public const string ReportDailyBetDetails = "DailyBetDetails";

        /* Customer Info. */

        public const string CustomerInfoSpecialBA = "SpecialBA54";
        public const string CustomerInfoCommissionGroupList = "CommissionGroupList55";
        public const string CustomerInfoCustomerLog = "CustomerLog56";

        /* PlayerSegmentation */

        public const string PlayerSegmentation = "PlayerSegmentation";
        public const string PlayerProblemManagement = "PlayerSegmentation_ProblemManagement";
        public const string PlayerVIPManagement = "PlayerSegmentation_VIPManagement";
        public const string PlayerVIPManagement_Write = "PlayerSegmentation_VIPManagement_Write";
        public const string MonitoredPlayer = "PlayerSegmentation_MonitoredPlayer";
        public const string MonitoredPlayer_Write = "PlayerSegmentation_MonitoredPlayer_Write";
        public const string SabaVirtualSetting = "PlayerSegmentation_SabaVirtualSetting";

        /* Account. */

        public const string AccountManageAccount = "ManageAccount46";

        /*Notification*/

        public const string Bell = "Bell";
        public const string ResultAmendmentNotificationReport = "ResultAmendment_Recalculation75";

        public const string BettingTicketCenter = "BTC79";
        public const string BtcAdvancedSearch = "BTC_MultiCustomer";
        public const string BtcSingleCustomer = "BTC_SingleCustomer";
        public const string BtcRefNo = "BTC_RefNo";
        public const string BtcRunning = "BTC_Running";

        /*BetList*/
        public const string BetlistViewIpvn = "bl_view_ipvn";

        /*Contacts*/
        public const string LicenseeContacts = "LicenseeContacts";

        /*Report's Data Control*/
        public const string HidePlayerWL_WL_Comm_Total = "HidePlayerWL_WL_Comm_Total";
        public const string DisplayPlayerTips_ExtraPayoutReportOnly = "DisplayPlayerTips_ExtraPayoutReportOnly";

        /*Customer Administration*/
        public const string PlayerReport = "PlayerReport";
    }
}