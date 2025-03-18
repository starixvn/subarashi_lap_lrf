using System;
using System.Collections.Generic;
using Fanex.Athena.Model.Auth;

namespace Fanex.Athena.Service.Core.OAuth
{
    public interface IOAuthInfo
    {
        bool IsError { get; }

        string ErrorMsg { get; }

        string VendorID { get; }

        string IdentityName { get; }

        int LicenseeId { get; }

        string SiteName { get; }

        int UserID { get; }

        string Username { get; }

        int OnUserId { get; }

        bool IsInternal { get; }

        bool IsAdministrator { get; }

        string DefaultReportUrl { get; }

        bool IsMasterLicensee { get; }

        string SiteDBServer { get; }

        PortalFunction[] LapFunctionList { get; }

        Function[] LrfFunctionList { get; }

        IDictionary<int, string> CurrencyList { get; }

        IDictionary<int, int[]> CurrencyAgentList { get; }

        bool IsAllowedCustomerComm { get; }

        bool IsEnableSingleWallet { get; }

        IEnumerable<string> OfferedSubProductList { get; }

        IEnumerable<string> OfferedOddsGroupList { get; }

        byte UserLevel { get; }

        string OperatorID { get; }

        int? WhiteLabelID { get; }

        bool IsEnabledSubsidiary { get; }

        string BaseCurrency { get; }

        string Language { get; }

        bool IsShowIP { get; }

        string ActionLink { get; }

        string AccessToken { get; }

        DateTime AccessTokenLifeTime { get; }

        string RefreshToken { get; }

        IEnumerable<AuditCurrency> AuditCurrencies { get; }

        int SpecialPlatform { get; }
    }
}