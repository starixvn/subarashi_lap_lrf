namespace Fanex.Athena.Model.Customer.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;
    using System;

    public class MonitoredPlayerReachedHistoryMetaModel : IMetaModelValidation, IMetalModelCustomerIdentity
    {
        public int CustId { get; set; }

        public int CurrencyId { get; set; }

        public string ExternalId { get; set; }

        public string SystemId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public byte OrderCol { get; set; }
        public byte SortType { get; set; }

        public bool IsValid => FromDate <= ToDate;
    }
}