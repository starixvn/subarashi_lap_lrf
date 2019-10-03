using System.Collections.Generic;

namespace Fanex.Athena.Model.Auth
{
    public class OneAuthUserInfo
    {
        public byte UserLevel { get; set; }

        public bool IsEnabledSubsidiary { get; set; }

        public string OperatorID { get; set; }
        public string BaseCurrency { get; set; }
        public IEnumerable<CurrencyUser> CurrencyUserList { get; set; }
    }
}