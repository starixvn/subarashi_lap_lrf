using Fanex.Athena.Model.Auth;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Fanex.Athena.Service.Core.OAuth
{
    public class OAuthInfo : IOAuthInfo
    {
        private readonly IEnumerable<Claim> _claims;

        private OAuthInfo(string errorMsg)
        {
            IsError = true;
            ErrorMsg = errorMsg;
        }

        private OAuthInfo(IEnumerable<Claim> claims, string accessToken, DateTime accessTokenLifeTime, string refreshToken)
        {
            _claims = claims;
            AccessToken = accessToken;
            AccessTokenLifeTime = accessTokenLifeTime;
            RefreshToken = refreshToken;
        }

        public static OAuthInfo CreateSuccess(IEnumerable<Claim> claims, string accessToken, DateTime accessTokenLifeTime, string refreshToken)
            => new OAuthInfo(claims, accessToken, accessTokenLifeTime, refreshToken);

        public static OAuthInfo CreateError(string errorMsg)
            => new OAuthInfo(errorMsg);

        public bool IsError { get; }
        public string ErrorMsg { get; }

        public string IdentityName => GetClaimValue("Name");
        public string VendorID => GetClaimValue("VendorId");
        public int LicenseeId => GetClaimValue("LicenseeId", -1);
        public string SiteName => GetClaimValue("SiteName");
        public bool IsAdministrator => GetClaimValue<bool>("Administrator");
        public bool IsAllowedCustomerComm => GetClaimValue<bool>("IsAllowedCustomerComm");
        public bool IsEnableBA => GetClaimValue<bool>("IsEnableBA");
        public bool IsEnableSingleWallet => GetClaimValue<bool>("IsEnableSingleWallet");
        public byte UserLevel => GetClaimValue<byte>("UserLevel");
        public bool IsMasterLicensee => GetClaimValue<bool>("IsMasterLicensee");
        public string OperatorID => GetClaimValue("OperatorID");
        public string SiteDBServer => GetClaimValue("SiteDBServer");

        public IEnumerable<string> OfferedSubProductList
        {
            get
            {
                var offeredSubProductList = GetClaimValue("OfferedSubProducts");
                return string.IsNullOrEmpty(offeredSubProductList) ? new string[] { } : offeredSubProductList.Split(',');
            }
        }

        public IEnumerable<string> OfferedOddsGroupList
        {
            get
            {
                var offeredOddsGroupList = GetClaimValue("OfferedOddsGroups");
                return string.IsNullOrEmpty(offeredOddsGroupList) ? new string[] { } : offeredOddsGroupList.Split(',');
            }
        }

        public int? WhiteLabelID
        {
            get
            {
                var value = GetClaimValue<int>("WhiteLabelID");
                if (value < 0)
                {
                    return null;
                }
                return value;
            }
        }

        public int OnUserId => GetClaimValue<int>("OnUserId");
        public bool IsInternal => GetClaimValue<bool>("IsInternal");
        public string DefaultReportUrl => GetClaimValue("DefaultReportUrl");
        public bool IsEnabledSubsidiary => GetClaimValue<bool>("IsEnabledSubsidiary");
        public string BaseCurrency => GetClaimValue("BaseCurrency");
        public int UserID => GetClaimValue<int>("UserSEQ");
        public string Username => GetClaimValue("UserID");
        public string Language => GetClaimValue("Language");
        public bool IsShowIP => GetClaimValue("IsShowIP", true);
        public string ActionLink => GetClaimValue("ActionLink");
        public string AccessToken { get; }
        public DateTime AccessTokenLifeTime { get; }
        public string RefreshToken { get; }

        private PortalFunction[] _lapFunctionList;

        public PortalFunction[] LapFunctionList
        {
            get
            {
                _lapFunctionList = _lapFunctionList ?? _claims
                         .Where(_ => _.Type.Equals("role", StringComparison.OrdinalIgnoreCase))
                         .Select(_ => new PortalFunction { FunctionKey = _.Value })
                         .ToArray();

                return _lapFunctionList;
            }
        }

        private Function[] _lrfFunctionList;

        public Function[] LrfFunctionList
        {
            get
            {
                _lrfFunctionList = _lrfFunctionList ?? _claims
                         .Where(_ => _.Type.Equals("role", StringComparison.OrdinalIgnoreCase))
                         .Select(_ => new Function { FunctionKey = _.Value })
                         .ToArray();

                return _lrfFunctionList;
            }
        }

        public IDictionary<int, string> CurrencyList => RawCurrencyAgentList.ToDictionary(_ => _.CurrencyId, _ => _.Currency);

        public IDictionary<int, int[]> CurrencyAgentList => RawCurrencyAgentList.ToDictionary(_ => _.CurrencyId, _ => _.AgentId);

        private IEnumerable<AuthCurrency> _rawCurrencyAgentList;

        protected internal IEnumerable<AuthCurrency> RawCurrencyAgentList
        {
            get
            {
                if (_rawCurrencyAgentList is null)
                {
                    var agentClaims = _claims.Where(_ => _.Type.Equals("CurrencyAgent", StringComparison.OrdinalIgnoreCase));
                    _rawCurrencyAgentList = agentClaims.Select(agent => JsonConvert.DeserializeObject<AuthCurrency>(agent.Value));
                }
                return _rawCurrencyAgentList;
            }
        }

        public bool IsShowVND => GetClaimValue<bool>("IsShowVND");

        private T GetClaimValue<T>(string claimType)
            => (T)Convert.ChangeType(GetClaimValue(claimType), typeof(T));

        private T GetClaimValue<T>(string claimType, T _default)
        {
            var claimValue = GetClaimValue(claimType);
            return string.IsNullOrEmpty(claimValue) ? _default : (T)Convert.ChangeType(claimValue, typeof(T));
        }

        private string GetClaimValue(string claimType)
                => _claims.FirstOrDefault(_ => _.Type.Equals(claimType, StringComparison.OrdinalIgnoreCase))?.Value;
    }
}