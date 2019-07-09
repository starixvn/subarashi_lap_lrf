using Fanex.Athena.Model.Core.MetaModel;

namespace Fanex.Athena.Model.BetList.MetaModel
{
    public class ExchangeBetListDetailMetaModel : BaseExchangeBetListMetaModel, IMetaModelValidation
    {
        public long BetId { get; set; }

        public string Type { get; set; }

        public override bool IsValid => base.IsValid && BetId > 0;
    }
}