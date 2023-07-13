namespace Fanex.Athena.Model.Auth
{
    using Fanex.Athena.Model.Auth.Enum;
    using System;
    using System.Collections.Generic;

    [Serializable]
    public class UserAuthInfo
    {
        public string IdentityName { get; set; }

        public string VendorID { get; set; }

        public string VendorIdentityID { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public byte UserLevel { get; set; }

        public byte SubsidiaryViewType { get; set; }

        public int? WhiteLabelID { get; set; }

        public string OperatorId { get; set; }

        public bool IsSuperAdmin { get; set; }

        public string Language { get; set; }

        public int OnUserId { get; set; }

        public bool IsInternal { get; set; }

        public List<Function> FunctionList { get; set; }

        public PortalFunction[] PortalFunctionList { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public IDictionary<int, int[]> CurrencyAgentList { get; set; }

        public string DefaultReportUrl { get; set; }

        public AppMode ApplicationMode { get; set; }

        public string DefaultBaseCurrency { get; set; } = string.Empty;

        public bool IsShowIpvn { get; set; }

        public bool IsShowIp { get; set; } = true;

        public string AccessToken { get; set; }

        public DateTime AccessTokenLifeTime { get; set; } = DateTime.MinValue;

        public bool IsPortalUser => IdentityName.StartsWith("portal_");
    }
}