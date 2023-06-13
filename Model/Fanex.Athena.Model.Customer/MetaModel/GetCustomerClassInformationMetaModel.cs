using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GetCustomerClassInformationMetaModel
    {
        public string SiteName { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public string Language { get; set; }

        public int CurrencyId { get; set; }

        public int CustomerClass { get; set; }

        public string GetSettingKey() => "Lrf_CustomerClassPolicySel";
    }
}