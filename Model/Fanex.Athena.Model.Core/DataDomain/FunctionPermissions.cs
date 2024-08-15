using System.Collections.Generic;
using Fanex.Athena.Model.Auth.DataDomain;

namespace Fanex.Athena.Model.Core.DataDomain
{
    public static class FunctionPermissions
    {
        public static readonly Dictionary<string, string[]> PagePermissions = new Dictionary<string, string[]>
        {
            { FunctionNames.SettledMatchCount, new[] { PermissionKeys.ReportSettledMatchCount, } },
            { FunctionNames.WeeklyLiveMatches, new[] { PermissionKeys.ReportWeeklyLiveMatches, } },
            { FunctionNames.CustomerBalance, new[] { PermissionKeys.ReportCustomerBalance, } },
            { FunctionNames.CustomerSupportTask, new[] { PermissionKeys.ReportCustomerSupportTask, } },
            { FunctionNames.CustomerPendingFunds, new[] { PermissionKeys.ReportCustomerPendingFunds, } },
            { FunctionNames.ExtraPayout, new[] { PermissionKeys.ReportExtraPayout, } },
            { FunctionNames.LeagueWinLoss, new[] { PermissionKeys.ReportLeagueWinLoss, } },
            { FunctionNames.LicenseeWinLoss, new[] { PermissionKeys.ReportLicenseeWinLoss, } },
            { FunctionNames.WinlossAnalysis, new[] { PermissionKeys.ReportWinlossAnalysis, } },
            { FunctionNames.WinLossByTimeZone, new[] { PermissionKeys.ReportLicenseeWinLossByTimeZone, } },
            { FunctionNames.AgCasinoWinLoss, new[] { PermissionKeys.ReportAGCasinoWinLoss, } },
            { FunctionNames.AgCasinoBalance, new[] { PermissionKeys.ReportAGCasinoBalance, } },
            { FunctionNames.SabaVirtualSportsWinLoss, new[] { PermissionKeys.ReportSabaVirtualSportsWinLoss, } },
            { FunctionNames.SubsidiaryPerformance, new[] { PermissionKeys.ReportSubsidiaryPerformance, } },
            { FunctionNames.MatchWinLoss, new[] { PermissionKeys.ReportMatchWinLoss, } },
            { FunctionNames.LiveReport, new[] { PermissionKeys.ReportLiveReport, } },
            { FunctionNames.CustomerTurnover, new[] { PermissionKeys.ReportCustomerTurnover, } },
            { FunctionNames.Turnover, new[] { PermissionKeys.ReportTurnover, } }
        };
    }
}
