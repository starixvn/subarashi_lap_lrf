namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;
    using System;
    using System.Collections.Generic;

    public class AbnormalBetListMetaModel : IMetaModelValidation, IMetaModelAgent, IMetaModelShowBetFromIP
    {
        private const int MaxPageSize = 2000;

        public int CustId { get; set; }

        public string AgentListXml { get; set; }

        public IEnumerable<string> ListProductCode { get; set; }

        public bool IsAllowedCustomerComm { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        private string _baseCurrency;

        public string BaseCurrency
        {
            get
            {
                return _baseCurrency;
            }
            set
            {
                _baseCurrency = value?.ToLowerInvariant() ?? string.Empty;
            }
        }

        public bool IsExcludedTestData { get; set; }

        public bool IsShowIpvn { get; set; }

        public bool IsShowIp { get; set; }

        public bool IsValid => FromDate <= ToDate &&
            PageIndex > 0 && PageSize <= MaxPageSize;
    }
}