namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using System.Collections.Generic;
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerBetLimitUpdateMetaModel<T> : IMetalModelCustomerIdentity, IMetaModelProduct
    {
        public int CustId { get; set; }

        public string SiteName { get; set; }

        public int UserId { get; set; }

        public int CurrencyId { get; set; }

        public string Ip { get; set; }

        public string Language { get; set; }

        public int ProductId { get; set; }

        public IEnumerable<T> Setting { get; set; }
    }
}
