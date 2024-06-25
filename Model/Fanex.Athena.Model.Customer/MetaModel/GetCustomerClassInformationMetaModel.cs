using System.Collections.Generic;

namespace Fanex.Athena.Model.Customer.MetaModel
{
    public class GetCustomerClassInformationMetaModel
    {
        public string SiteName { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public string Language { get; set; }

        public int CurrencyId { get; set; }

        public string CustomerClass { get; set; }

        public bool IsTest { get; set; }
    }
}