namespace Fanex.Athena.Module.PlayerAdmin.MetaModel
{
    using Fanex.Athena.Model.Core.MetaModel;

    public class PlayerBetLimitSelectMetaModel : IMetalModelCustomerIdentity
    {
        public int CustId { get; set; }

        public int ProductId { get; set; }

        public int CurrencyId { get; set; }
    }
}
