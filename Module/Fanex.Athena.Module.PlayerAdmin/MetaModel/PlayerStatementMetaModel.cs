namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using System;
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerStatementMetaModel : IMetalModelCustomerIdentity, IMetaModelValidation
    {
        private const int MaximumYear = 2;

        public int CustId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string SiteName { get; set; }

        public string Language { get; set; }

        public int CurrencyId { get; set; }

        public bool IsValid => ToDate >= FromDate
                && FromDate.Month == ToDate.Month
                && FromDate.Year >= (DateTime.Today.Year - MaximumYear);
    }
}