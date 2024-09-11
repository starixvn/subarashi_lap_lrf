namespace Fanex.Athena.Model.Customer.MetaModel
{
    using System.Collections.Generic;

    public class GetCustomerClassInformationMetaModel
    {
        public string SiteName { get; set; }

        public int CustId { get; set; }

        public IDictionary<int, string> CurrencyList { get; set; }

        public string Language { get; set; }

        public int CurrencyId { get; set; }

        public string CustomerClass { get; set; }

        public bool IsHideSaba { get; set; }

        public bool IsTest { get; set; }
    }
}