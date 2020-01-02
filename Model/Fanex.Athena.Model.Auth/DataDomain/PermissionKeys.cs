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

        public const string ReportLastBetsMonitoring = "LastBetsMonitoring26";
        public const string ReportLicenseeWinLoss = "LicenseeWinLoss27";
        public const string ReportSettledMatchCount = "SettledMatchCount28";
        public const string ReportCustomerWinLoss = "CustomerWinLoss29";
        public const string ReportCustomerPendingFunds = "CustomerPendingFunds30";
        public const string ReportMatchWinLoss = "MatchWinLoss31";
        public const string ReportWinLossByProduct = "WinLossByProducts32";
        public const string ReportWinLossByBetType = "WinLossByBetType33";
        public const string ReportCancelledBets = "CancelledBets36";
        public const string ReportDailyBetList = "DailyBetList37";
        public const string ReportLiveReport = "LiveReport38";
        public const string ReportTurnover = "Turnover39";
        public const string ReportCustomerBalance = "CustomerBalance40";
        public const string ReportResults = "Results41";
        public const string ReportWinLossByLeague = "WinLossByLeague59";
        public const string ReportAGCasinoWinLoss = "AGCasinoWinLoss62";
        public const string ReportAGCasinoBalance = "AGCasinoBalance63";
        public const string ReportActiveCustomerSummary = "ActiveCustomerSummary64";
        public const string ReportGoldDeluxeWinloss = "GoldDeluxeWinloss65";
        public const string ReportWeeklyLiveMatches = "WeeklyLiveMatches69";
        public const string ReportCustomerTurnover = "CustomerTurnover51";
        public const string ReportPlatformWinLoss = "MobileWinLoss53";
        public const string ReportColossusBetsWinLoss = "ColossusBetsWinLoss71";
        public const string ReportCashOutWinLoss = "CashOutWinLoss72";
        public const string ReportSubsidiaryPerformance = "SubsidiaryPerformance73";
        public const string ReportLicenseeWinLossByTimeZone = "LicenseeWinLossByTimeZone76";
        public const string ReportExchangeWinLoss = "ExchangeWinloss77";
        public const string ReportCasinoTurnover = "CasinoTurnover80";
        public const string ReportDailyBets = "DailyBets81";

        /* Customer Info. */

        public const string CustomerInfoCustomerList = "CustomerList43";
        public const string CustomerInfoSpecialBA = "SpecialBA54";
        public const string CustomerInfoCommissionGroupList = "CommissionGroupList55";
        public const string CustomerInfoCustomerLog = "CustomerLog56";
        public const string CustomerInfoEditBetSetting = "EditBetSetting70";

        /* Account. */

        public const string AccountManageAccount = "ManageAccount46";

        /*Notification*/

        public const string ResultAmendmentNotificationReport = "ResultAmendment_Recalculation75";

        public const string BettingTicketCenter = "BTC79";
        public const string BtcAdvancedSearch = "BTC_MultiCustomer";
        public const string BtcSingleCustomer = "BTC_SingleCustomer";
        public const string BtcRefNo = "BTC_RefNo";
        public const string BtcRunning = "BTC_Running";

        /*External*/
        public const string DashboardCustomerBalance = "n_customer_balance";
        public const string DashboardLicenseeWinLossByPlatform = "c_licWL";
        public const string DashboardPendingFund = "n_pending_funds";
        public const string DashboardTodayDeposit = "n_deposit";
        public const string DashboardTodayWithdrawal = "n_withdrawal";
        public const string DashboardTurnoverByPlatform = "c_turnover";

        public const string PlayerAdmin = "PlayerAdmin";
        public const string PlayerAdminUpdateBaStatus = "pa_BA_ctl";
        public const string PlayerAdminUpdateSpecialLevel = "pa_lv_ctl";
        public const string PlayerAdminUpdateOddsGroup = "pa_odds_g_ctl";

        public const string PlayerAdminStatement = "pa_statement";
        public const string PlayerAdminBetList = "pa_r_bl";
        public const string PlayerAdminBetLimit = "pa_bet_lm";
        public const string PlayerAdminBetLimit_Write = "pa_bet_lm_w";
        public const string PlayerAdminLog = "pa_log";

        public const string AccountInfo = "pa_acc_Info";
    }
}