using System;
using System.Collections.Generic;

namespace Fanex.Athena.Model.Auth
{
    [Serializable]
    public class LicenseeAuthInfo
    {
        public int LicenseeId { get; set; }

        public string LicenseeName { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public bool IsEnableBA { get; set; }

        public bool IsEnableSingleWallet { get; set; }

        public IEnumerable<string> OfferedSubProductList { get; set; }

        public IEnumerable<string> OfferedOddsGroupsList { get; set; }

        public string SiteDBServer { get; set; }

        public bool IsShowVND { get; set; }
    }
}